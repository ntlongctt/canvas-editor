import { CSSProperties } from "react";
import { observable } from "@legendapp/state";

import { Stage, Layer, Text, Rect } from "react-konva";

const Editor = () => {
  return (
    <div style={style}>
      <div style={mainStyle}>
        <div style={toolbarStyle}>
          <Toolbar></Toolbar>
        </div>
        <div
          style={{
            position: "relative",
            border: "4px dashed #9d1a94",
            minHeight: 500,
            flex: 1,
          }}
        >
          <MainView></MainView>
          <div style={controlStyle}>
            <Controls></Controls>
          </div>
        </div>
      </div>
    </div>
  );
};

const Controls = () => {
  return <div>controls</div>;
};

const MainView = () => {
  return (
    <div>
      <Stage width={appState$.get().width} height={appState$.get().heigh}>
        <Layer>
          <Text text="Try click on rect" />
          <Rect
            fill="red"
            x={0}
            y={0}
            width={appState$.get().width}
            height={appState$.get().heigh}
          ></Rect>
        </Layer>
      </Stage>
    </div>
  );
};

const Toolbar = () => {
  return (
    <div>
      W: {appState$.get().width}, H: {appState$.get().heigh}
    </div>
  );
};

const toolbarStyle: CSSProperties = {
  width: 500,
  border: "4px dashed #c6cc2e",
};

const appState$ = observable({
  width: 100,
  heigh: 100,
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
