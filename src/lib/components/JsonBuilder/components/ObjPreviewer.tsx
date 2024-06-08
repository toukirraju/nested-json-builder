import React, { useContext, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import ReactJson from "react-json-view";
import { BuilderContext } from "../context/BuilderProvider";
import arrayToObject from "../utils/arrayToObject";

interface ObjPreviewerProps {
  preview: string;
  setPreview: (value: string) => void;
}

const ObjPreviewer: React.FC<ObjPreviewerProps> = ({ preview, setPreview }) => {
  const { state } = useContext(BuilderContext);

  //   const [preview, setPreview] = useState("object");

  const { baseArray } = state || {};

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
  return (
    <>
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
      <div className="h-[calc(100vh-280px)] mt-12 md:mt-0 md:h-screen overflow-auto">
        <ReactJson
          enableClipboard={false}
          displayDataTypes={false}
          src={preview === "array" ? state.baseArray : generatedObject || {}}
        />
      </div>
    </>
  );
};

export default ObjPreviewer;
