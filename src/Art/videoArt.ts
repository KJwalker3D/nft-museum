
import {
  engine,
  Transform,
  Schemas,
  GltfContainer,
  ColliderLayer,
  pointerEventsSystem,
  InputAction,
  Entity,
  MeshRenderer,
  MeshCollider,
  Material,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { Color3, Color4, Plane, Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
//import { isImage } from './triggerAreas';
import { openExternalUrl } from '~system/RestrictedActions';

let isImage = true



export function createToggleableArt(position: Vector3, rotation: Vector3, scale: Vector3, image: string, video: string, hoverText: string, website: string) {

  const toggleableArt = engine.addEntity()
  MeshRenderer.setPlane(toggleableArt)
  MeshCollider.setPlane(toggleableArt)

  Transform.createOrReplace(toggleableArt, {
    position: position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    scale: scale
  })

  const imageMaterial = Material.Texture.Common({ src: image });
  const videoTexture = Material.Texture.Video({ videoPlayerEntity: toggleableArt });

  Material.setPbrMaterial(toggleableArt, {
    texture: imageMaterial,
    roughness: 1,
    specularIntensity: 0,
    metallic: 0,
    emissiveColor: Color3.White(),
    emissiveIntensity: 1,
    emissiveTexture: imageMaterial
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: toggleableArt,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: hoverText
      }
    },
    function () {
      console.log("clicked artwork")
      openExternalUrl({
        url: website
      })
    }
  )

}



export function toggleArt(image: string, video: string, artPosition: Vector3, artRotation: Vector3, artScale: Vector3) {
  const toggleableArt = engine.getEntityOrNullByName("ToggleableArt");
  if (!toggleableArt) return;

  const currentMaterial = isImage ? Material.Texture.Common({ src: image }) : Material.Texture.Video({ videoPlayerEntity: toggleableArt });
  
  Material.setPbrMaterial(toggleableArt, {
    texture: currentMaterial,
    roughness: 1,
    specularIntensity: 0,
    metallic: 0,
    emissiveColor: Color3.White(),
    emissiveIntensity: 1,
    emissiveTexture: currentMaterial
  });

  Transform.createOrReplace(toggleableArt, {
    position: artPosition,
    rotation: Quaternion.fromEulerDegrees(artRotation.x, artRotation.y, artRotation.z),
    scale: artScale
  })
 
  isImage = !isImage
}


export function createArtTrigger(position: Vector3, scale: Vector3, placeHolderImage: string, VideoURL: string, hasAudio: boolean, artPosition: Vector3, artRotation: Vector3, artScale: Vector3) {

  const artTrigger = utils.addTestCube(
    {
      position: position,
      scale: scale
    },
    undefined,
    undefined,
    Color4.create(1, 1, 1, 0),
    undefined,
    true
  )
  utils.triggers.addTrigger(
    artTrigger,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [{
      type: 'box',
      scale: scale
    }],
    function (otherEntity) {
      //switch from image to video
      toggleArt(placeHolderImage, VideoURL, artPosition, artRotation, artScale)
      console.log('switch to video')

    },
    function (otherEntity) {
      //switch from video to image
      toggleArt(placeHolderImage, VideoURL, artPosition, artRotation, artScale)
      console.log('switch to image')

    },
    Color4.Yellow()
  )
  //utils.triggers.enableDebugDraw(true)
} 

export function initializeToggleableArt() {

  createToggleableArt(
    Vector3.create(1, 1, 1), // position
    Vector3.One(), // rotation
    Vector3.One(), // scale
    '', // image
    '', // video
    '', // hover text
    '' // website
  )

  createArtTrigger(
    Vector3.create(1, 1, 1),
    Vector3.One(),
    '', // image
    '', // video
    false, // audio boolean (has audio?)
    Vector3.create(1, 1, 1), // art position
    Vector3.One(), // art rotation
    Vector3.One() // art scale
  )
}