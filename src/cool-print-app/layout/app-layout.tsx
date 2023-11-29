import {CSSProperties, useEffect, useRef} from "react";
import {computed, Observable, observable} from "@legendapp/state";

import {Stage, Layer, Text, Rect, Transformer} from "react-konva";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import ShapeConfig = Konva.ShapeConfig;
import {AppState} from "../state/type.ts";

const Editor = () => {
  return (
    <div style={style}>
      <div style={mainStyle}>
        <div style={toolbarStyle}>
          <Toolbar />
        </div>
        <div
          style={{
            position: "relative",
            border: "4px dashed #9d1a94",
            minHeight: 500,
            flex: 1,
          }}
        >
          <MainView />
          <div style={controlStyle}>
            <Controls />
          </div>
        </div>
      </div>
    </div>
  );
};

const Controls = () => {
  return <div>controls</div>;
};

const Object = ({config, isSelected, onSelect}: {config: ShapeConfig, isSelected: boolean, onSelect: () => void}) => {
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    // const {x, y} = e.target.attrs
    // appState$.objects.set()
  }

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        id={config.id}
        ref={shapeRef}
        fill={config.fill}
        x={config.x}
        y={config.y}
        width={config.width}
        height={config.height}
        onClick={onSelect}
        draggable={isSelected}
        onDragEnd={handleDragEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  )
}

const MainView = () => {
  // const handleDrag = (e: KonvaEventObject<DragEvent>) => {
  //   const {x, y} = e.target.attrs
  //   appState$.x.set(x)
  //   appState$.y.set(y)
  // }

  const handleSelect = (id: string) => appState$.selectedObjectId.set(id)

  return (
    <div style={stageStyle}>
      <Stage width={600} height={400}>
        <Layer>
          <Text text="Stage" />
          {appState$.get().objects.map(obj => (
            <Object
              key={obj.id}
              isSelected={appState$.selectedObjectId.get() === obj.id}
              config={obj}
              onSelect={() => {
                handleSelect(obj.id)
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

const Toolbar = () => {
  // const increaseWidth = () => {
  //   appState$.width.set(prev => prev + 1)
  // }
  //
  // const moveObjectRight = () => {
  //   appState$.x.set(prev => prev + 1)
  // }

  return (
    <div>
      {appState$.get().objects.map(obj => (
        <p key={obj.id}>
          W: {obj.width}, H: {obj.height}, X: {obj.x}, Y: {obj.y}
        </p>
      ))}
      {/*<button onClick={increaseWidth}>Increase width</button>*/}
      {/*<button onClick={moveObjectRight}>Move right</button>*/}
    </div>
  );
};

const stageStyle: CSSProperties = {
  width: 600,
  height: 400,
  border: "4px dashed powderblue",
  margin: 'auto',
  marginTop: 10
}

const toolbarStyle: CSSProperties = {
  width: 500,
  border: "4px dashed #c6cc2e",
};

const appState$: Observable<AppState> = observable({
  objects: [{
    id: '1',
    fill: 'red',
    width: 100,
    height: 100,
    x: 20,
    y: 20
  }, {
    id: '2',
    fill: 'blue',
    width: 100,
    height: 100,
    x: 50,
    y: 50
  }],
  selectedObjectId: '',
  // selectedObject: computed(() => appState$.objects.find(o => appState$.selectedObjectId.get() === o.get().id)),
});



const controlStyle: CSSProperties = {
  position: "absolute",
  bottom: 20,
  left: "50%",
  border: "4px dashed #00b5ff",
};

const mainStyle: CSSProperties = {
  gap: 40,
  display: "flex",
};

const style: CSSProperties = {
  background: "#3f3f3e",
  padding: 20,
  border: "2px dashed green",
  width: "100dvw",
  height: "100dvh",
  boxSizing: "border-box",
};

export default Editor;
