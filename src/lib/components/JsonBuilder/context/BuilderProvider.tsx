import React, { createContext, useReducer, ReactNode } from "react";
import objectToArray from "../utils/objectToArray";

// Define TreeNode type
export interface TreeNode {
  name: string;
  parentName: string | null;
  objectName?: string;
  type?: string | null;
  value?: string; // Add value property
  children?: TreeNode[]; // Change children type to TreeNode[] | string[]
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
    }
  | {
      type: "EDIT_KEY_VALUE";
      payload: {
        previousValues: {
          key: string;
          value: string;
          parent: string;
        };
        updatedValues: {
          key: string;
          value: string;
          parent: string;
        };
      };
    }
  | {
      type: "REMOVE_KEY_VALUE";
      payload: {
        key: string;
        parent: string;
      };
    }
  | {
      type: "REMOVE_OBJECT";
      payload: {
        objectName: string;
      };
    }
  | {
      type: "EDIT_OBJECT_NAME";
      payload: {
        previousName: string;
        updatedName: string;
      };
    }
  | {
      type: "IMPORT_JSON";
      payload: object;
    };

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "IMPORT_JSON":
      const data = action.payload;
      const baseArray = objectToArray(data);
      // Get parent nodes from baseArray parentName and remove duplicates
      const parentNodes: any = Array.from(
        new Set(baseArray.map((item: any) => item.parentName))
      ).filter((node) => node !== null);

      return {
        ...state,
        baseArray,
        parentNodes,
      };

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

      const newBaseArray = state.baseArray.concat({
        name: objectName,
        parentName: state.selectedParent,
        type: "object",
        children: [],
      });

      const newData = newBaseArray.map((item) => {
        if (item.name === state.selectedParent) {
          return {
            ...item,
            // @ts-ignore
            children: [...item.children, objectName],
          };
        }
        return item;
      });

      return {
        ...state,
        baseArray: newData as TreeNode[], // Cast newData to TreeNode[]
        parentNodes: state.parentNodes.concat(objectName),
        selectedParent: "",
        isObject: false,
      };
    }

    case "ADD_KEY_VALUE": {
      const { key, value, parent } = action.payload;

      if (!key || !value) {
        alert("Please enter key and value");
        return state;
      }

      const parentItem: any = state.baseArray.find(
        (item) => item.name === parent
      );
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
            children: [...(item.children as any), key],
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

    case "EDIT_KEY_VALUE": {
      const { previousValues, updatedValues } = action.payload;

      const { key: newName, value, parent: newParent } = updatedValues;
      const {
        key: previousKeyName,
        value: previousValue,
        parent: previousParent,
      } = previousValues;

      // Find index of target child
      const childIndex = state.baseArray.findIndex(
        (item) =>
          item.name === previousKeyName && item.parentName === previousParent
      );

      // Make copy and update target child
      const updatedBaseArray: any = [...state.baseArray];

      updatedBaseArray[childIndex] = {
        ...updatedBaseArray[childIndex],
        name: newName,
        value,
        parentName: previousParent,
      };

      // If child name changed, update parent's children
      const parentIndex = state.baseArray.findIndex(
        (item) => item.name === previousParent
      );

      if (parentIndex !== -1) {
        updatedBaseArray[parentIndex].children = updatedBaseArray[
          parentIndex
        ].children.map((name: string) =>
          name === previousKeyName ? newName : name
        );
      }

      return {
        ...state,
        baseArray: updatedBaseArray,
      };
    }
    case "REMOVE_KEY_VALUE": {
      const { key, parent } = action.payload;
      const parentIndex = state.baseArray.findIndex(
        (item) => item.name === parent
      );
      const childIndex = state.baseArray.findIndex(
        (item) => item.name === key && item.parentName === parent
      );
      const updatedBaseArray: any = [...state.baseArray];
      updatedBaseArray.splice(childIndex, 1);
      updatedBaseArray[parentIndex].children = updatedBaseArray[
        parentIndex
      ].children.filter((name: string) => name !== key);
      return {
        ...state,
        baseArray: updatedBaseArray,
      };
    }
    case "REMOVE_OBJECT": {
      const { objectName } = action.payload;

      const parentIndex = state.baseArray.findIndex(
        (item) => item.name === objectName
      );

      const parent: any = state.baseArray[parentIndex];

      if (parent.children.length) {
        alert("Please remove all children first");
        return state;
      }

      const updatedBaseArray: any = [...state.baseArray];
      updatedBaseArray.splice(parentIndex, 1);

      const parentParentIndex = state.baseArray.findIndex(
        (item) => item.name === parent.parentName
      );

      const parentParent: any = state.baseArray[parentParentIndex];

      const updatedParent = {
        ...parentParent,
        children: parentParent.children.filter(
          (child: string) => child !== objectName
        ),
      };

      updatedBaseArray[parentParentIndex] = updatedParent;

      //also update parentNodes
      const parentNodes = state.parentNodes.filter(
        (node) => node !== objectName
      );

      return {
        ...state,
        parentNodes,
        baseArray: updatedBaseArray,
      };
    }
    case "EDIT_OBJECT_NAME": {
      const { previousName, updatedName } = action.payload;

      // previousName is equal to name then it will need to update the name and all of its children parentName will be updated
      const updatedBaseArray: any = [...state.baseArray];

      const parentIndex = updatedBaseArray.findIndex(
        (item: any) => item.name === previousName
      );

      const parent = updatedBaseArray[parentIndex];

      const children = parent.children;

      // update parent name
      updatedBaseArray[parentIndex] = {
        ...parent,
        name: updatedName,
      };

      // update children parentName
      children.forEach((child: string) => {
        const childIndex = updatedBaseArray.findIndex(
          (item: any) => item.name === child && item.parentName === previousName
        );

        updatedBaseArray[childIndex] = {
          ...updatedBaseArray[childIndex],
          parentName: updatedName,
        };
      });

      // update parent children
      const parentParentIndex = updatedBaseArray.findIndex(
        (item: any) => item.name === parent.parentName
      );

      const parentParent = updatedBaseArray[parentParentIndex];

      const updatedParent = {
        ...parentParent,
        children: parentParent.children.map((child: string) =>
          child === previousName ? updatedName : child
        ),
      };

      updatedBaseArray[parentParentIndex] = updatedParent;

      // also update parentNodes
      const parentNodes = state.parentNodes.map((node) =>
        node === previousName ? updatedName : node
      );

      return {
        ...state,
        parentNodes,
        baseArray: updatedBaseArray,
      };
    }
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
