import {
    engine,
    Transform,
    UiBackground,
  } from '@dcl/sdk/ecs'
  import { Color4 } from '@dcl/sdk/math'
  import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
  import { nowPlayingElement, updateTitle, playCurrentSong, playingArtist, playlist, skipSong, streamPlaying, togglePlay, updateNowPlayingTitle, openMixcloud, currentSong } from './audio'
  import { openExternalUrl } from '~system/RestrictedActions'
  
  
  export function setupUi() {
    ReactEcsRenderer.setUiRenderer(uiComponent)
  }
  const RAlogo = './red.png';
  const pauseIcon = '/pauseIcon.png';
  const playIcon = 'playIcon.png';
  const skipIcon = 'images/skipIcon.png'
  let isPlaying: boolean = true;
  
  const uiComponent = () => (
    <UiEntity
      uiTransform={{
        positionType: 'relative',
        width: '28.5%',
        height: 600,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: {
          top: '0%', 
          right: '0%',
          bottom: '0%', 
          left: '70%'
        },
        padding: 4,
      }}
    >
      <UiEntity
        uiTransform={{
          margin: '8px 8px 0 0', // Push to the bottom-right corner
          flexDirection: 'column', // Stack in reverse order
          justifyContent: 'space-evenly',
          alignItems: 'flex-end', // Align items to the right
        }}
      >
       
        <Button
          uiTransform={{ width: 100, height: 100, margin: '0 0 8px 0' }}
          value=''
          variant='primary'
          fontSize={24}
          onMouseDown={() => {
            openMixcloud()
            //openExternalUrl({ url: 'https://google.com' });
            console.log('clicked mixcloud')
          }}
          uiBackground={{
            textureMode: 'nine-slices',
            texture: {
              src: RAlogo,
            },
            textureSlices: {
              top: -0.0,
              bottom: -0.0,
              left: -0.0,
              right: -0.0,
            },
          }}
        
        />
             <Button
          uiTransform={{ width: 100, height: 60, margin: '0 0 8px 0' }}
          value='RED ALBERT\nMixCloud'
          variant='primary'
          fontSize={16}
          color={Color4.White()}
          uiBackground={{
            color: Color4.Black()
          }}
          onMouseDown={() => {
            openMixcloud()
            //openExternalUrl({ url: 'https://google.com' });
            console.log('clicked mixcloud')
          }}
        />
      
        
       
       <Button
         uiTransform={{ width: 100, height: 100, margin: '0 0 8px 0' }}
         value=''
         variant='primary'
         fontSize={24}
         color={Color4.White()}
         uiBackground={{
           textureMode: 'nine-slices',
           texture: {
             src: streamPlaying? pauseIcon : playIcon,
           },
           textureSlices: {
             top: -0.0,
             bottom: -0.0,
             left: -0.0,
             right: -0.0,
           },
         }}
         onMouseDown={() => {
           if (streamPlaying) {
             togglePlay();
            isPlaying = false;
           } else if (!streamPlaying) {
            togglePlay();
            isPlaying = true;
           }
         }}
       />
        <Button
         uiTransform={{ width: 100, height: 100, margin: '0 0 8px 0' }}
         value=''
         variant='primary'
         fontSize={24}
         color={Color4.White()}
         uiBackground={{
           textureMode: 'nine-slices',
           texture: {
             src: skipIcon,
           },
           textureSlices: {
             top: -0.0,
             bottom: -0.0,
             left: -0.0,
             right: -0.0,
           },
         }}
         onMouseDown={() => {
          skipSong();
          updateNowPlayingTitle(nowPlayingElement, playingArtist);
          resetUI()
          console.log(`Playing:\n ${nowPlayingElement}\n ${playingArtist}`)
         }}
       />
        
       </UiEntity>
    </UiEntity>
  )
  
  export function resetUI() {
    ReactEcsRenderer.setUiRenderer(uiComponent)
    console.log('updated ui')
  }
  