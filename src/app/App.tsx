import { JsonBuilder } from "../lib";

function App() {
  const handleJsonChange = (json: any) => {
    console.log(json);
  };
  return (
    <div className=" ">
      <JsonBuilder onChange={handleJsonChange} />
    </div>
  );
}

export default App;
