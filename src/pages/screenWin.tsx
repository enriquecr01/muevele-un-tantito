import React from "react";
import "./../App.css";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";

type ScreenWinProps = {
  nextLevel: string;
  navigation?: NavigationHelper;
};

const ScreenWin = ({ nextLevel, navigation }: ScreenWinProps) => {
  function goNextLevel() {
    navigation.navigate(nextLevel);
  }

  return (
    <>
      <div className="w-full">
        <section className="flex flex-col items-center justify-center gap-12 h-screen">
          <h1 className="text-8xl font-extrabold">¡BIEN HECHO!</h1>
          <div className="flex flex-row flex-no-wrap justify-center">
            <button className="bg-transparent hover:bg-neutral-950/20 text-white py-2 px-4 w-1/2 focus:border-neutral-950/20 hover:ring-orange-600 hover:border-neutral-950/20 active:border-neutral-950/20">
              <span className="drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] text-2xl">
                Repetir
              </span>
            </button>
            <button
              className="bg-transparent hover:bg-neutral-950/20 text-white py-2 px-4 w-1/2 focus:border-neutral-950/20 hover:ring-orange-600 hover:border-neutral-950/20 active:border-neutral-950/20"
              onClick={goNextLevel}
            >
              <span className="drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] text-2xl">
                Siguiente
              </span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ScreenWin;
