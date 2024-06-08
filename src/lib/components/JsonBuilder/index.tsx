import React from "react";
import { BuilderProvider } from "./context/BuilderProvider";
import Builder from "./Builder";

export interface BuilderProps {
  initJson?: object;
  onChange?: (json: any) => void;
}
const JsonBuilder: React.FC<BuilderProps> = ({ initJson, onChange }) => {
  return (
    <BuilderProvider>
      <Builder initJson={initJson} onChange={onChange} />
    </BuilderProvider>
  );
};

export default JsonBuilder;
