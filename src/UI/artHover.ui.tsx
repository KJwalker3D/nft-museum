import { Entity, InputAction, MeshCollider, PointerEventType, PointerEvents, Transform, UiCanvasInformation, engine } from "@dcl/ecs";
import { Color4, Quaternion, Vector3 } from "@dcl/ecs-math";
import ReactEcs, { UiEntity, Label } from "@dcl/react-ecs";
import { ArtComponent, ArtHover, currentArtworkId, findArtworkById, hoverVisible, setArtworkId, toggleHover } from "../Art/artHover";
import { wordWrap, tieredModalTextWrapScale, breakLines, tieredFontScale } from "../helperFunctions";
import { addArtworkData } from "../Art/artData";



const Max_Chars = 35
const Min_Chars = 25
const titleFontSize = 24;
const descriptionFontSize = 16
const artHoverScale = Vector3.create(1, 1, 1) // Default size of the trigger area for art UI details

const titleFont = 'serif'
const descriptionFont = 'sans-serif'

const titleColor = Color4.White()
const descriptionColor = Color4.White()

const artFrame = 'images/artFrame.png'






  // for each gallery entity => position = position.y -1, rotation = rotation, scale: scale,
// artworkid = artwork id, arttitle = arttile, artdescription = art description


export function artDetailsUI() {
    if (hoverVisible) {
      //console.log('show ui')
      const artwork = findArtworkById(currentArtworkId);
      if (artwork && artwork.visible) {
          const { title, description } = artwork;
      const artTitleWrap = wordWrap(title, 12 * tieredModalTextWrapScale, 6) 
      const artDescriptionWrap = breakLines(description, Max_Chars)
      return (
        <UiEntity key={'main'}
          uiTransform={{
            height: `${UiCanvasInformation.get(engine.RootEntity).height * .15}`,
            width: `${UiCanvasInformation.get(engine.RootEntity).width * .5}`,
            positionType: 'absolute',
            position: `5% 0 0 89%`,
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '15%',
            maxWidth: '500px',
            minWidth: '500px',
            
  
          }}
          onMouseDown={toggleHover}
          uiBackground={{
            texture: { src: artFrame }, 
            textureMode: "stretch", uvs: [1, 1, 1, 1]
          }}
  
        >
          {/* Label displaying Art Title */}
          <Label key={'artTitle'}
            value={artTitleWrap}
            fontSize={16 * tieredFontScale}
            font={titleFont}
            textAlign="middle-center"
            uiTransform={{
              width: 'auto',
              height: 'auto',
              alignSelf: 'stretch',
              margin: `0px 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .0075}`,
              positionType: 'absolute',
              position: '-25% 0 0 0%',
            }}
            color={titleColor}
            onMouseDown={toggleHover}
            
          />
          {/* Label displaying Art Details */}
          <Label key={'artDetails'}
            value={artDescriptionWrap}
            fontSize={10 * tieredFontScale}
            font={descriptionFont}
            textAlign="middle-left"
            uiTransform={{
              width: 'auto',
              height: 'auto',
              alignSelf: 'stretch',
              margin: `10px 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .0075}`,
              positionType: 'absolute',
              position: '15% 0 0 0%',
            }}
            color={descriptionColor}
            onMouseDown={toggleHover}
          />
        </UiEntity>
  
  
      );
  
    }}
  
  }
  