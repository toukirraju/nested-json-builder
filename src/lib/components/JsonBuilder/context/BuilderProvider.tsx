import React, { createContext, useReducer, ReactNode } from "react";

// Define TreeNode type
interface TreeNode {
  name: string;
  parentName: string | null;
  objectName: string;
  children: TreeNode[];
}

// Define State type
interface State {
  baseArray: TreeNode[];
  parentNodes: string[];
  isObject: boolean;
  selectedParent: string;
}

// Initial State
const initialState: State = {
  baseArray: [
    {
      name: "root",
      parentName: null,
      objectName: "",
      children: [],
    },
  ],
  parentNodes: ["root"],
  isObject: false,
  selectedParent: "",
};

// Define Action type
type Action =
  | {
      type: "ADD_OBJECT";
      payload: TreeNode;
    }
  | {
      type: "IS_OBJECT";
      payload: boolean;
    }
  | {
      type: "SELECTED_PARENT";
      payload: string;
    }
  | {
      type: "ADD_OBJECT";
      payload: string;
    }
  | {
      type: "ADD_KEY_VALUE";
      payload: { key: string; value: string; parent: string };
    };

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_OBJECT": {
      const objectName = action.payload;

      if (!objectName) {
        alert("Please enter object name");
        return state;
      }

      const isKeyPresent = state.baseArray.find(
        (item) => item.name === objectName && item.type === "object"
      );
      if (isKeyPresent) {
        alert("Name is already present in type of object");
        return state;
      }

      // const newFormData = formData.concat({
      //   name: key,
      //   parentName: parent,
      //   type: "object",
      //   children: [],
      // });
      // const newData = newFormData.map((item) => {
      //   if (item.name === parent) {
      //     return {
      //       ...item,
      //       children: [...item.children, key],
      //     };
      //   }
      //   return item;
      // });

      const newBaseArray = state.baseArray.concat({
        name: objectName,
        parentName: null,
        type: "object",
        children: [],
      });

      // const newData=newBaseArray.map((item) => {
      //   if (item.name === state.selectedParent) {
      //     return {
      //       ...item,
      //       children: [...item.children, objectName],
      //     };
      //   }
      //   return item;

      // });

      return {
        ...state,
        baseArray: newBaseArray,
        parentNodes: state.parentNodes.concat(objectName),
        selectedParent: "",
        isObject: false,
      };
    }

    case "ADD_KEY_VALUE": {
      const { key, value, parent } = action.payload;

      //if key and Value is empty then return alert to enter key and value
      if (!key || !value) {
        alert("Please enter key and value");
        return state;
      }

      // check if the parent already has the same key in its children
      const parentItem = state.baseArray.find((item) => item.name === parent);
      if (
        parentItem &&
        parentItem.children &&
        parentItem.children.includes(key)
      ) {
        alert("Key already exists in this parent");
        return state;
      }

      const newFormData = state.baseArray.concat({
        name: key,
        parentName: parent,
        type: "string",
        value: value,
      });

      const newData = newFormData.map((item) => {
        if (item.name === parent) {
          return {
            ...item,
            children: [...item.children, key],
          };
        }
        return item;
      });

      return {
        ...state,
        baseArray: newData,
        selectedParent: "",
      };
    }

    case "IS_OBJECT":
      return {
        ...state,
        isObject: action.payload,
      };

    case "SELECTED_PARENT":
      return {
        ...state,
        selectedParent: action.payload,
      };
    default:
      return state;
  }
};

// Define ContextProps type
interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Create Context
export const BuilderContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

// Context Provider component
interface BuilderProviderProps {
  children: ReactNode;
}

export const BuilderProvider: React.FC<BuilderProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BuilderContext.Provider>
  );
};
