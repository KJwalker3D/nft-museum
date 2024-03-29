// We define the empty imports so the auto-complete feature works as expected.
import { Vector3 } from '@dcl/sdk/math'
import { createStructures } from './structures'
import { ElevatorModule } from './elevator'
import { createAllDoors, doorSound } from './doors'
import { playAudioAtPlayer } from './audio'



export function main() {

createStructures()
ElevatorModule.createElevator
createAllDoors()


}
