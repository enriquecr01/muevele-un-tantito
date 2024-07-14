import React from "react";
import "./../App.css";

const MainMenu = () => {
  return (
    <>
      <div className="w-full">
        <section className="flex flex-col items-center justify-center gap-12 h-screen">
          <h1 className="font-avocado text-6xl font-extrabold">
            ¡MUÉVELE UN TANTITO!
          </h1>
          <h1 className="font-comic text-6xl font-extrabold">
            ¡MUÉVELE UN TANTITO!
          </h1>
          <h1 className="font-laff text-6xl font-extrabold">
            ¡MUÉVELE UN TANTITO!
          </h1>

          <button className="bg-transparent hover:bg-neutral-950/20 text-white py-2 px-4 w-1/2 focus:border-neutral-950/20 hover:ring-orange-600 hover:border-neutral-950/20 active:border-neutral-950/20">
            <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] text-2xl">
              Button
            </span>
          </button>
        </section>
      </div>
    </>
  );
};

export default MainMenu;
