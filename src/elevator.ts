import { Animator, engine, Transform, GltfContainer, ColliderLayer, Entity, pointerEventsSystem, InputAction } from "@dcl/sdk/ecs";
import { Vector3, Quaternion } from "@dcl/sdk/math";
import * as utils from '@dcl-sdk/utils';

const sceneParent = engine.addEntity();
Transform.create(sceneParent, {
    position: Vector3.create(16, 0, 16)
});

const arrowsButton = 'models/arrows.glb';
const elevatorModel = 'models/elevator.glb';
const buttonModels = ['models/button1.glb', 'models/button2.glb', 'models/button3.glb'];
const buttonYOffsets = [0, 0.13, 0.28];

const floors = [
    { name: 'Ground Floor', height: 3.1 },
    { name: 'Second Floor', height: 11.45 },
    { name: 'Rooftop', height: 21.75 }
];

// Call buttons
const buttonPositions: Vector3[] = [
    // ground floor
    Vector3.create(26.7725, 1.47, 16.02),
    // second floor
    Vector3.create(26.3, 10.05, 16.02),
    // rooftop
    Vector3.create(25.1, 19.975, 15.99)
];

let isMoving = false;
let currentFloor = 0;

function createElevator(position: Vector3, rotation: Quaternion) {
    const elevator = engine.addEntity();
    Transform.create(elevator, {
        position: position,
        rotation: rotation
    });
    GltfContainer.create(elevator, {
        src: elevatorModel,
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    });
    return elevator;
}

// Creating first elevator
const elevator = createElevator(Vector3.create(36.95 - 8, 3.1, 19.6), Quaternion.fromEulerDegrees(0, -90, 0));

// Remove the line(s) below if only using one elevator
const elevator2 = createElevator(Vector3.create(28.95, 3.1, 8), Quaternion.fromEulerDegrees(0, -90, 0));
let isMovingElevator1 = false;
let isMovingElevator2 = false;

function moveToFloor(entity: Entity, floorIndex: number) {
    
    // Remove the line(s) below if only using one elevator
    let isMoving;
    if (entity === elevator) {
        isMoving = isMovingElevator1;
    } else if (entity === elevator2) {
        isMoving = isMovingElevator2;
    } else {
        return;
    }
    // End of section to remove


    if (isMoving) return;


    if (floorIndex === currentFloor) {
        return;
    }

   // Uncomment the line below if working with only one elevator
   // isMoving = true;

    const targetHeight = floors[floorIndex].height;
    const currentPosition = Transform.get(entity).position;
    const targetPosition = Vector3.create(currentPosition.x, targetHeight, currentPosition.z); // Keep X and Z constant

    utils.tweens.startTranslation(entity, currentPosition, targetPosition, 5, utils.InterpolationType.LINEAR, () => {
        isMoving = false;
        currentFloor = floorIndex;
        console.log('path complete');
    });
}

function createElevatorButton(parent: Entity, position: Vector3, modelSrc: string, yOffset: number, index: number) {
    const button = engine.addEntity();
    const buttonPosition = Vector3.add(Transform.get(parent).position, position);
    Transform.create(button, {
        position: Vector3.create(buttonPosition.x, buttonPosition.y + yOffset, buttonPosition.z),
        parent: parent
    });
    GltfContainer.create(button, {
        src: modelSrc,
        invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
    });
    Animator.create(button, {
        states: [
            {
                clip: "Push1",
                playing: false,
                loop: false
            }
        ]
    });
    pointerEventsSystem.onPointerDown(
        {
            entity: button,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: `Go to ${floors[index].name}`,
                maxDistance: 15,
            },
        },
        () => {
            const animateButton = Animator.getClip(button, 'Push1');
            animateButton.playing = true;
            animateButton.loop = false;
            console.log(`Elevator button pressed: ${floors[index].name}`);
            moveToFloor(parent, index);
        }
    );
}


function initializeElevatorButtons(elevator: Entity, isLeftElevator: Boolean) {
    const buttons: Entity[] = [];
    const buttonOffsetY = -0.005;
    

    floors.forEach((floor, index) => {
        const buttonPositionY = buttonOffsetY * (floors.length - index - 1);
        const buttonPositionX = -28.935;

      
        const currentElevator = isLeftElevator ? elevator : elevator2;
        const buttonZPOS = isLeftElevator ? -20.7 : -9.1;

        createElevatorButton(
            currentElevator,
            Vector3.create(buttonPositionX, buttonPositionY -4.41, buttonZPOS),
            buttonModels[index],
            buttonYOffsets[index],
            index
        );
    });

    return buttons;
}

function createCallButton(position: Vector3, rotation: Vector3, floorIndex: number) {
    const callButton = engine.addEntity();
    Transform.create(callButton, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)
    });
    GltfContainer.create(callButton, {
        src: arrowsButton,
        invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
    });
    Animator.create(callButton, {
        states: [
            {
                clip: 'Push',
                playing: false,
                loop: false,
            }
        ]
    });
    pointerEventsSystem.onPointerDown(
        {
            entity: callButton,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: `Call Elevator ${floors[floorIndex].name}`,
                maxDistance: 12,
            },
        },
        () => {
            moveToFloor(elevator, floorIndex);
            moveToFloor(elevator2, floorIndex)
            Animator.playSingleAnimation(callButton, 'Push');
        }
    );
}

function initializeCallButtons() {
    buttonPositions.forEach((position, index) => {
        createCallButton(position, Vector3.create(0, -90, 0), index);
    });
}


initializeElevatorButtons(elevator, true);
initializeElevatorButtons(elevator2, false);
initializeCallButtons()

export const ElevatorModule = {
    createElevator,
    initializeElevatorButtons,
};
