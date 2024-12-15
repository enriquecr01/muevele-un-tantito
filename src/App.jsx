// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

import { LevelBakery } from "./levels/LevelBakery/LevelBakery";
import { LevelClayCraft } from "./levels/levelClayCraft/levelClayCraft";
import { LevelMariachiInstruments } from "./levels/LevelMariachiInstruments/LevelMariachiInstruments";
import { LevelCandy } from "./levels/LevelCandy/LevelCandy";
import { LevelAltarDeMuertos } from "./levels/LevelAltarDeMuertos/LevelAltarDeMuertos";
import { LevelDrinks } from "./levels/levelDrinks/LevelDrinks";
import { LevelTalavera } from "./levels/levelTalavera/LevelTalavera";
import { LevelFood } from "./levels/LevelFood/LevelFood";
import { LevelAlebrijes } from "./levels/LevelAlebrijes/LevelAlebrijes";
import { LevelFruits } from "./levels/LevelFruits/LevelFruits";
import { MainMenu } from "./pages/mainMenu";
import { MainFlow } from "./pages/MainFlow";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1 className="text-xl font-bold underline bg-amber-100">Hello world!</h1> */}
      {/* <Example></Example> */}
      {/* <MainMenu></MainMenu> */}
      {/* <LevelBakery></LevelBakery> */}
      {/* <LevelClayCraft></LevelClayCraft> */}
      <LevelMariachiInstruments></LevelMariachiInstruments>
      {/* <LevelCandy></LevelCandy> */}
      {/* <LevelAltarDeMuertos></LevelAltarDeMuertos> */}
      {/* <LevelDrinks></LevelDrinks> */}
      {/* <LevelTalavera></LevelTalavera> */}
      {/* <LevelFood></LevelFood> */}
      {/* <LevelAlebrijes></LevelAlebrijes> */}
      {/* <LevelFruits></LevelFruits> */}
      {/* <MainFlow></MainFlow> */}
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
