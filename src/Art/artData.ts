import { Entity } from "@dcl/ecs";



/// Artwork data like images / videos / urls in here for ease of access


export interface ArtworkData {
    entity: Entity;
    artworkId: number;
    title: string;
    description: string;
    visible: boolean;
}

export const artworkData: ArtworkData[] = []


export function addArtworkData(entity: Entity, artworkId: number, title: string, description: string, visible: boolean) {
    artworkData.push({ entity, artworkId, title, description, visible });
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