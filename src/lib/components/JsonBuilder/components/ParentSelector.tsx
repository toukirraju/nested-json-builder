import React, { useContext } from "react";
import { BuilderContext } from "../context/BuilderProvider";

const ParentSelector = () => {
  const { state, dispatch } = useContext(BuilderContext);
  const { parentNodes } = state || {};

  const handleChange = (e: any) => {
    dispatch({
      type: "SELECTED_PARENT",
      payload: e.target.value,
    });
  };
  return (
    <div className="min-w-[320px] flex py-3 px-3 items-center shadow-md rounded-bl-lg rounded-br-lg bg-slate-600 text-white justify-center">
      <div className="w-full flex flex-col items-center   gap-2 font-bold">
        <label htmlFor="parentName">Parent Selector</label>
        <select
          onChange={handleChange}
          className="py-1 px-2 outline-none rounded-md border-4 border-gray-300 bg-transparent"
        >
          <option value="">Select Parent Node</option>
          {parentNodes?.map((node, index) => (
            <option key={index} value={node}>
              {node}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ParentSelector;
