import { useContext } from "react";
import { BuilderContext } from "../context/BuilderProvider";

const Header = () => {
  const { state, dispatch } = useContext(BuilderContext);

  const { selectedParent, isObject } = state || {};
  return (
    <div className="min-w-[320px] flex justify-between items-center bg-teal-500/10 shadow-md rounded-tl-lg rounded-tr-lg py-2 px-3 gap-4">
      <div className="flex flex-col gap-2 text-sm font-bold text-black   items-center">
        <span className="text-gray-600">Selected Node </span>
        <div className="text-orange-500 relative ">
          <span>{"{ " + selectedParent + " : {} }"}</span>
          {selectedParent && (
            <span
              onClick={() => {
                dispatch({
                  type: "SELECTED_PARENT",
                  payload: "",
                });
                dispatch({
                  type: "IS_OBJECT",
                  payload: false,
                });
              }}
              className="absolute h-4 w-4 rounded-full -top-2 -right-3 text-[10px] font-medium text-white flex justify-center items-center bg-red-400 border-2 border-red-600 cursor-pointer hover:bg-red-600 shadow-md duration-200"
            >
              X
            </span>
          )}
        </div>
      </div>
      <div className=" w-[80px]">
        {selectedParent && (
          <button
            onClick={() => {
              isObject
                ? dispatch({
                    type: "IS_OBJECT",
                    payload: false,
                  })
                : dispatch({
                    type: "IS_OBJECT",
                    payload: true,
                  });
            }}
            className="w-full py-2 bg-green-600 text-white text-[12px] font-medium hover:bg-green-700 rounded-md"
          >
            {isObject ? "Key Value" : "Object"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
