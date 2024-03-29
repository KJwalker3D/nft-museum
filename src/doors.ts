//Double pane sliding door

import { ColliderLayer, GltfContainer, Transform, engine } from "@dcl/ecs"
import { Quaternion, Vector3 } from "@dcl/ecs-math"
import * as utils from '@dcl-sdk/utils';
import { Entity } from "@dcl/sdk/ecs";


let doorLmodel = 'models/doorM1.glb'
let doorRmodel = 'models/doorM2.glb'
let closeDoorOffset = 0
let openDoorOffset = 1


export function createSlidingDoors(
    position: Vector3,
    rotation: Vector3,
    doorLmodel: string,
    doorRmodel: string,
    openDoorOffset: number,
    closeDoorOffset: number
) {
    let doorParent = engine.addEntity();
    let doorsShouldOpen = false;

    Transform.create(doorParent, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    });

    let doorL = createDoorEntity(doorLmodel, -closeDoorOffset, doorParent);
    let doorR = createDoorEntity(doorRmodel, closeDoorOffset, doorParent);

    function moveDoors(offset: number) {
        let currentDoorLPos = Transform.get(doorL).position;
        let currentDoorRPos = Transform.get(doorR).position;

        let targetDoorLPos = Vector3.add(currentDoorLPos, Vector3.create(offset, 0, 0));
        let targetDoorRPos = Vector3.subtract(currentDoorRPos, Vector3.create(offset, 0, 0));

        utils.tweens.startTranslation(doorL, currentDoorLPos, targetDoorLPos, 2, utils.InterpolationType.EASEINSINE);
        utils.tweens.startTranslation(doorR, currentDoorRPos, targetDoorRPos, 2, utils.InterpolationType.EASEINSINE);
    }

    function closeDoors() {
        moveDoors(-openDoorOffset);
    }

    function openDoors() {
        let currentDoorLPos = Transform.get(doorL).position;
        let currentDoorRPos = Transform.get(doorR).position;

        let targetDoorLPos = Vector3.add(currentDoorLPos, Vector3.create(openDoorOffset, 0, 0));
        let targetDoorRPos = Vector3.subtract(currentDoorRPos, Vector3.create(openDoorOffset, 0, 0));

        utils.tweens.startTranslation(doorL, currentDoorLPos, targetDoorLPos, 2, utils.InterpolationType.EASEINSINE);
        utils.tweens.startTranslation(doorR, currentDoorRPos, targetDoorRPos, 2, utils.InterpolationType.EASEINSINE, () => {
        });
    }

    utils.triggers.addTrigger(
        doorParent,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{ type: 'box', 
        position: { x: 0, y: 0.5, z: 0 },
        scale: { x: 3, y: 3, z: 3 } }],
        function (otherEntity) {
            doorsShouldOpen = true;
            console.log('trigger doors');
            if (doorsShouldOpen) {
                openDoors();
                doorsShouldOpen = false;
            }
        }, 
        function (anotherEntity) {
            console.log('close doors')
            if (!doorsShouldOpen) { 
                closeDoors();
            }
        }
    );

    // Uncomment line below to see trigger box
   // utils.triggers.enableDebugDraw(true);
}

function createDoorEntity(model: string, offsetX: number, parent: Entity) {
    let doorEntity = engine.addEntity();

    Transform.create(doorEntity, {
        position: Vector3.create(offsetX, 0, 0),
        rotation: Quaternion.Identity(),
        parent: parent
    });

    GltfContainer.create(doorEntity, {
        src: model,
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    });

    return doorEntity;
}


export function createAllDoors() {
    createSlidingDoors(
        Vector3.create(16, 1, 16),
        Vector3.create(0, 0, 0),
        doorLmodel,
        doorRmodel,
        openDoorOffset,
        closeDoorOffset
    );
}


 

//Single pane large sliding door

let largeDoor = 'models/doorBig.glb'

