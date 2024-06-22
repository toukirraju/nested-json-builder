import { JsonBuilder } from "../lib";
import { useTheme } from "../lib/components/Theme/ThemeContext";
import ColorChangerPrimary from "../lib/components/Theme/components/ColorChangerPrimary";
import ColorChangerSecondary from "../lib/components/Theme/components/ColorChangerSecondary";

function App() {
  const handleJsonChange = (json: any) => {
    console.log(json);
  };
  const { addTheme, themeList, toggleTheme, removeTheme } = useTheme();

  return (
    <div className="bg-primary-light dark:bg-primary-dark h-screen text-secondary-50 ">
      <div className="bg-primary">
        <h1>React App</h1>
      </div>
      <ColorChangerPrimary />
      <ColorChangerSecondary />
      <button
        onClick={() =>
          addTheme({
            name: "theme1",
            colorVars: { primary: "red", secondary: "blue" },
          })
        }
      >
        Add Theme
      </button>
      <div>
        {themeList.map((themeItem, index) => {
          return (
            <button
              key={index}
              className="p-4 relative"
              onClick={() => toggleTheme(themeItem)}
            >
              {themeItem.name}
              <span
                className="absolute cursor-pointer -top-1 text-sm right-0"
                onClick={() => removeTheme(themeItem.name)}
              >
                X
              </span>
            </button>
          );
        })}
      </div>
      {/* <JsonBuilder onChange={handleJsonChange} /> */}
    </div>
  );
}

export default App;
