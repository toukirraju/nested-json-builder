import React, { ChangeEvent, useContext, useState } from "react";
import { BuilderContext } from "./context/BuilderProvider";
import KeyValueInput from "./components/KeyValueInput";
import ParentName from "./components/ParentName";
import ParentSelector from "./components/ParentSelector";
import arrayToObject from "./utils/arrayToObject";
import Header from "./components/Header";
import NestedObjectRenderer from "./components/NestedObjectRenderer";
import ReactJson from "react-json-view";
import { IoArrowUndo } from "react-icons/io5";
import { TiExport } from "react-icons/ti";
import { RiImportFill } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";

const Builder = () => {
  const { state, dispatch } = useContext(BuilderContext);

  const [preview, setPreview] = useState("object");

  const { selectedParent, baseArray } = state || {};

  const generatedObject = arrayToObject(baseArray);

  //copy json to clipboard
  const handleCopy = async () => {
    try {
      if (preview === "array") {
        await navigator.clipboard.writeText(JSON.stringify(baseArray, null, 2));
      } else {
        await navigator.clipboard.writeText(
          JSON.stringify(generatedObject, null, 2)
        );
      }

      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy!");
    }
  };

  // Import JSON file and set to state
  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result as string;
      try {
        const obj = JSON.parse(text);
        console.log(obj);
        dispatch({ type: "IMPORT_JSON", payload: obj });
        alert("File imported successfully!");
      } catch (error) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // Export JSON file
  const handleExport = () => {
    const dataStr = JSON.stringify(
      preview === "array" ? baseArray : generatedObject,
      null,
      2
    );
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `data_${preview}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-full w-full  gap-2">
      {/* object maker */}
      <div className="bg-gray-200 w-1/2 pt-10 flex flex-col items-center space-y-10">
        <h1 className="text-2xl font-bold">JSON Builder</h1>
        <div className="flex items-center gap-2 text-[20px]">
          {/* import  */}
          <label
            htmlFor="import-json"
            className="cursor-pointer text-gray-500 hover:text-teal-600"
          >
            <RiImportFill title="Import" />
            <input
              type="file"
              id="import-json"
              accept=".json"
              className="hidden"
              onChange={handleImport}
            />
          </label>
          {/* export  */}
          <TiExport
            title="Export"
            className="cursor-pointer text-gray-500 hover:text-teal-600"
            onClick={handleExport}
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          {/* header */}
          <Header />
          {/* parent name */}
          {state.isObject ? (
            <ParentName />
          ) : selectedParent ? (
            <KeyValueInput />
          ) : (
            <ParentSelector />
          )}
        </div>
      </div>

      {/* object editor */}
      {arrayToObject(baseArray) &&
      Object.keys(arrayToObject(baseArray) || {}).length > 0 ? (
        <div className="bg-gray-200 w-full h-screen overflow-auto">
          <NestedObjectRenderer data={arrayToObject(baseArray)} key="root" />
        </div>
      ) : (
        <div className="bg-gray-200 w-full h-screen overflow-auto flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-500">
            There is no data for edit
          </h1>
          <p className="text-sm font-bold text-gray-500">
            Please create json from left panel
          </p>
        </div>
      )}

      {/* object preview */}
      <div className="relative bg-gray-200 w-full  ">
        <div className="absolute  top-2 right-2 flex items-center gap-2 z-10">
          <FaRegCopy
            onClick={handleCopy}
            className="font-bold h-6 w-6 text-teal-800  hover:text-teal-600 cursor-pointer "
          />

          <button
            onClick={() => setPreview("object")}
            className={`py-1 px-3 border-2 ${preview === "object" && "bg-teal-600 text-white"} border-teal-600 hover:bg-teal-600 hover:text-white rounded-md`}
          >
            Object
          </button>

          <button
            onClick={() => setPreview("array")}
            className={`py-1 px-3 border-2 ${preview === "array" && "bg-teal-600 text-white"} border-teal-600 hover:bg-teal-600 hover:text-white rounded-md`}
          >
            Array
          </button>
        </div>
        <div className="h-screen overflow-auto">
          <ReactJson
            enableClipboard={false}
            displayDataTypes={false}
            src={preview === "array" ? state.baseArray : generatedObject || {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Builder;
