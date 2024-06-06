import React, { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import UpdatePreset from "./components/UpdatePreset";
import NestedObjectRenderer from "./components/NestedObjectRenderer";
// import { useDispatch } from "react-redux";
// import { generateThemePresets } from "@/redux/themeSlice";
import { ArrayToObject, objectToArrayRecursive } from "./utils/dataConversion";

function GeneratePreset({
  defaultPreset,
  newVarient = false,
  editTheme = false,
  setVisible,
}) {
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState([
    {
      name: "root",
      parentName: null,
      objectName: "",
      children: [],
    },
  ]);
  const [themeName, setThemeName] = useState(
    (!newVarient && defaultPreset?.themeName) || ""
  );
  const [orgainzedObject, setOrgainzedObject] = useState({});
  const [selectedField, setSelectedField] = useState(null);
  const [previousSelectedValue, setPreviousSelectedValue] = useState(null);
  const [selectedObjectName, setSelectedObjectName] = useState(null);

  // set preset on store if defaultPreset is not empty
  const hanldeSavePresets = () => {
    const presets = ArrayToObject(formData);

    const localBaseTheme = localStorage.getItem("base-theme");
    const localVariants = localStorage.getItem("theme-variants");
    const baseTheme = JSON.parse(localBaseTheme);
    const variants = JSON.parse(localVariants) || [];

    if (themeName === "" || Object.keys(presets).length === 0) {
      alert("Please enter theme name and presets");
    } else {
      if (variants.length > 0) {
        //convert object to array base theme
        const baseThemeArray = objectToArrayRecursive(baseTheme.themePresets);
        //check if there is any varient
        // iterate over variants and convert to array
        variants.forEach((item) => {
          // convert object to array
          const variant = objectToArrayRecursive(item.themePresets);

          // get new added objects
          const newAddedArrayOfObjects = formData.slice(
            baseThemeArray.length,
            formData.length
          );

          const copyVariantArray = [...variant];

          //if newAddedArrayOfObjects are set on copyVariantArray where it will set based on its parentName and children if parentName is match any name then
          // it will set children to that parentName

          newAddedArrayOfObjects.forEach((item) => {
            const parentIndex = copyVariantArray.findIndex(
              (child) => child.name === item.parentName
            );
            const parent = copyVariantArray[parentIndex];
            const updatedParent = {
              ...parent,
              children: [...parent.children, item.name],
            };
            copyVariantArray[parentIndex] = updatedParent;
            copyVariantArray.push(item);
          });
          const copyObject = ArrayToObject(copyVariantArray);
          // dispatch to store
          // dispatch(
          //   generateThemePresets({
          //     themeName: item.themeName,
          //     themePresets: copyObject,
          //   })
          // );
        });
        // if (newVarient) {
        const expectedData = {
          themeName: themeName,
          themePresets: presets,
        };
        // dispatch(generateThemePresets(expectedData));
        setVisible(false);
        // }
      } else {
        const expectedData = {
          themeName: themeName,
          themePresets: presets,
        };
        //if there is no varient then update the base theme
        // dispatch(generateThemePresets(expectedData));
        setVisible(false);
      }
    }
  };

  useEffect(() => {
    const organizedData = ArrayToObject(formData);
    setOrgainzedObject(organizedData);
  }, [formData]);

  const handleSelectedField = (field) => {
    setSelectedField(field);
    setPreviousSelectedValue(field);
  };

  // remove object
  const handleRemoveObject = () => {
    // remove based on selectedObjectName
    //alse remove from parent children array

    const updated = formData.filter((item) => item.name !== selectedObjectName);
    const selectedObj = formData.find(
      (item) => item.name === selectedObjectName
    );

    const parentIndex = formData.findIndex(
      (item) => item.name === selectedObj.parentName
    );

    const parent = formData[parentIndex];
    console.log(parent, "parent");
    const updatedParent = {
      ...parent,
      children: parent.children.filter((child) => child !== selectedObjectName),
    };
    updated[parentIndex] = updatedParent;
    setFormData(updated);

    setSelectedObjectName(null);
  };

  useEffect(() => {
    if (defaultPreset) {
      setThemeName(
        (!newVarient && defaultPreset?.themeName) || editTheme
          ? defaultPreset?.themeName
          : ""
      );
      const presets = objectToArrayRecursive(defaultPreset.themePresets);
      setFormData(presets);
    }
  }, [defaultPreset]);

  return (
    <div>
      <h1>Build Your Theme {newVarient ? "Varient" : "Presets"} </h1>

      <div>
        <h2>Theme Name</h2>
        <input
          type="text"
          value={themeName}
          disabled={(!newVarient && defaultPreset?.themeName) || editTheme}
          onChange={(e) => setThemeName(e.target.value)}
        />
      </div>
      {/* ************************************************************Create Presets ****************************************************/}

      {!newVarient && (
        <InputForm
          newVarient={newVarient}
          selectedObjectName={selectedObjectName}
          formData={formData}
          setFormData={setFormData}
          handleRemoveObject={handleRemoveObject}
        />
      )}

      {/* ************************************************************for update ****************************************************/}
      {selectedField && (
        <div style={{ padding: "20px 0px", position: "relative" }}>
          <UpdatePreset
            newVarient={newVarient}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            formData={formData}
            setFormData={setFormData}
            previousSelectedValue={previousSelectedValue}
          />
          <button
            style={{
              position: "absolute",
              top: "0",
              right: "-5px",
              background: "red",
              color: "white",
              cursor: "pointer",
              height: "20px",
              width: "20px",
              borderRadius: "100%",
              border: "1px solid white",
            }}
            onClick={() => setSelectedField(null)}
          >
            X
          </button>
        </div>
      )}

      <button onClick={hanldeSavePresets}>Save Presets</button>

      {/* PreviewContainer  */}
      <div>
        <div>{JSON.stringify(formData, null, 2)}</div>
        {/* render nested object */}
        <NestedObjectRenderer
          data={orgainzedObject}
          key="root"
          handleSelectedField={handleSelectedField}
          setSelectedObjectName={setSelectedObjectName}
        />
      </div>
    </div>
  );
}

export default GeneratePreset;
