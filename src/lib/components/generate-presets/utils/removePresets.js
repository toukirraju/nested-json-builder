export const resetAllPresets = ({ setFormData }) => {
  setFormData([
    {
      name: "root",
      parentName: null,
      objectName: "",
      children: [],
    },
  ]);
};
