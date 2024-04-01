import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { Animator, engine, Transform, GltfContainer, ColliderLayer, Entity, pointerEventsSystem, InputAction, AudioSource } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { playAudioAtPlayer } from "../audio";
import { doorSound } from "../doors";

const kineticArtCircles = 'models/kineticArt-threeCircles.glb';
const kineticArtCirclesClip = 'play2'
const kineticArtCircuit = 'models/kineticArt-circuit.glb'
const kineticArtCircuitClip = 'play3'


export function createKineticArt( 
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    triggerPosition: Vector3,
    triggerScale: Vector3,
    modelPath: string,
    animationClip: string,
    audio: string | null = null // optional parameter to add sound
 ) {

    let kineticArtEntity = engine.addEntity();
    Transform.create(kineticArtEntity, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: scale
    } )

    GltfContainer.create(kineticArtEntity, {
        src: modelPath,
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

    Animator.create(kineticArtEntity, {
        states: [
            {
                clip: animationClip,
                playing: false,
                loop: true
            }
        ]
    })

    
    utils.triggers.addTrigger(
        kineticArtEntity, 
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{ type: 'box', 
        position: triggerPosition, 
        scale: triggerScale }],
        function (otherEntity) {
            let animateArt = Animator.playSingleAnimation(kineticArtEntity, animationClip, false)
            if (audio) {
                playAudioAtPlayer(audio)
            }
        },
        function (anotherEntity) {
            let stopAnim = Animator.stopAllAnimations(kineticArtEntity, false)
        }
        
        
        )
        //utils.triggers.enableDebugDraw(true)
}


export function initializeKineticArt() {

    createKineticArt(
        Vector3.create(21.65, 10.5, 16), // art position
        Vector3.create(0, 0, 0), // rotation
        Vector3.create(0.5, 0.5, 0.5), //scale
        Vector3.create(0, 0, 0), // trigger position
        Vector3.create(6, 5, 10), // trigger scale
        kineticArtCircles, // path to model
        kineticArtCirclesClip, // animation clip
    )

    createKineticArt(
        Vector3.create(6.5, 9.75, 16), // art position
        Vector3.create(0, 0, 0), // rotation
        Vector3.create(0.8, 0.8, 0.8), //scale
        Vector3.create(2, 0, 0), // trigger position
        Vector3.create(10, 4, 10), // trigger scale
        kineticArtCircuit, // path to model
        kineticArtCircuitClip // animation clip
    )


}