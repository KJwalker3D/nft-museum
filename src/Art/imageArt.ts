import { InputAction, Material, MeshCollider, MeshRenderer, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/sdk/math";
import { openExternalUrl } from "~system/RestrictedActions";

// For static images that aren't loaded in as NFTs

export function createImageArt(
    image: string, // can be path to image file or url to hosted image
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    hoverText: string,
    url: string,
    hasAlpha: boolean
) {

    let imageEntity = engine.addEntity()
    Transform.create(imageEntity, {
        position: position, 
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: scale 
    })
    MeshRenderer.setPlane(imageEntity)
    MeshCollider.setPlane(imageEntity)

    pointerEventsSystem.onPointerDown(
        {
          entity: imageEntity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: hoverText,
            maxDistance: 16
          }
        },
        function () {
         openExternalUrl({
            url: url
         })
        }
      )

      const imageMaterial = Material.Texture.Common({ src: image });


      if (!hasAlpha) {

        Material.setPbrMaterial(imageEntity, {
          texture: imageMaterial,
          roughness: 1,
          specularIntensity: 0,
          metallic: 0,
          emissiveColor: Color3.White(),
          emissiveIntensity: 1,
          emissiveTexture: imageMaterial,
        })
      }

      else if (hasAlpha) {

        Material.setPbrMaterial(imageEntity, {
          texture: imageMaterial,
          roughness: 1,
          specularIntensity: 0,
          metallic: 0,
          alphaTexture: imageMaterial,
          //alphaTest: 0.95,
          emissiveColor: Color3.Black(),
          emissiveIntensity: 1,
          emissiveTexture: imageMaterial,
          
        })
      }

      return imageEntity
}