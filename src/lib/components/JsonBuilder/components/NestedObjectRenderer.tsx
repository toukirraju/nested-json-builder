import { useContext, useState } from "react";
import { AiFillCheckCircle, AiFillEdit } from "react-icons/ai";
import { PiTrashSimpleDuotone } from "react-icons/pi";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover/Popover";
import { BuilderContext } from "../context/BuilderProvider";
import isValidColor from "../utils/isValidColor";

type NestedObjectRendererProps = {
  data: any;
  title?: string;
};

function NestedObjectRenderer({ data, title }: NestedObjectRendererProps) {
  const { dispatch } = useContext(BuilderContext);
  const [isParentHovered, setIsParentHovered] = useState(false);
  const [objectName, setObjectName] = useState(title);

  const handleEditObjectName = ({
    title,
    objectName,
  }: {
    title: string;
    objectName: string;
  }) => {
    dispatch({
      type: "EDIT_OBJECT_NAME",
      payload: { updatedName: objectName, previousName: title },
    });
  };

  const childObjs = [] as any;
  const items = [] as any;

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "object") {
      childObjs.push(
        <NestedObjectRenderer data={value} title={key} key={key} />
      );
    } else {
      items.push(
        <Item key={key} title={title} itemKey={key} value={value as string} />
      );
    }
  });

  return (
    <div className="bg-gray-200 pl-2 pb-2 pt-2 ml-2 rounded-tl-md rounded-bl-md border-2 border-b-1 border-r-0 border-gray-300">
      {/* obj title */}
      <h3
        onMouseOver={() => setIsParentHovered(true)}
        onMouseOut={() => setIsParentHovered(false)}
        className="flex items-center gap-2 font-bold bg-gradient-to-r from-indigo-500  text-white px-3 rounded-md "
      >
        {title}
        {isParentHovered && (
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger>
                <AiFillEdit className=" text-yellow-200 hover:text-yellow-300 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="flex items-center gap-2 bg-white border-2 border-gray-400 shadow-md rounded-md px-3 py-2">
                <input
                  className="py-1 px-2 outline-none rounded-md border-4 border-gray-300 bg-transparent"
                  id="parentName"
                  type="text"
                  value={objectName}
                  onChange={(e) => setObjectName(e.target.value)}
                />
                {title && objectName && (
                  <AiFillCheckCircle
                    onClick={() => handleEditObjectName({ title, objectName })}
                    className="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer"
                  />
                )}
              </PopoverContent>
            </Popover>

            {title && (
              <PiTrashSimpleDuotone
                onClick={() => {
                  dispatch({
                    type: "REMOVE_OBJECT",
                    payload: { objectName: title },
                  });
                }}
                className="h-4 w-4 text-red-500 hover:text-red-700 cursor-pointer"
              />
            )}
          </div>
        )}
      </h3>

      <div className="items ">{items}</div>

      <div className="children ">{childObjs}</div>
    </div>
  );
}

export default NestedObjectRenderer;

type ItemProps = {
  title?: string;
  itemKey: string;
  value: string;
};

function Item({ title, itemKey, value }: ItemProps) {
  const { dispatch } = useContext(BuilderContext);
  const [keyValueHovered, setKeyValueHovered] = useState(false);
  const [key, setKey] = useState(itemKey);
  const [val, setVal] = useState(value);

  const handleEdit = ({
    prevKey,
    prvVal,
    prevParent,
  }: {
    prevKey: string;
    prvVal: string;
    prevParent: string;
  }) => {
    const previousValues = { key: prevKey, value: prvVal, parent: prevParent };
    const updatedValues = { key, value: val, parent: prevParent };

    dispatch({
      type: "EDIT_KEY_VALUE",
      payload: { previousValues, updatedValues },
    });
  };

  const bgColor = isValidColor(value) ? value : "transparent";

  return (
    <div
      className="item flex items-center gap-2"
      onMouseOver={() => setKeyValueHovered(true)}
      onMouseOut={() => setKeyValueHovered(false)}
    >
      <div>
        <span>{itemKey}</span> :{" "}
        <span>
          {isValidColor(value) && (
            <span
              className="py-0 rounded-md px-2 mr-1"
              style={{ backgroundColor: bgColor }}
            />
          )}
          {value}
        </span>
      </div>
      {keyValueHovered && (
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger>
              <AiFillEdit className=" text-teal-600 hover:text-teal-700 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="flex gap-1 items-center bg-white  shadow-md rounded-md px-3 py-2">
              <input
                className="py-1 px-2 outline-none rounded-md border-4 border-gray-300 bg-transparent"
                id="key"
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              :
              <input
                className="py-1 px-2 outline-none rounded-md border-4 border-gray-300 bg-transparent"
                id="value"
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
              <AiFillCheckCircle
                onClick={() =>
                  handleEdit({
                    prevKey: itemKey,
                    prvVal: value,
                    prevParent: title ? title : "root",
                  })
                }
                className="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer"
              />
            </PopoverContent>
          </Popover>

          <PiTrashSimpleDuotone
            onClick={() => {
              dispatch({
                type: "REMOVE_KEY_VALUE",
                payload: {
                  key: itemKey,
                  parent: title ? title : "root",
                },
              });
            }}
            className="h-4 w-4 text-red-500 hover:text-red-700 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
