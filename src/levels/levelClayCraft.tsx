import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/screenWin";
import "animate.css";
import {
  initialCantaritos,
  initialOllas,
  initialPlatos,
} from "@mocks/levelClayCraft";
import CantaritoRack from "@components/levelClayCraft/cantarito/CantaritoRack";
import OllaRack from "@components/levelClayCraft/olla/OllaRack";
import PlatoRack from "@components/levelClayCraft/plato/PlatoRack";

export function LevelClayCraft() {
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const handleSetCantaritos = (cantaritos) => {
    console.log(cantaritos);
  };

  const handleSetOllas = (ollas) => {
    console.log(ollas);
  };

  const handleSetPlatos = (platos) => {
    console.log(platos);
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Estantería</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin />
        </div>
      )}
      {!win && (
        <>
          <div
            className={`flex flex-column justify-center items-center overflow-hidden h-screen  ${
              removeLevel ? "animate__animated animate__fadeOutDown" : ""
            }`}
          >
            <div className="flex flex-col justify-start border-black border-2 rounded">
              <div className="flex flex-row">
                <CantaritoRack
                  callback={handleSetCantaritos}
                  cantaritosArray={initialCantaritos}
                />
                <PlatoRack
                  callback={handleSetPlatos}
                  platosArray={initialPlatos}
                />
              </div>
              <div>
                <OllaRack callback={handleSetOllas} ollasArray={initialOllas} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
