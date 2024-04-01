import { Animator, engine, Transform, GltfContainer, ColliderLayer, Entity, pointerEventsSystem, InputAction, AudioSource } from "@dcl/sdk/ecs";
import { Vector3, Quaternion } from "@dcl/sdk/math";
import * as utils from '@dcl-sdk/utils';
import { playAudioAtPlayer } from "../audio";
import { setCurrentFloor, currentFloor } from "./elevatorState";


//add sound when elevator path complete

/// This file relies on audio code present in audio.ts

const sceneParent = engine.addEntity();
Transform.create(sceneParent, {
    position: Vector3.create(16, 0, 16)
});


const arrowsButton = 'models/arrows.glb';
const elevatorModel = 'models/elevator.glb';
const buttonModels = ['models/button1.glb', 'models/button2.glb', 'models/button3.glb'];


const buttonYOffsets = [0, 0.13, 0.28];


const callButtonSound = 'sounds/callButton.mp3'
const buttonSound = 'sounds/button.mp3';
const elevatorSound = 'sounds/hum2.mp3';
const elevatorArrivalSound = 'sounds/elevatorPing.mp3';
let isMoving = false
let isMovingElevator1 = false;
let isMovingElevator2 = false;
let pathComplete = true;

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

// Uncomment the line below if working with one elevator only
//let isMoving = false;


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


// For independently moving elevators use this moveToFloor function instead.
/*
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
    playAudioAtPlayer(elevatorSound)
    pathComplete = false
    setCurrentFloor(floorIndex);

    utils.tweens.startTranslation(entity, currentPosition, targetPosition, 5, utils.InterpolationType.LINEAR, () => {
        isMoving = false;
        floorIndex = currentFloor;
        pathComplete = true;
        console.log('path complete');
        setCurrentFloor(floorIndex);
        console.log(`current floor: ${currentFloor} index: ${floorIndex}`)
        playAudioAtPlayer(elevatorArrivalSound)
    });
}
*/

// For elevators moving together use this moveToFloor function
function moveToFloor(entity: Entity, floorIndex: number) {
    if (isMoving) return; // Ensure that both elevators are not already moving

    isMoving = true; // Mark both elevators as moving

    const targetHeight = floors[floorIndex].height;
    const currentPosition1 = Transform.get(elevator).position;
    const currentPosition2 = Transform.get(elevator2).position;

    const targetPosition1 = Vector3.create(currentPosition1.x, targetHeight, currentPosition1.z); // Keep X and Z constant for elevator 1
    const targetPosition2 = Vector3.create(currentPosition2.x, targetHeight, currentPosition2.z); // Keep X and Z constant for elevator 2

    playAudioAtPlayer(elevatorSound);
    pathComplete = false;
    setCurrentFloor(floorIndex);

    // Move both elevators simultaneously
    utils.tweens.startTranslation(elevator, currentPosition1, targetPosition1, 5, utils.InterpolationType.LINEAR, () => {
        // Callback when elevator 1 movement is complete
        pathComplete = true;
        console.log('path complete');
        setCurrentFloor(floorIndex);
        console.log(`current floor: ${currentFloor} index: ${floorIndex}`);
        playAudioAtPlayer(elevatorArrivalSound);
        isMoving = false; // Mark both elevators as not moving
    });

    utils.tweens.startTranslation(elevator2, currentPosition2, targetPosition2, 5, utils.InterpolationType.LINEAR, () => {
        // Callback when elevator 2 movement is complete
        // No need to duplicate pathComplete, setCurrentFloor, console.log, and playAudioAtPlayer statements since they are common for both elevators
    });
}



function createElevatorButton(parent: Entity, position: Vector3, modelSrc: string, yOffset: number, index: number, doorsShouldOpen: boolean) {
    
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

        AudioSource.create(button, {
            audioClipUrl: buttonSound,
            playing: false,
            loop: false,
            volume: 100
        })

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
                hoverText: `${floors[index].name}`,
                maxDistance: 15,
            },
        },
        () => {
            playAudioAtPlayer(buttonSound);
            const animateButton = Animator.getClip(button, 'Push1');
            animateButton.playing = true;
            animateButton.loop = false;

            console.log(`Elevator button pressed: ${floors[index].name}`);


            // Start elevator movement
            moveToFloor(parent, index);
        }
    );
}

// Numbered elevator buttons (move them here)
function initializeElevatorButtons(elevator: Entity, isLeftElevator: Boolean) {
    const buttons: Entity[] = [];
    const buttonOffsetY = -0.005;
    const numFloors = floors.length;
    

    floors.forEach((_floor, index) => {
        const buttonPositionY = buttonOffsetY * (numFloors - index - 1);
        const buttonPositionX = -28.935;

      
        const currentElevator = isLeftElevator ? elevator : elevator2;
        const buttonZPOS = isLeftElevator ? -20.7 : -13.45;

        createElevatorButton(
            currentElevator,
            Vector3.create(buttonPositionX, buttonPositionY -4.41, buttonZPOS),
            buttonModels[index],
            buttonYOffsets[index],
            index,
            true
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
    const audioSourceEntity = engine.addEntity();
    const audioSourcePosition = Vector3.create(position.x, position.y, position.z); // Create a new Vector3 with the same coordinates
    Transform.create(audioSourceEntity, {
        position: audioSourcePosition,
    });
    AudioSource.create(audioSourceEntity, {
        audioClipUrl: callButtonSound,
        playing: false,
        loop: false,
        volume: 100
    })
    let triggerCallButtonSound = AudioSource.getMutable(audioSourceEntity)


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
            playAudioAtPlayer(callButtonSound)
            console.log('play call button sound')

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

// Creating first elevator
const elevator = createElevator(Vector3.create(36.95 - 8, 3.1, 19.6), Quaternion.fromEulerDegrees(0, -90, 0));

// Remove the three lines below if only using one elevator
const elevator2 = createElevator(Vector3.create(28.95, 3.1, 12.35), Quaternion.fromEulerDegrees(0, -90, 0));


initializeElevatorButtons(elevator, true);
initializeElevatorButtons(elevator2, false);
initializeCallButtons()

export const ElevatorModule = {
    createElevator,
    initializeElevatorButtons,
};
