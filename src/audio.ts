import { Animator, engine, Transform, GltfContainer, ColliderLayer, Entity, pointerEventsSystem, InputAction, AudioSource, MeshRenderer, AvatarAttach, AvatarAnchorPointType } from "@dcl/sdk/ecs";

let audioEntity: Entity | null = null;

// Global function to play an audio clip at the player's location
export function playAudioAtPlayer(audioClipUrl: string, volume: number = 100) {
    // Get the player's entity
    if (!audioEntity) {
        // Create the audio entity if it doesn't exist
        audioEntity = engine.addEntity();

        // Attach the audio entity to the player's name tag position
        AvatarAttach.create(audioEntity, {
            anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG
        });

        // Create AudioSource component
        AudioSource.createOrReplace(audioEntity, {
            audioClipUrl: audioClipUrl,
            loop: false,
            volume: volume
        });
    }

    // Set the audio clip URL and play the audio
    AudioSource.playSound(audioEntity, audioClipUrl, true);

    console.log('Audio played at player location:', audioClipUrl);
}