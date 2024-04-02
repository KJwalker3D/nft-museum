import { Animator, engine, Transform, GltfContainer, ColliderLayer, Entity, pointerEventsSystem, InputAction, AudioSource, MeshRenderer, AvatarAttach, AvatarAnchorPointType, AudioStream } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils'
import { openExternalUrl } from '~system/RestrictedActions'

/// This is the Playlist, set to false to remove it
export let streamPlaying: boolean = true;

// This is the radio, set to true to play it 
export let radioPlaying: boolean = false

// House Radio (24 House Radio)
let radioStation = 'https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720'


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

let audioEntity: Entity | null = null;


///// PLAYLIST

type Song = {
    title: string;
    artist: string;
    url: string;
    duration: number; // Duration in seconds
  };

export const playlist: Song[] = [
    // Up Down Jumper
    { title: 'DCLMF23 Set', artist: 'RED ALBERT', duration: (60 * 60), url: 'https://bafybeigyzew44hkz46vzugd3plpovkboshdztv74vkmhhflz44477kmqte.ipfs.nftstorage.link/' },
    { title: 'MVFW23 Set', artist: 'RED ALBERT', duration: (60 * 60) +1, url: 'https://bafybeicvyrgg6jnvpajfenbdspaevx4yydizslxdgmgd6f2y4tptpkzjpu.ipfs.nftstorage.link/' },
    { title: 'LPM x SOA Set 22', artist: 'RED ALBERT', duration: (59 * 60) +57, url: 'https://bafybeihis46rooueupvj3dett2sz6745lq5od3x74hvmtfvvollsldr5vq.ipfs.nftstorage.link/' },

  ];

  let currentSongIndex = 0;
  export const currentSong = playlist[currentSongIndex];
  export let nowPlayingElement = currentSong.title;
  export let playingArtist = currentSong.artist;
  export let updateTitle = nowPlayingElement

  export function updateNowPlayingTitle(title: string, artist: string) {


  console.log('Before Update:', playlist[currentSongIndex]);
    currentSong.title = title;
    currentSong.artist = artist;
    console.log(`Playing:\n ${currentSong.title}\n ${currentSong.artist}`)

  console.log('After Update:', playlist[currentSongIndex]);

  return { title: nowPlayingElement, artist: playingArtist }
}

  // Shuffle the playlist
export function shufflePlaylist(playlist: Song[]) {
    if (!playlist || !playlist.length) {
        console.error("Playlist is empty or undefined");
        return;
      }
    for (let i = playlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }
  }

const streamEntity = engine.addEntity();
AudioStream.create(streamEntity, {
    url: "",
    playing: false,
    volume: 0.8
});


// Play the current song
export function playCurrentSong() {
  if (currentSongIndex < playlist.length) {
   const currentSong = playlist[currentSongIndex];
   const audioStream = AudioStream.getMutable(streamEntity);
   const currentArtist = currentSong.artist;
   const currentTitle = currentSong.title;

   audioStream.url = currentSong.url;
   audioStream.playing = true;


   utils.timers.setTimeout(() => {
       audioStream.playing = false;
       currentSongIndex++;
       if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
       }
       playCurrentSong()
       updateNowPlayingTitle(currentTitle, currentArtist)
    
   }, currentSong.duration * 1000)
  }
}


export function skipSong() {
  if (currentSongIndex < playlist.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }
  playCurrentSong();
  }
  

  export function togglePlay() {
    const stream = AudioStream.getMutable(streamEntity);
    if (stream.playing) {
      stream.playing = false;
      streamPlaying = false;
    } else if (!stream.playing) {
      stream.playing = true;
      streamPlaying = true;
    }
  }

  export function openMixcloud() {
    openExternalUrl({url: "https://www.mixcloud.com/alberto-mart%C3%ADnez-cobos/uploads/"})
  }

  export function openRadio() {
    openExternalUrl({url: "https://onlineradiobox.com/ro/24house/?cs=ro.24house"})
  }


  export function playRadio() {
    if (radioPlaying) {
     const audioStream = AudioStream.getMutable(streamEntity);
  
     audioStream.url = radioStation;
     audioStream.playing = true;
    }
  }