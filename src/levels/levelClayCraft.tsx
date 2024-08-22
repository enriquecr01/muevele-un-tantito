import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/ScreenWin";
import "animate.css";
import {
  initialCantaritos,
  initialOllas,
  initialPlatos,
} from "@mocks/levelClayCraft";
import CantaritoRack from "@components/levelClayCraft/cantarito/CantaritoRack";
import OllaRack from "@components/levelClayCraft/olla/OllaRack";
import PlatoRack from "@components/levelClayCraft/plato/PlatoRack";
import { verifyWin } from "@utils/win-conditions/levelClayCraft";
import talaveraPattern from "@images/talavera-pattern.jpg";
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

  const talavera = {
    backgroundColor: "#422006",
    backgroundImage: `url(${talaveraPattern})`,
    perspective: "1000px",
    backgroundSize: "170px",
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
            nextLevel="LevelBakery"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <>
          <div
            className={`flex flex-col justify-center items-center overflow-hidden h-screen bg-yellow-950 ${
              removeLevel ? "animate__animated animate__fadeOutDown" : ""
            }`}
          >
            <div className="flex flex-grow"></div>
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
            <div className="flex flex-grow w-full" style={talavera}></div>
          </div>
        </>
      )}
    </>
  );
}
