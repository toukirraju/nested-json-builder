import React, { ChangeEvent, useContext, useState } from "react";
import { BuilderContext } from "./context/BuilderProvider";
import KeyValueInput from "./components/KeyValueInput";
import ParentName from "./components/ParentName";
import ParentSelector from "./components/ParentSelector";
import arrayToObject from "./utils/arrayToObject";
import Header from "./components/Header";
import { TiExport } from "react-icons/ti";
import { RiImportFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineFindInPage } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BuilderProps } from ".";
import ObjEditor from "./components/ObjEditor";
import ObjPreviewer from "./components/ObjPreviewer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../Dialog/Dialog";

const Builder: React.FC<BuilderProps> = ({ initJson, onChange }) => {
  const { state, dispatch } = useContext(BuilderContext);

  const [preview, setPreview] = useState("object");

  const { selectedParent, baseArray } = state || {};

  const generatedObject = arrayToObject(baseArray);

  // Import JSON file and set to state
  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result as string;
      try {
        const obj = JSON.parse(text);
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

  // set initial json data to state
  React.useEffect(() => {
    if (!initJson) return;
    dispatch({ type: "IMPORT_JSON", payload: initJson });
  }, [initJson]);

  // pass json data to parent component
  React.useEffect(() => {
    if (!generatedObject) return;
    generatedObject && onChange && onChange(generatedObject);
  }, [generatedObject]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden md:h-full w-full gap-2 ">
      {/* object maker */}
      <div className="md:bg-gray-200 w-full  md:w-1/2 pt-4 md:pt-10 flex flex-col items-center space-y-2 md:space-y-10">
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

      <div className="w-full hidden md:block">
        {/* object editor */}
        <ObjEditor />
      </div>

      {/* object preview */}
      <div className="relative bg-gray-200 w-full   md:block ">
        <ObjPreviewer preview={preview} setPreview={setPreview} />
      </div>

      {/* mobile view */}

      <div className="absolute  bottom-4 right-4 flex md:hidden gap-2">
        {/* editor  */}
        <Dialog>
          <DialogTrigger className="h-9 w-9 border-2 text-teal-700 hover:bg-teal-600 hover:text-white border-teal-600 rounded-full flex justify-center items-center">
            {/* icon  */}
            <FiEdit className="text-inherit " />
          </DialogTrigger>
          <DialogContent className="bg-slate-400 w-full relative">
            <ObjEditor />
            <DialogClose className="absolute bottom-4 right-4">
              <AiOutlineCloseCircle className="h-6 w-6 text-red-400 hover:text-red-500" />
            </DialogClose>
          </DialogContent>
        </Dialog>
        {/* preview  */}
        {/* <Dialog>
          <DialogTrigger className="h-9 w-9 border-2 text-teal-700 hover:bg-teal-600 hover:text-white border-teal-600 rounded-full flex justify-center items-center">
            
            <MdOutlineFindInPage className="text-inherit " />
          </DialogTrigger>
          <DialogContent className="bg-slate-400 w-full relative">
            <ObjPreviewer preview={preview} setPreview={setPreview} />
            <DialogClose className="absolute bottom-4 right-4">
              <AiOutlineCloseCircle className="h-6 w-6 text-red-400 hover:text-red-500" />
            </DialogClose>
          </DialogContent>
        </Dialog> */}
      </div>
    </div>
  );
};

export default Builder;
