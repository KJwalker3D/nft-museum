import { NftFrameType, NftShape, Transform, engine } from "@dcl/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/ecs-math";
import { pointerEventsSystem, InputAction, MeshCollider } from "@dcl/sdk/ecs";
import { openNftDialog } from "~system/RestrictedActions";



export function createNFT(
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    urn: string,
    frameColor: Color3,
    frameStyle: NftFrameType, // listed below
    hoverText: string
) 
{
    let nftEntity = engine.addEntity()
    Transform.create(nftEntity, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: scale
    })
    MeshCollider.setPlane(nftEntity)
    pointerEventsSystem.onPointerDown(
        {
          entity: nftEntity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: hoverText,
          },
        },
        function () {
          console.log('clicked artwork');
          openNftDialog({
            urn: urn
          });
        }
      );
    NftShape.create(nftEntity, {
        urn: urn,
        color: frameColor,
        style: frameStyle
    })

    return nftEntity
}





// Styles of NFT frames

export let classicFrame = NftFrameType.NFT_CLASSIC
export let baroqueFrame = NftFrameType.NFT_BAROQUE_ORNAMENT
export let diamondFrame = NftFrameType.NFT_DIAMOND_ORNAMENT
export let minimalFrame = NftFrameType.NFT_MINIMAL_WIDE
export let minimalGreyFrame = NftFrameType.NFT_MINIMAL_GREY
export let blockyFrame = NftFrameType.NFT_BLOCKY
export let goldEdgesFrame = NftFrameType.NFT_GOLD_EDGES
export let goldCarvedFrame = NftFrameType.NFT_GOLD_CARVED
export let goldWideFrame = NftFrameType.NFT_GOLD_WIDE
export let goldRoundedFrame = NftFrameType.NFT_GOLD_ROUNDED
export let metalMediumFrame = NftFrameType.NFT_METAL_MEDIUM
export let metalWideFrame = NftFrameType.NFT_METAL_WIDE
export let metalSlimFrame = NftFrameType.NFT_METAL_SLIM
export let metalRoundFrame = NftFrameType.NFT_METAL_ROUNDED
export let pinsFrame = NftFrameType.NFT_PINS
export let minimalBlackFrame = NftFrameType.NFT_MINIMAL_BLACK
export let minimalWhiteFrame = NftFrameType.NFT_MINIMAL_WHITE
export let tapeFrame = NftFrameType.NFT_TAPE
export let woodSlimFrame = NftFrameType.NFT_WOOD_SLIM
export let woodWideFrame = NftFrameType.NFT_WOOD_WIDE
export let woodTwigsFrame = NftFrameType.NFT_WOOD_TWIGS
export let canvasFrame = NftFrameType.NFT_CANVAS
export let noFrame = NftFrameType.NFT_NONE