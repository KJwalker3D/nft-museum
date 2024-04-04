import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Label, Button } from "@dcl/sdk/react-ecs";
import { openMixcloud, streamPlaying, togglePlay, skipSong, updateNowPlayingTitle, nowPlayingElement, playingArtist } from "../audio";
import { tieredFontScale, tieredModalTextWrapScale, wordWrap } from "../helperFunctions";
import { backgroundColor, pauseIcon, playIcon, skipIcon } from "./ui";

// Set Playlist to 'false' to hide the playlist UI:
let Playlist: Boolean = true

let songData = `${nowPlayingElement}\n ${playingArtist}`
let songDataWrap = wordWrap(songData, 12 * tieredModalTextWrapScale, 6)

export function playlistUI() {
    if (Playlist) {
        return (
            <UiEntity
                key={'playlist-main'}
                uiTransform={{
                    height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.5}`,
                    width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.075}`,
                    positionType: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    padding: 4,
                    position: {
                        top: '80%',
                        right: '0%',
                        bottom: '0%',
                        left: '95%'
                    },
                    maxWidth: 100,
                    maxHeight: 200
                }}
                uiBackground={{
                    color: backgroundColor
                }}
            >
                <UiEntity
                    key={'playlist-adjust'}
                    uiTransform={{
                        margin: '0 0 0 0',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <Label
                        key={'playlist-data'}
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            margin: '0 0 5 0'
                        }}
                        value={`${songDataWrap}`}
                        fontSize={14 * tieredFontScale}
                        color={Color4.White()}
                        onMouseDown={openMixcloud}
                    />
                    <Button
                        key={'playlist-toggle'}
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            margin: '0 0 15 0'
                        }}
                        value=''
                        variant='secondary'
                        fontSize={24 * tieredFontScale}
                        color={Color4.White()}
                        uiBackground={{
                            textureMode: 'nine-slices',
                            texture: {
                                src: streamPlaying ? pauseIcon : playIcon,
                            },
                            textureSlices: {
                                top: -0.0,
                                bottom: -0.0,
                                left: -0.0,
                                right: -0.0,
                            },
                        }}
                        onMouseDown={togglePlay}
                    />
                    <Button
                        key={'playlist-skip'}
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            margin: '0 0 15 0'
                        }}
                        value=''
                        variant='secondary'
                        fontSize={24 * tieredFontScale}
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
                        }}
                    />
                    <Button
                        key={'playlist-artist'}
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.07}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.02}`,
                            margin: '0 0 5 0'
                        }}
                        value='RED ALBERT'
                        variant='primary'
                        fontSize={10 * tieredFontScale}
                        color={Color4.White()}
                        onMouseDown={openMixcloud}
                    />
                </UiEntity>
            </UiEntity>
        );
    } else {
        return null; // Return null if Playlist is false
    }
}
