import React from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import Container from "@LevelAltarDeMuertos/components/Container";
import putItem from "@sounds/putitem.mp3";
import { Helmet } from "react-helmet";
import { ScreenWin } from "pages/index";
import "animate.css";
import {
  NavigationHelper,
  useMueveleTantitoSensors,
  swapArrays,
} from "@utils/index";
import { Level, useLevelAltarDeMuertos } from "@LevelAltarDeMuertos/index";

type LevelAltarDeMuertosProps = {
  navigation?: NavigationHelper;
};

export function LevelAltarDeMuertos({ navigation }: LevelAltarDeMuertosProps) {
  const {
    activeId,
    setActiveId,
    handleWin,
    setItems,
    win,
    items,
    reset,
    removeLevel,
  } = useLevelAltarDeMuertos();
  const { sensors } = useMueveleTantitoSensors();

  const putItemSound = new Audio(putItem);

  const style = {
    background:
      "radial-gradient(circle, rgba(173,159,240,1) 0%, rgba(201,186,255,1) 100%)",
  };

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  async function handleDragEnd(event) {
    const { active, over } = event;
    const { id: overId } = over;

    if (activeId === overId) {
      return;
    }

    setItems((items) => {
      const newItems = swapArrays(items, active, over);
      handleWin(newItems);

      setActiveId(null);
      putItemSound.play();
      return newItems;
    });
  }

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Altar de Muertos</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelDrinks"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-stretch overflow-hidden h-screen bg-[#ad9ff0] ${
            removeLevel ? "animate__animated animate__fadeOutDown" : ""
          }`}
          style={style}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <Container id="levels" items={items} />
            <DragOverlay transition={null}>
              {activeId ? <Level id={activeId} isDragging /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </>
  );
}
