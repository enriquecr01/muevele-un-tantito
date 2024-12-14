import React from "react";
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
  Food,
  TacosBox,
  TamalesBox,
  QuesadillasBox,
  EloteBox,
  EmptySpaceDroppable,
  useLevelFood,
} from "@LevelFood/index";

type LevelFoodProps = {
  navigation?: NavigationHelper;
};

export function LevelFood({ navigation }: LevelFoodProps) {
  const {
    setActiveId,
    addToBox,
    win,
    reset,
    removeLevel,
    tacos,
    tamales,
    quesadillas,
    elote,
    foodDefault,
    activeId,
  } = useLevelFood();
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
        e.over?.id !== "tacos" &&
        e.over?.id !== "tamales" &&
        e.over?.id !== "quesadillas" &&
        e.over?.id !== "elote") ||
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
      "radial-gradient(circle, rgba(255,247,209,1) 0%, rgba(255,243,183,1) 100%)",
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Comida</title>
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
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#fff7d1] ${
            removeLevel ? "animate__animated animate__fadeOutDown" : ""
          }`}
          style={style}
        >
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <main className="flex flex-col items-center w-full h-full md:p-4">
              <div className="flex flex-row items-center justify-center w-full lg:w-3/6 h-64 lg:h-80">
                <div className="h-5/6 w-1/3">
                  <div className="flex flex-col h-full">
                    <TacosBox items={tacos} />
                    <TamalesBox items={tamales} />
                  </div>
                </div>

                <QuesadillasBox items={quesadillas} />

                <EloteBox items={elote} />
              </div>

              <div className="flex flex-col items-center">
                <ul className="flex justify-center w-full">
                  <EmptySpaceDroppable id="default-box" items={foodDefault} />
                </ul>
              </div>

              <DragOverlay transition={null}>
                {activeId ? (
                  <Food
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
