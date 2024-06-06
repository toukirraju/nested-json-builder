export const addObject = ({ formData, setFormData, setKey, key, parent }) => {
  //if key is already present in type of "object" the form data then return error in console
  //if key is empty then return alert to enter key

  if (!key) {
    alert("Please enter key");
    return;
  }

  const isKeyPresent = formData.find(
    (item) => item.name === key && item.type === "object"
  );
  if (isKeyPresent) {
    console.error("key is already present in type of object");
    return;
  }

  const newFormData = formData.concat({
    name: key,
    parentName: parent,
    type: "object",
    children: [],
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
  setFormData(newData);
  setKey("");
};

export const addString = ({
  formData,
  setFormData,
  setKey,
  key,
  parent,
  value,
  setValue,
}) => {
  //if key and Value is empty then return alert to enter key and value
  if (!key || !value) {
    alert("Please enter key and value");
    return;
  }

  // check if the parent already has the same key in its children
  const parentItem = formData.find((item) => item.name === parent);
  if (parentItem && parentItem.children && parentItem.children.includes(key)) {
    alert("Key already exists in this parent");
    return;
  }

  const newFormData = formData.concat({
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
  setFormData(newData);

  setKey("");
  setValue("");
};
