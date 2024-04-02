import {
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  Material,
  VideoPlayer,
  TextureUnion,
  InputAction,
  pointerEventsSystem,
} from '@dcl/sdk/ecs';
import * as utils from '@dcl-sdk/utils';
import { Vector3, openExternalUrl } from '~system/RestrictedActions';
import { Quaternion, Color3, Color4 } from '@dcl/sdk/math';

let videoPlayer: any = null;

export async function createToggleableArt(
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  image: string,
  video: string,
  hoverText: string,
  website: string,
  triggerScale: Vector3
) {
  const toggleableArt = engine.addEntity();
  MeshRenderer.setPlane(toggleableArt);
  MeshCollider.setPlane(toggleableArt);

  let isImage = true;

  Transform.createOrReplace(toggleableArt, {
    position: position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    scale: scale,
  });

  const imageMaterial = Material.Texture.Common({ src: image });
  Material.setPbrMaterial(toggleableArt, {
    texture: imageMaterial,
    roughness: 1,
    specularIntensity: 0,
    metallic: 0,
    emissiveColor: Color3.White(),
    emissiveIntensity: 1,
    emissiveTexture: imageMaterial,
  });

  pointerEventsSystem.onPointerDown(
    {
      entity: toggleableArt,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: hoverText,
      },
    },
    function () {
      console.log('clicked artwork');
      openExternalUrl({
        url: website,
      });
    }
  );

  try {
    videoPlayer = await VideoPlayer.create(toggleableArt, {
      src: video,
      playing: true,
      loop: true,
    });
  } catch (error) {
    console.error('Error creating video player:', error);
  }

  const artTrigger = utils.addTestCube(
    {
      position: position,
      scale: scale,
    },
    undefined,
    undefined,
    Color4.create(1, 1, 1, 0),
    undefined,
    true
  );
  utils.triggers.addTrigger(
    artTrigger,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [
      {
        type: 'box',
        scale: triggerScale,
      },
    ],
    function (otherEntity) {
      // Toggle between image and video
      const videoTexture = Material.Texture.Video({videoPlayerEntity: toggleableArt})

      if (isImage) {
        VideoPlayer.createOrReplace(toggleableArt, {
          src: video,
          playing: true,
          loop: true
         })
         Material.deleteFrom(toggleableArt)
         Material.setPbrMaterial(toggleableArt, {
          texture: videoTexture,
          roughness: 1,
          specularIntensity: 0,
          metallic: 0,
          emissiveColor: Color3.White(),
          emissiveIntensity: 1,
          emissiveTexture: videoTexture
         })
         isImage = false
        }
      
    },
    function (onExit) {
      if (!isImage) {
        Material.deleteFrom(toggleableArt)
        VideoPlayer.deleteFrom(toggleableArt)
        let mat = Material.Texture.Common({
          src: image
         });
         isImage = true
         Material.setPbrMaterial(toggleableArt, {
          texture: Material.Texture.Common({
            src: image
          }),
          roughness: 1,
          specularIntensity: 0,
          metallic: 0,
          emissiveColor: Color3.White(),
          emissiveIntensity: 1,
          emissiveTexture: mat
         })
    
    }
    
  })
  return toggleableArt;

}