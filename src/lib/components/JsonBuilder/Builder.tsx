import React, { useContext } from "react";
import { BuilderContext } from "./context/BuilderProvider";
import KeyValueInput from "./components/KeyValueInput";
import ParentName from "./components/ParentName";
import ParentSelector from "./components/ParentSelector";

const Builder = () => {
  const { state, dispatch } = useContext(BuilderContext);

  const { selectedParent } = state || {};

  console.log(state, "state");
  return (
    <div>
      {/* <KeyValueInput /> */}
      <hr className="my-3" />
      {/* parent name */}
      {state.isObject ? (
        <ParentName />
      ) : selectedParent ? (
        <KeyValueInput />
      ) : (
        <ParentSelector />
      )}
      <hr className="my-3" />
      {/* parent selector */}

      <hr className="my-3" />

      {/* buttons */}
      <div className="min-w-[300px] flex py-3 px-3 items-center shadow-md rounded-lg bg-slate-600 text-white justify-center">
        <button
          onClick={() => {
            dispatch({
              type: "IS_OBJECT",
              payload: true,
            });
          }}
          className="py-2 px-4 bg-green-600 text-white font-bold hover:bg-green-700 rounded-md"
        >
          Add Object
        </button>

        {/* {selectedParent && (
          <button
            onClick={() => {
              dispatch({
                type: "IS_OBJECT",
                payload: false,
              });
            }}
            className="py-2 px-4 bg-teal-500 text-white font-bold hover:bg-teal-700 rounded-md ml-2"
          >
            Add key value
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Builder;
