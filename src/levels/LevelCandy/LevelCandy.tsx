import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import putItem from "@sounds/putitem.mp3";
import { Helmet } from "react-helmet";
import { ScreenWin } from "pages/index";
import "animate.css";
import { NavigationHelper, useMueveleTantitoSensors } from "@utils/index";
import {
  Candy,
  BoxDroppable,
  EmptySpaceDroppable,
  useLevelCandy,
} from "@LevelCandy/index";

type LevelCandyProps = {
  navigation?: NavigationHelper;
};

export function LevelCandy({ navigation }: LevelCandyProps) {
  const {
    setActiveId,
    win,
    reset,
    removeLevel,
    candies,
    candies2,
    candies3,
    candiesDefault,
    activeId,
    addToBox,
  } = useLevelCandy();

  const { sensors } = useMueveleTantitoSensors();

  const putItemSound = new Audio(putItem);

  const style = {
    background:
      "radial-gradient(circle, rgba(255,198,198,1) 0%, rgba(227,170,170,1) 100%)",
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.data.current.data);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const newItem = { ...e.active.data.current.data };
    const { active, over } = e;
    if (
      (e.over?.id !== "default-box" &&
        e.over?.id !== "box-1" &&
        e.over?.id !== "box-2" &&
        e.over?.id !== "box-3") ||
      !newItem
    )
      return;

    const currentBox = active.data.current.data.currentBox;
    const overBox = over.id;

    if (currentBox === overBox) return;

    addToBox(currentBox, overBox, active, newItem);
    putItemSound.play();
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Dulces</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelTalavera"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#ffc6c6] ${
            removeLevel ? "animate__animated animate__fadeOutDown" : ""
          }`}
          style={style}
        >
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <main className="flex flex-col items-center md:gap-16 md:p-4 w-full">
              <div className="flex flex-row flex-wrap justify-center md:gap-4 w-full">
                <BoxDroppable id="box-1" items={candies} />

                <BoxDroppable id="box-2" items={candies2} />

                <BoxDroppable id="box-3" items={candies3} />
              </div>

              <div className="flex flex-col items-center">
                <ul className="flex justify-center w-full">
                  <EmptySpaceDroppable
                    id="default-box"
                    items={candiesDefault}
                  />
                </ul>
              </div>

              <DragOverlay transition={null}>
                {activeId ? (
                  <Candy
                    id={activeId.id}
                    image={activeId.image}
                    type={activeId.type}
                    isDragging
                  />
                ) : null}
              </DragOverlay>
            </main>
          </DndContext>
        </div>
      )}
    </>
  );
}
