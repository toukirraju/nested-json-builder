export const objectToArrayRecursive = (obj, parentName = "root", depth = 1) => {
  let initParent;

  if (depth === 1) {
    initParent = {
      name: "root",
      parentName: null,
      objectName: "",
      children: Object.keys(obj),
    };
  }

  const keys = Object.keys(obj);
  const values = Object.values(obj);

  let result = [];
  if (initParent) {
    result = [initParent];
  }

  keys.forEach((key, index) => {
    if (typeof values[index] === "object") {
      result.push({
        name: key,
        parentName: parentName,
        type: "object",
        children: Object.keys(values[index]),
      });
      result.push(...objectToArrayRecursive(values[index], key, depth + 1));
    } else {
      result.push({
        name: key,
        parentName: parentName,
        type: "string",
        value: values[index],
      });
    }
  });

  return result;
};

export const ArrayToObject = (array, parent_id = "root") => {
  const parent = array.find((item) => item.name === parent_id);
  if (!parent) return null;

  const obj = {};

  parent.children.forEach((childName) => {
    const child = array.find(
      (item) => item.name === childName && item.parentName === parent.name
    );
    if (child) {
      if (child.type === "object" || child.type === "array") {
        obj[childName] = ArrayToObject(array, child.name);
      } else {
        obj[childName] = child.value;
      }
    }
  });

  return obj;
};
