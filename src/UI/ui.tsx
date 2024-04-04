import { engine, UiCanvasInformation } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { nowPlayingElement, updateTitle, playCurrentSong, playingArtist, playlist, skipSong, streamPlaying, togglePlay, updateNowPlayingTitle, openMixcloud, currentSong, radioPlaying, openRadio } from '../audio'
import { setupUiInfoEngine, tieredFontScale, tieredModalTextWrapScale, wordWrap } from '../helperFunctions'
import *  as  ui from 'dcl-ui-toolkit'
import { rewardImage, rewardName, rewardUI } from './reward.ui'
import { artDetailsUI } from './artHover.ui'
import { playlistUI } from './playlist.ui'
import { radioUI } from './radio.ui'






export const pauseIcon = 'images/pauseIcon.png';
export const playIcon = 'images/playIcon.png';
export const skipIcon = 'images/skipIcon.png'

export const backgroundColor = Color4.create(0, 0, 0, 0.9) // semi transparent black





export function setupUi() {
    setupUiInfoEngine(),
    ReactEcsRenderer.setUiRenderer(uiComponent)
}

export const uiComponent = () => [
    artDetailsUI(),
    playlistUI(),
    radioUI(),
    rewardUI(rewardImage, rewardName),
    ui.render()
]





