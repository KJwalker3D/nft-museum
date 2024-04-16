import { createStructures } from './structures'
import { ElevatorModule } from './Elevator/elevator'
import { createAllDoors, doorSound } from './doors'
import { initializeKineticArt } from './Art/kineticArt'
import { initializeElevatorDoors } from './Elevator/elevatorDoors'
import { initializeGalleryAreas, loadGalleryArea } from './galleryAreas'
//import VLM from 'vlm-dcl'
import { setupUi } from './UI/ui'
import { playCurrentSong, playRadio, playlist, shufflePlaylist } from './audio'
import { artHoverSystem, changeArtHoverSystem } from './Art/artHover'



export function main() {

createStructures()
ElevatorModule.createElevator
initializeElevatorDoors()
createAllDoors()
initializeKineticArt()
initializeGalleryAreas()

setupUi()

// Use these functions to trigger the playlist (also toggle playlist and radio booleans in audio.ts and ui.tsx)
shufflePlaylist(playlist)
playCurrentSong()

// Use this function to trigger the radio (also toggle playlist and radio booleans in audio.ts and ui.tsx)
//playRadio()

changeArtHoverSystem()
artHoverSystem(100)
}
