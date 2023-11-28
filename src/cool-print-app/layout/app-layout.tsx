import { CSSProperties } from "react";
import { observable } from "@legendapp/state";

const Editor = () => {
  return (
    <div style={style}>
      <div style={mainStyle}>
        <div style={toolbarStyle}>
          <Editor.Toolbar></Editor.Toolbar>
        </div>
        <div
          style={{
            position: "relative",
            border: "4px dashed #9d1a94",
            minHeight: 500,
            flex: 1,
          }}
        >
          <Editor.MainView></Editor.MainView>
          <div style={controlStyle}>
            <Editor.Controls></Editor.Controls>
          </div>
        </div>
      </div>
    </div>
  );
};

Editor.Controls = () => {
  return <div>controls</div>;
};

Editor.MainView = () => {
  console.log(appState.get().heigh);
  return <div>view</div>;
};

Editor.Toolbar = () => {
  return <div>toolbar</div>;
};

const toolbarStyle: CSSProperties = {
  width: 500,
  border: "4px dashed #c6cc2e",
};

const appState = observable({
  width: 0,
  heigh: 0,
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
