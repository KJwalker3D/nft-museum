import { createStructures } from './structures'
import { ElevatorModule } from './Elevator/elevator'
import { createAllDoors, doorSound } from './doors'
import { initializeKineticArt } from './Art/kineticArt'
import { initializeElevatorDoors } from './Elevator/elevatorDoors'
import { initializeGalleryAreas, loadGalleryArea } from './galleryAreas'
import { initializeNFTs0 } from './Art/nft'



export function main() {

createStructures()
ElevatorModule.createElevator
initializeElevatorDoors()
createAllDoors()
initializeKineticArt()
initializeGalleryAreas()
initializeNFTs0() 


}
