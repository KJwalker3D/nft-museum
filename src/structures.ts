import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";

export let sceneCentrePosition = Vector3.create(16, 0, 16)

export function createStructures() {

    const museum = engine.addEntity()
    Transform.create(museum, {
        position: sceneCentrePosition,
        rotation: Quaternion.Zero(),
        scale: Vector3.One()
    })
    GltfContainer.create(museum, {
        src: 'models/museum.glb'
    })

}