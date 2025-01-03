/// <reference types="vite-plugin-svgr/client" /> // Required to use the ReactComponent import syntax
import React from "react";
import "./../App.css";
import { Helmet } from "react-helmet";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";
import Star from "@images/star.svg?react"; // ?react is required to use the ReactComponent import syntax
// https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent

type AchievementsProps = {
  navigation?: NavigationHelper;
};

export const Achievements = ({ navigation }: AchievementsProps) => {
  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Logros</title>
      </Helmet>
      <div className="animate__animated animate__fadeIn">
        <div className="w-full">
          <section className="flex flex-col items-center justify-center gap-12 h-screen">
            <h1 className="font-comic text-8xl font-extrabold">
              ¡MUÉVELE TANTITO!
            </h1>
            <div className="flex flex-col items-center w-full gap-1.5">
              <div className="inline-grid grid-cols-3 gap-4">
                <div>
                  <div className="bg-gray-500 p-4 rounded-lg hover:drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)]">
                    <h2 className="font-bold text-2xl">Frutas</h2>
                    <p>Soluciones encontradas: 1/3</p>
                    {/* <p>1/3</p> */}
                    <div className="w-full flex flex-row justify-center">
                      {/* <img src={Star} alt="star" width={80} color="red" /> */}
                      <Star width={30} height={30} fill="#eab308" />
                      <Star width={30} height={30} fill="#eab308" />
                      <Star width={30} height={30} fill="#eab308" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-500 p-4 rounded-lg hover:drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)]">
                    <h2 className="font-bold text-2xl">Altar de muertos</h2>
                    <p>Soluciones encontradas: 3/3</p>
                    {/* <p>1/3</p> */}
                    <div className="w-full flex flex-row justify-center">
                      {/* <img src={Star} alt="star" width={80} color="red" /> */}
                      <Star width={30} height={30} fill="#eab308" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
