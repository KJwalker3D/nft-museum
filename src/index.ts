// We define the empty imports so the auto-complete feature works as expected.
import { Vector3 } from '@dcl/sdk/math'
import { createStructures } from './structures'
import { ElevatorModule } from './elevator'
import { createAllDoors, createSlidingDoors } from './doors'



export function main() {

//createStructures()
 let elevator = ElevatorModule.createElevator
// ElevatorModule.initializeElevatorButtons
 // ElevatorModule.initializeElevatorCallButtons
createAllDoors()


}
