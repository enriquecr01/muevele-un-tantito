import React from "react";
import "./../App.css";
import { Helmet } from "react-helmet";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";

type MainMenuProps = {
  navigation?: NavigationHelper;
};

export const MainMenu = ({ navigation }: MainMenuProps) => {
  const goFirstLevel = () => {
    navigation.navigate("LevelFruits");
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Menu</title>
      </Helmet>
      <div className="animate__animated animate__fadeIn">
        <div className="w-full">
          <section className="flex flex-col items-center justify-center gap-12 h-screen">
            <h1 className="font-comic text-8xl font-extrabold">
              ¡MUÉVELE TANTITO!
            </h1>
            <div className="flex flex-col items-center w-full gap-1.5">
              <button className="bg-transparent m-2" onClick={goFirstLevel}>
                <span className="drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] text-2xl ease-in duration-200 hover:text-4xl">
                  Jugar
                </span>
              </button>
              <button
                className="bg-transparent m-2"
                onClick={() => {
                  window.close();
                }}
              >
                <span className="drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] text-2xl ease-in duration-100 hover:text-4xl">
                  ¿Que es esto?
                </span>
              </button>
              <button
                className="bg-transparent m-2"
                onClick={() => {
                  window.close();
                }}
              >
                <span className="drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] text-2xl ease-in duration-100 hover:text-4xl">
                  Logros
                </span>
              </button>
              <button
                className="bg-transparent m-2"
                onClick={() => {
                  window.close();
                }}
              >
                <span className="drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)] text-2xl ease-in duration-100 hover:text-4xl">
                  Salir
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
