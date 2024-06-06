import { Button } from "../lib";
import JsonBuilder from "../lib/components/JsonBuilder";
import GeneratePreset from "../lib/components/generate-presets/GeneratePreset";

function App() {
  return (
    <div className="flex justify-center items-center flex-col">
      <Button label="hellow" />
      <GeneratePreset />

      <JsonBuilder />
    </div>
  );
}

export default App;
