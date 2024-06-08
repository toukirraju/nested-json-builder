import { useContext } from "react";
import { BuilderContext } from "../context/BuilderProvider";
import arrayToObject from "../utils/arrayToObject";
import NestedObjectRenderer from "./NestedObjectRenderer";

const ObjEditor = () => {
  const { state } = useContext(BuilderContext);

  const { baseArray } = state || {};

  return arrayToObject(baseArray) &&
    Object.keys(arrayToObject(baseArray) || {}).length > 0 ? (
    <div className="bg-gray-200 w-full h-screen overflow-auto">
      <NestedObjectRenderer data={arrayToObject(baseArray)} key="root" />
    </div>
  ) : (
    <div className="bg-gray-200  h-screen overflow-auto flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-500">
        There is no data for edit
      </h1>
      <p className="text-sm font-bold text-gray-500">
        Please create json from left panel
      </p>
    </div>
  );
};

export default ObjEditor;
