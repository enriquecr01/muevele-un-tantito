import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ScreenWin } from "pages/index";
import "animate.css";
import {
  NavigationHelper,
  shuffleAndVerifyArraysAreNotSorted,
} from "@utils/index";
import {
  CantaritoRack,
  OllaRack,
  PlatoRack,
  useLevelClayCraft,
} from "@LevelClayCraft/index";

type LevelClayCraftProps = {
  navigation?: NavigationHelper;
};

export function LevelClayCraft({ navigation }: LevelClayCraftProps) {
  const { win, reset, removeLevel, platos, cantaritos, ollas, setByType } =
    useLevelClayCraft();
  const style = {
    background:
      "radial-gradient(circle, rgba(248,197,167,1) 0%, rgba(200,152,123,1) 84%, rgba(153,109,82,1) 100%)",
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
                <CantaritoRack cantaritos={cantaritos} setByType={setByType} />
                <PlatoRack platos={platos} setByType={setByType} />
              </div>
              <div>
                <OllaRack ollas={ollas} setByType={setByType} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
