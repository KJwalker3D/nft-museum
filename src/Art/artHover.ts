import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshCollider, MeshRenderer, Material } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { galleryAreas } from "../galleryAreas";
import { ArtworkData, addArtworkData, artworkData } from "./artData";
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";
import { getRandomHexColor } from "../helperFunctions";

export let hoverVisible = false
export let currentArtworkId = 1;

export const ArtHover = engine.defineComponent('arthover', { visible: Schemas.Boolean })

export const ArtComponent = engine.defineComponent('art-id', {
    artTitle: Schemas.String,
    artDescription: Schemas.String
})

export function createArtUI(position: Vector3, rotation: Vector3, artworkId: number, artTitle: string, artDescription: string): Entity {
    const entity = engine.addEntity()
    ArtComponent.create(entity, { artTitle, artDescription })
    addArtworkData(entity, artworkId, artTitle, artDescription, true);
    setArtworkId(entity, artworkId);
    Transform.create(entity, { position: position, rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z), scale: Vector3.create(1, 0.85, 5) })
    MeshRenderer.setBox(entity)

    MeshCollider.setBox(entity)
  
    ArtHover.create(entity, { visible: false })
    PointerEvents.create(entity, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_HOVER_ENTER, eventInfo: {
            button: InputAction.IA_ANY, hoverText: artTitle,
          }
        }
        
      ]
    })
    return entity
  }

export function artHoverSystem(dt: number) {
    const artEntities = engine.getEntitiesWith(ArtHover, Transform)
    for (const [entity, _arthover, _transform] of artEntities) {
        const mutableTransform = Transform.getMutable(entity)
        const artDetails = ArtHover.get(entity)
    }
}

export function changeArtHoverSystem() {
    for (const [entity] of engine.getEntitiesWith(ArtHover, PointerEvents)) {
        const artworkId = getArtworkId(entity);

        if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)) {
             Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) });
            console.log('hover?', hoverVisible)
            if (artworkId !== undefined) {
                changeCurrentArtworkId(artworkId);
                console.log('should work')
            }
            hoverVisible = true;
            utils.timers.setTimeout(() => hoverVisible = false, 9000);
        } else if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_LEAVE, entity)) {
            hoverVisible = false;
        }
    }
}

export function toggleHover() {
    hoverVisible = false
}




// components.ts

// Create a map to store artwork IDs associated with entities
export const ArtworkIdMap = new Map<Entity, number>();

// Function to set artwork ID for an entity
export function setArtworkId(entity: Entity, artworkId: number) {
    ArtworkIdMap.set(entity, artworkId);
}

// Function to get artwork ID for an entity
export function getArtworkId(entity: Entity): number | undefined {
    return ArtworkIdMap.get(entity);
}

export function changeCurrentArtworkId(newId: number) {
    const artwork = findArtworkById(newId);
    if (artwork && artwork.visible) {
        currentArtworkId = newId;
    }
}


// Function to find artwork by ID
export function findArtworkById(id: number): ArtworkData | undefined {
    return artworkData.find(artwork => artwork.artworkId === id);
}


galleryAreas.forEach((entity) => { 
    ArtComponent.create 
    //createArtUI(position, rotation, getArtworkId, artTitle, artDescription)
});