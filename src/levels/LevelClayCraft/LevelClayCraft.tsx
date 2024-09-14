import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/ScreenWin";
import "animate.css";
import {
  initialCantaritos,
  initialOllas,
  initialPlatos,
} from "@LevelClayCraft/mocks";
import CantaritoRack from "@LevelClayCraft/components/cantarito/CantaritoRack";
import OllaRack from "@LevelClayCraft/components/olla/OllaRack";
import PlatoRack from "@LevelClayCraft/components/plato/PlatoRack";
import { verifyWin } from "@LevelClayCraft/win-conditions";
import { shuffleAndVerifyArraysAreNotSorted } from "@utils/arrays";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";

type LevelClayCraftProps = {
  navigation?: NavigationHelper;
};

export function LevelClayCraft({ navigation }: LevelClayCraftProps) {
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);
  let cantaritosArray = shuffleAndVerifyArraysAreNotSorted(initialCantaritos);
  let ollasArray = shuffleAndVerifyArraysAreNotSorted(initialOllas);
  let platosArray = shuffleAndVerifyArraysAreNotSorted(initialPlatos);

  const handleSetCantaritos = (cantaritos) => {
    cantaritosArray = cantaritos;
    handleVerifyWin();
  };

  const handleSetOllas = (ollas) => {
    ollasArray = ollas;
    handleVerifyWin();
  };

  const handleSetPlatos = (platos) => {
    platosArray = platos;
    handleVerifyWin();
  };

  const handleVerifyWin = () => {
    const win = verifyWin(cantaritosArray, ollasArray, platosArray);
    if (win) {
      setTimeout(() => {
        setRemoveLevel(true);
      }, 1000);
      setTimeout(() => {
        setWin(win);
      }, 2000);
    }
  };

  const style = {
    background:
      "radial-gradient(circle, rgba(248,197,167,1) 0%, rgba(200,152,123,1) 84%, rgba(153,109,82,1) 100%)",
  };

  const reset = () => {
    cantaritosArray = shuffleAndVerifyArraysAreNotSorted(initialCantaritos);
    ollasArray = shuffleAndVerifyArraysAreNotSorted(initialOllas);
    platosArray = shuffleAndVerifyArraysAreNotSorted(initialPlatos);
    setRemoveLevel(false);
    setWin(false);
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
          <ScreenWin
            nextLevel="LevelCandy"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <>
          <div
            className={`flex flex-col justify-center items-center overflow-hidden h-screen bg-[#f8c5a7] ${
              removeLevel ? "animate__animated animate__fadeOutDown" : ""
            }`}
            style={style}
          >
            <div className="flex flex-col justify-start border-black border-2 rounded max-w-screen-xl">
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
