import React, { useContext, useState } from "react";
import { BuilderContext } from "../context/BuilderProvider";

const ParentName = () => {
  const { dispatch } = useContext(BuilderContext);
  const [parentName, setParentName] = useState("");
  return (
    <div className="min-w-[300px] flex py-3 px-3 items-center shadow-md rounded-lg bg-slate-600 text-white justify-center">
      <div className="flex flex-col items-center   gap-2 font-bold">
        <label htmlFor="parentName">Parent Name</label>
        <input
          className="py-1 px-2 outline-none rounded-md border-4 border-gray-300 bg-transparent"
          id="parentName"
          type="text"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
        />
      </div>
      <button
        disabled={!parentName}
        onClick={() => {
          dispatch({
            type: "ADD_OBJECT",
            payload: parentName,
          });
        }}
        className="py-2 px-4 bg-yellow-600 text-white font-bold hover:bg-yellow-700 rounded-md ml-2"
      >
        ADD
      </button>
    </div>
  );
};

export default ParentName;
