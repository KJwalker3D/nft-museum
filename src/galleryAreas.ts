import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { engine, Transform, Entity, MeshRenderer } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';


let player = engine.PlayerEntity 

function createGallery0() {
    const area = galleryAreas[0];
    const entity1 = createGalleryEntity(Vector3.create(16, 0, 16), Vector3.create(0, 0, 0));
    const entity2 = createGalleryEntity(Vector3.create(15, 0, 13), Vector3.create(0, 0, 0));
    area.entities.push(entity1, entity2);

}

function createGallery1() {
    const area = galleryAreas[1];
    const entity3 = createGalleryEntity(Vector3.create(16, 10, 16), Vector3.create(0, 0, 0));
    const entity4 = createGalleryEntity(Vector3.create(15, 10, 13), Vector3.create(0, 0, 0));
    area.entities.push(entity3, entity4);

}

function createGallery2() {
    const area = galleryAreas[2];
    const entity5 = createGalleryEntity(Vector3.create(16, 20, 16), Vector3.create(0, 0, 0));
    const entity6 = createGalleryEntity(Vector3.create(15, 20, 13), Vector3.create(0, 0, 0));
    area.entities.push(entity5, entity6);

}



// Define gallery areas
const galleryAreas: { position: Vector3, entities: Entity[] }[] = [
    //Ground floor gallery
    { position: Vector3.create(10, 0, 16), entities: [] },

    //First floor gallery
    { position: Vector3.create(10, 10, 16), entities: [] },

    //Rooftop area
    { position: Vector3.create(10, 20, 16), entities: [] },

    // Add more gallery areas as needed
];

// Load gallery area artworks
export function loadGalleryArea(index: number) {
    const area = galleryAreas[index];
    if (area) {
        const createFunction = index === 0 ? createGallery0 : (index === 1 ? createGallery1 : createGallery2);
        createFunction();
        console.log(`Loaded gallery area ${index}`);
    }
}

// Offload gallery area artworks
export function offloadGalleryArea(index: number) {
    const area = galleryAreas[index];
    if (area) {
        // Remove all entities from the area
        area.entities.forEach(entity => {
            engine.removeEntity(entity);
        });
        area.entities = []; // Reset the entities array
    }
}

// Trigger loading and offloading based on player's location
export function handleGalleryAreaTrigger(playerPosition: Vector3) {
    galleryAreas.forEach((area, index) => {
        const distance = Vector3.distance(playerPosition, area.position);
        if (distance < 1 && area.entities.length === 0) {
            // Load gallery area if player enters and area is empty
            loadGalleryArea(index);
            console.log('load gallery items');
        } else if (distance >= 1 && area.entities.length > 0) {
            // Offload gallery area if player exits and area has entities
            offloadGalleryArea(index);
            console.log('offload gallery items');
        }
    });
}


// Create trigger zones around gallery areas
export function createGalleryAreaTriggers(position: Vector3, scale: Vector3) {
    galleryAreas.forEach(area => {
        const triggerEntity = engine.addEntity();
        Transform.create(triggerEntity, {
            position: position, 
            scale: scale
        })

        utils.triggers.addTrigger(
            triggerEntity,
            utils.NO_LAYERS,
            utils.LAYER_1,
            [{
                type: 'box',
                position: { x: position.x, y: position.y, z: position.z },
                scale: { x: scale.x, y: scale.y, z: scale.z }
            }],
            function (otherEntity) {
                loadGalleryArea(galleryAreas.indexOf(area))
                console.log('load gallery items')
            },
            function (anotherEntity) {
                offloadGalleryArea(galleryAreas.indexOf(area))
                console.log('offload gallery items')

            }
        )
    });
}

function createGalleryEntity(position: Vector3, rotation: Vector3): Entity {
    const entity = engine.addEntity();

    Transform.create(entity, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)
    })

    MeshRenderer.setBox(entity)

    return entity;
}


// Initialize gallery areas and triggers
export function initializeGalleryAreas() {

    createGallery0()
    createGallery1()
    createGallery2()


    // Create trigger zones around gallery areas

    // Ground floor trigger area
    createGalleryAreaTriggers(
        Vector3.create(4, 1.5, 8), // position
        Vector3.create(16, 6, 20)); // scale
        
    
    //First floor trigger area
    createGalleryAreaTriggers(
        Vector3.create(6.65, 5.5, 8),
        Vector3.create(26.2, 10, 26)
    )

    //Rooftop trigger area
    createGalleryAreaTriggers(
        Vector3.create(6.65, 12.5, 8),
        Vector3.create(26.2, 10, 26)
    )
}


