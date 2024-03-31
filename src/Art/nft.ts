import { NftFrameType, NftShape, Transform, engine } from "@dcl/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/ecs-math";
import { Enum } from "protobufjs";



export function createNFT(
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    urn: string,
    frameColor: Color3,
    frameStyle: NftFrameType // listed below
) 
{
    let nftEntity = engine.addEntity()
    Transform.create(nftEntity, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: scale
    })
    NftShape.create(nftEntity, {
        urn: urn
    })
}

export function initializeNFTs0() {
    
    createNFT(
        Vector3.create(16, 1, 16),
        Vector3.One(),
        Vector3.One(),
        urn5,
        Color3.Magenta(),
        canvasFrame
    )
}






let urn1 = 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536'
let urn2 = 'urn:decentraland:ethereum:erc721:0xd73be539d6b2076bab83ca6ba62dfe189abc6bbe:64359'
let urn3 = 'urn:decentraland:ethereum:erc721:0x41a322b28d0ff354040e2cbc676f0320d8c8850d:3734'
let urn4 = 'urn:decentraland:ethereum:erc721:0xecf7ef42b57ee37a959bf507183c5dd6bf182081:100'
let urn5 = 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:1540722'




// Working urns from Nico

//https://opensea.io/assets/ethereum/0xd73be539d6b2076bab83ca6ba62dfe189abc6bbe/64359
//https://opensea.io/assets/ethereum/0x41a322b28d0ff354040e2cbc676f0320d8c8850d/3734
//https://opensea.io/assets/ethereum/0xecf7ef42b57ee37a959bf507183c5dd6bf182081/100
//https://opensea.io/assets/ethereum/0x06012c8cf97bead5deae237070f9587f8e7a266d/1540722



// Styles of NFT frames

let classicFrame = NftFrameType.NFT_CLASSIC
let baroqueFrame = NftFrameType.NFT_BAROQUE_ORNAMENT
let diamondFrame = NftFrameType.NFT_DIAMOND_ORNAMENT
let minimalFrame = NftFrameType.NFT_MINIMAL_WIDE
let minimalGreyFrame = NftFrameType.NFT_MINIMAL_GREY
let blockyFrame = NftFrameType.NFT_BLOCKY
let goldEdgesFrame = NftFrameType.NFT_GOLD_EDGES
let goldCarvedFrame = NftFrameType.NFT_GOLD_CARVED
let goldWideFrame = NftFrameType.NFT_GOLD_WIDE
let goldRoundedFrame = NftFrameType.NFT_GOLD_ROUNDED
let metalMediumFrame = NftFrameType.NFT_METAL_MEDIUM
let metalWideFrame = NftFrameType.NFT_METAL_WIDE
let metalSlimFrame = NftFrameType.NFT_METAL_SLIM
let metalRoundFrame = NftFrameType.NFT_METAL_ROUNDED
let pinsFrame = NftFrameType.NFT_PINS
let minimalBlackFrame = NftFrameType.NFT_MINIMAL_BLACK
let minimalWhiteFrame = NftFrameType.NFT_MINIMAL_WHITE
let tapeFrame = NftFrameType.NFT_TAPE
let woodSlimFrame = NftFrameType.NFT_WOOD_SLIM
let woodWideFrame = NftFrameType.NFT_WOOD_WIDE
let woodTwigsFrame = NftFrameType.NFT_WOOD_TWIGS
let canvasFrame = NftFrameType.NFT_CANVAS
let noFrame = NftFrameType.NFT_NONE