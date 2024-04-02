import { createStructures } from './structures'
import { ElevatorModule } from './Elevator/elevator'
import { createAllDoors, doorSound } from './doors'
import { initializeKineticArt } from './Art/kineticArt'
import { initializeElevatorDoors } from './Elevator/elevatorDoors'
import { initializeGalleryAreas, loadGalleryArea } from './galleryAreas'
import { initializeNFTs0 } from './Art/nft'
import { initializeToggleableArt } from './Art/videoArt'
//import VLM from 'vlm-dcl'
import { setupUi } from './UI/ui'
import { playCurrentSong, playlist, shufflePlaylist } from './audio'



export function main() {

createStructures()
ElevatorModule.createElevator
initializeElevatorDoors()
createAllDoors()
initializeKineticArt()
initializeGalleryAreas()
initializeNFTs0() 
initializeToggleableArt()

setupUi()
shufflePlaylist(playlist)
playCurrentSong()
//VLM.init()

}
