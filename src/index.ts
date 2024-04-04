import { createStructures } from './structures'
import { ElevatorModule, elevatorPos1, elevatorRot } from './Elevator/elevator'
import { createAllDoors, doorSound } from './doors'
import { initializeKineticArt } from './Art/kineticArt'
import { initializeElevatorDoors } from './Elevator/elevatorDoors'
import { initializeGalleryAreas, loadGalleryArea } from './galleryAreas'
//import VLM from 'vlm-dcl'
import { setupUi } from './UI/ui'
import { playCurrentSong, playRadio, playlist, shufflePlaylist } from './audio'
import { artHoverSystem, changeArtHoverSystem } from './Art/artHover'
import { TextShape, Transform, engine } from '@dcl/sdk/ecs'
//import { showArtIds } from './helperFunctions'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { gallery1Pos1 } from './Art/artPositions'
import * as utils from '@dcl-sdk/utils';



/// Have a flag to show artwork IDs to make life easier for people using this code
//export let SHOW_ART_IDS = true



export function main() {

createStructures()
let elevator = ElevatorModule.createElevator
initializeElevatorDoors()
createAllDoors()
initializeKineticArt()
initializeGalleryAreas()
//changeArtHoverSystem()
//artHoverSystem(1)
//setupUi()

// Use these functions to trigger the playlist (also toggle playlist and radio booleans in audio.ts and ui.tsx)
//shufflePlaylist(playlist)
//playCurrentSong()

// Use this function to trigger the radio (also toggle playlist and radio booleans in audio.ts and ui.tsx)
//playRadio()

 // engine.addSystem(changeArtHoverSystem)
//showArtIds()



}
