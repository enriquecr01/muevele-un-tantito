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
import {
  NavigationHelper,
  useMueveleTantitoSensors,
} from "@utils/index";
import {
  Fruit,
  FruitDroppable,
  EmptySpaceDroppable,
  useLevelFruits,
} from "@LevelFruits/index";

type LevelFruitProps = {
  navigation?: NavigationHelper;
};

export function LevelFruits({ navigation }: LevelFruitProps) {
  const {
    setActiveId,
    addToBox,
    win,
    reset,
    removeLevel,
    aguacate,
    papaya,
    pitaya,
    fruitDefault,
    activeId,
  } = useLevelFruits();
  const { sensors } = useMueveleTantitoSensors();
  const putItemSound = new Audio(putItem);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.data.current.data);
  };

  async function handleDragEnd(e: DragEndEvent) {
    const newItem = { ...e.active.data.current.data };
    const { active, over } = e;
    if (
      (e.over?.id !== "default-box" &&
        e.over?.id !== "aguacate" &&
        e.over?.id !== "papaya" &&
        e.over?.id !== "pitaya") ||
      !newItem
    )
      return;

    const currentBox = active.data.current.data.currentBox;
    const overBox = over.id;

    if (currentBox === overBox) return;

    addToBox(currentBox, overBox, active, newItem);
    putItemSound.play();
  }

  const style = {
    background:
      "radial-gradient(circle, rgba(192,199,140,1) 0%, rgba(149,157,100,1) 100%)",
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Frutas</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelMariachiInstruments"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#c0c78c] ${
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
                <FruitDroppable id="aguacate" fruit={aguacate} />

                <FruitDroppable id="papaya" fruit={papaya} />

                <FruitDroppable id="pitaya" fruit={pitaya} />
              </div>

              <div className="flex flex-col items-center">
                <ul className="flex justify-center w-full">
                  <EmptySpaceDroppable id="default-box" items={fruitDefault} />
                </ul>
              </div>

              <DragOverlay transition={null}>
                {activeId ? (
                  <Fruit id={activeId.id} image={activeId.image} isDragging />
                ) : null}
              </DragOverlay>
            </main>
          </DndContext>
        </div>
      )}
    </>
  );
}
