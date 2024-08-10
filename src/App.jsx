// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

import { LevelBakery } from "./levels/LevelBakery";
import { LevelClayCraft } from "./levels/levelClayCraft";
import MainMenu from "./pages/mainMenu";
import Example from "./example";
import Wachar from "./components/wachar";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1 className="text-xl font-bold underline bg-amber-100">Hello world!</h1> */}
      {/* <Example></Example> */}
      {/* <MainMenu></MainMenu> */}
      {/* <LevelBakery></LevelBakery> */}
      <LevelClayCraft></LevelClayCraft>
      {/* <Wachar></Wachar> */}

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
