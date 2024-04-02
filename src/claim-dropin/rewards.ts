import { ColliderLayer, engine, GltfContainer, Transform, VideoState, MeshCollider, MeshRenderer, pointerEventsSystem, PointerEvents, InputAction } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math';
import { CONFIG } from '../config';
import { claimToken } from "./claim";
import { ClaimConfig } from "./claimConfig";
import { rewardUI } from '../UI/claim.ui';
import * as utils from '@dcl-sdk/utils'


let dispenserModel = 'models/dispenser.glb'
let dispenserPosition = Vector3.create(16, 20, 16)
let dispenserHoverText = 'Claim Reward'
export let reward = false


export function createWearableReward() {

  console.log('creating wearable reward')
  CONFIG.init()

  let dispenserWearable = engine.addEntity()
  Transform.create(dispenserWearable, {
    position: dispenserPosition,
    scale: Vector3.create(2, 2, 2)
  })

  GltfContainer.create(dispenserWearable, {
    src: dispenserModel,
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
  })

 
  // Remove line below to stop the dispenser from spinning
  utils.perpetualMotions.startRotation(dispenserWearable, Quaternion.fromEulerDegrees(0, 25, 0))


  pointerEventsSystem.onPointerDown(
    {
      entity: dispenserWearable,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: dispenserHoverText,
        maxDistance: 16
      }
    },
    function () {
      reward = true
      let camp = ClaimConfig.campaign.CAMPAIGN_TEST
      claimToken(camp, camp.campaignKeys.KEY_0)
      console.log('claimed Wearable gift')
      utils.timers.setTimeout(() => { engine.removeEntity(dispenserWearable) }, 1000)
    }
  )

  return dispenserWearable
}

