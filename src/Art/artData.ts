import { Entity } from "@dcl/ecs";
import { createArtUI } from "../UI/artHover.ui";
import { gallery1Pos1, gallery1Rot1, gallery1Pos2, gallery1Rot2, gallery1Pos3, gallery1Rot3, gallery1Pos4, gallery1Rot4, gallery1Pos5, gallery1Rot5 } from "./artPositions";
import { Quaternion, Vector3 } from "@dcl/ecs-math";



/// Artwork data like images / videos / urls in here for ease of access


// Define artwork data
export interface ArtworkData {
    artworkId: number;
    title: string;
    description: string;
    visible: boolean,
    position: Vector3,
    rotation: Vector3,
    // Add more fields if needed
}

export function addArtworkData(entity: Entity, artworkId: number, title: string, description: string, visible: boolean) {
    artworkData.push({ artworkId, title, description, visible, position: Vector3.Zero(), rotation: Quaternion.Zero() });
}



// Use server hosted images or paths to files in your project folder
export let logoImage = 'https://bafkreih4ndg6qpczqw2ardbrrdoj23t43hiegbceo36hbi3vjqskcoi4yu.ipfs.nftstorage.link/'
export let logoURL = 'https://LowPolyModelsWorld.com'

export let groundVideo = 'https://player.vimeo.com/external/711197011.m3u8?s=1fe29a85f3c1455580a070eee4fb93abcb2ed5a2&logging=false'
export let groundVidURL = 'https://LowPolyModelsWorld.com'

export let urn1 = 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536'
export let urn2 = 'urn:decentraland:ethereum:erc721:0xd73be539d6b2076bab83ca6ba62dfe189abc6bbe:64359'
export let urn3 = 'urn:decentraland:ethereum:erc721:0x41a322b28d0ff354040e2cbc676f0320d8c8850d:3734'
export let urn4 = 'urn:decentraland:ethereum:erc721:0xecf7ef42b57ee37a959bf507183c5dd6bf182081:100'
export let urn5 = 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:1540722'

export let artTitle1 = '1'
export let artDescription1 = '111'

export let artTitle2 = '2'
export let artDescription2 = '222'

export let artTitle3 = '3'
export let artDescription3 = '333'

export let artTitle4 = '4'
export let artDescription4 = '444'

export let artTitle5 = '5'
export let artDescription5 = '555'

export let artTitle6 = '6'
export let artDescription6 = '666'

export const artworkData: ArtworkData[] = [
    { artworkId: 1, title: "Title 1", description: "Description 1", visible: false, position: gallery1Pos1, rotation: gallery1Rot1 },
];

// Loop over the artworkData array to create entities and add artwork data
for (const artwork of artworkData) {
    const entity = createArtUI(artwork.position.x, artwork.position.y, artwork.position.z, artwork.rotation.y, artwork.artworkId, artwork.title, artwork.description);
    // Assuming you have a separate map to store artwork data
    addArtworkData(entity, artwork.artworkId, artwork.title, artwork.description, true);
    // Add MeshRenderer.setBox(entity) if needed
}