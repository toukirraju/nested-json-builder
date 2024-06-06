import React from "react";
import { removeField, updateField } from "../utils/updatePresets";

const UpdatePreset = ({
  newVarient,
  selectedField,
  setSelectedField,
  formData,
  previousSelectedValue,
  setFormData,
}) => {
  return (
    <div>
      <div>
        <div>
          Key:
          <input
            disabled={newVarient}
            value={selectedField.key}
            onChange={(e) =>
              setSelectedField((prev) => ({ ...prev, key: e.target.value }))
            }
          />
        </div>
        <div>
          Value:
          <input
            type="color"
            value={selectedField.value}
            onChange={(e) =>
              setSelectedField((prev) => ({ ...prev, value: e.target.value }))
            }
          />
        </div>
        <div>
          Parent:
          <select
            value={selectedField.parent ? selectedField.parent : "root"}
            onChange={(e) =>
              setSelectedField((prev) => ({
                ...prev,
                parent: e.target.value,
              }))
            }
          >
            {formData
              .filter((field) => field.type !== "string")
              .map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div>
        <button
          onClick={() =>
            updateField({
              selectedField,
              setSelectedField,
              previousSelectedValue,
              setFormData,
            })
          }
        >
          Update
        </button>
        {!newVarient && (
          <button
            disabled={newVarient}
            onClick={() =>
              removeField({ selectedField, setFormData, setSelectedField })
            }
            style={{ backgroundColor: "#e76d6d" }}
          >
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdatePreset;
