//update field
export const updateField = ({
  selectedField,
  setSelectedField,
  previousSelectedValue,
  setFormData,
}) => {
  const { key: newName, value, parent: newParent } = selectedField;
  const {
    key: previousKeyName,
    value: previousValue,
    parent: previousParent,
  } = previousSelectedValue;

  setFormData((prev) => {
    // Find index of target child
    const childIndex = prev.findIndex(
      (item) =>
        item.name === previousKeyName && item.parentName === previousParent
    );

    // Make copy and update target child
    const updated = [...prev];

    updated[childIndex] = {
      ...updated[childIndex],
      name: newName,
      value,
      parentName: newParent,
    };

    // If child name changed, update parent's children
    const parentIndex = prev.findIndex((item) => item.name === previousParent);

    if (parentIndex !== -1) {
      updated[parentIndex].children = updated[parentIndex].children.map(
        (name) => (name === previousKeyName ? newName : name)
      );
    }

    return updated;
  });

  setSelectedField(null);
};

// remove field
export const removeField = ({
  selectedField,
  setFormData,
  setSelectedField,
}) => {
  const { key: name, parent } = selectedField;

  setFormData((prev) => {
    // Find index of target child
    const childIndex = prev.findIndex(
      (item) => item.name === name && item.parentName === parent
    );

    // Make copy and remove target child
    const updated = [...prev];
    updated.splice(childIndex, 1);

    // If child name changed, update parent's children
    const parentIndex = prev.findIndex((item) => item.name === parent);

    if (parentIndex !== -1) {
      updated[parentIndex].children = updated[parentIndex].children.filter(
        (childName) => childName !== name
      );
    }

    return updated;
  });

  setSelectedField(null);
};
