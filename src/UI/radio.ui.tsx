import { UiCanvasInformation, engine } from "@dcl/sdk/ecs";
import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity, Label, Button } from "@dcl/sdk/react-ecs";
import { radioPlaying, togglePlay, openRadio } from "../audio";
import { tieredFontScale } from "../helperFunctions";
import { backgroundColor, pauseIcon, playIcon } from "./ui";



// Set Radio to 'true' to show the radio UI:
let Radio: Boolean = false

export function radioUI() {
    if (Radio) {
        return (
            <UiEntity
                key={'radiomain'}
                uiTransform={{
                    height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.5}`,
                    width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.075}`,
                    positionType: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    padding: 4,
                    position: {
                        top: '8%',
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
                <UiEntity key={'radio-space'}
                    uiTransform={{
                        margin: '0 0 0 0',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <Label key={'radiolabel'}
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.05}`,
                            margin: '0 0 5 0'
                        }}
                        value={'Radio'}
                        fontSize={14 * tieredFontScale}
                        color={Color4.White()}
                    />
                    <Button  key={'radiotoggle'}
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
                                src: radioPlaying ? pauseIcon : playIcon,
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
                    
                    <Button key={'radiobutton'}
                        uiTransform={{
                            width: `${UiCanvasInformation.get(engine.RootEntity).height * 0.07}`,
                            height: `${UiCanvasInformation.get(engine.RootEntity).height * 0.02}`,
                            margin: '0 0 5 0'
                        }}
                        value='24 House Radio'
                        variant='primary'
                        fontSize={10 * tieredFontScale}
                        color={Color4.White()}
                        onMouseDown={openRadio}
                    />
                </UiEntity>
            </UiEntity>
        );
    } else {
        return null; // Return null if Radio is false
    }
}
