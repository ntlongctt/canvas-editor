export type Obj = {
  id: string;
  fill: string;
  width: number;
  height: number;
  x: string;
  y: string;
}

export type AppState = {
  objects: Obj[];
  selectedObjectId: string;
  // selectedObject: Obj | undefined;
};
