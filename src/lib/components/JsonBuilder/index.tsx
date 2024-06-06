import React from "react";
import { BuilderProvider } from "./context/BuilderProvider";
import Builder from "./Builder";

const JsonBuilder = () => {
  return (
    <BuilderProvider>
      <Builder />
    </BuilderProvider>
  );
};

export default JsonBuilder;
