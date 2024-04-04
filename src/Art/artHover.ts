import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshRenderer, Material } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { galleryAreas } from "../galleryAreas";
import { createArtUI } from "../UI/artHover.ui";
import { ArtworkData, artDescription1, artDescription2, artDescription3, artDescription4, artDescription5, artTitle1, artTitle2, artTitle3, artTitle4, artTitle5, artworkData } from "./artData";
import { gallery1Pos1, gallery1Pos2, gallery1Pos3, gallery1Pos4, gallery1Pos5, gallery1Rot1, gallery1Rot2, gallery1Rot3, gallery1Rot4, gallery1Rot5 } from "./artPositions";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { getRandomHexColor } from "../helperFunctions";


export const ArtHover = engine.defineComponent('arthover', { visible: Schemas.Boolean })

export const ArtComponent = engine.defineComponent('art-id', {
    artTitle: Schemas.String,
    artDescription: Schemas.String
})

export let hoverVisible = false
export let currentArtworkId = 1;


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

/**
 * Add this system and every entity with BounceScaling will bounce for 5 seconds
 * @param dt - detal time in seconds
 */

export function artHoverSystem(dt: number) {
    const artEntities = engine.getEntitiesWith(ArtHover, Transform)
    for (const [entity, _arthover, _transform] of artEntities) {
        const mutableTransform = Transform.getMutableOrNull(entity)
        const artDetails = ArtHover.get(entity)
        MeshRenderer.setBox(entity)
    }
}

export function changeArtHoverSystem() {
    for (const [entity] of engine.getEntitiesWith(ArtHover, PointerEvents)) {
        const artworkId = getArtworkId(entity);
        
        console.log("changeArtHoverSystem called")
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

