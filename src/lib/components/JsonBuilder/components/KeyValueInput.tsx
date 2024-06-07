import React, { useContext, useState } from "react";
import { BuilderContext } from "../context/BuilderProvider";

const KeyValueInput = () => {
  const { state, dispatch } = useContext(BuilderContext);
  const { selectedParent } = state || {};
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  return (
    <div className="min-w-[320px] flex flex-col gap-3 p-3 items-center shadow-md rounded-bl-lg rounded-br-lg bg-slate-600 text-white justify-between">
      <div className="flex w-full justify-between items-center gap-2 font-bold">
        <label htmlFor="key">Key</label>
        <input
          className="py-1 px-2 outline-none rounded-md border-4 border-gray-300 bg-transparent"
          id="key"
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between items-center gap-2 font-bold">
        <label htmlFor="value">Value</label>
        <input
          className="py-1 px-2 outline-none rounded-md border-4 border-gray-300 bg-transparent"
          id="value"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <button
        disabled={!key || !value}
        onClick={() => {
          dispatch({
            type: "ADD_KEY_VALUE",
            payload: { key, value, parent: selectedParent },
          });
        }}
        className="py-2 px-4 bg-yellow-600 text-white font-bold hover:bg-yellow-700 rounded-md ml-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        ADD
      </button>
    </div>
  );
};

export default KeyValueInput;
