import React from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import putItem from "@sounds/putitem.mp3";
import { Helmet } from "react-helmet";
import { ScreenWin } from "pages/index";
import "animate.css";
import {
  NavigationHelper,
  useMueveleTantitoSensors,
  swapArrays,
} from "@utils/index";
import { Container, Instrument } from "@LevelMariachiInstruments/index";
import { useLevelMariachiInstruments } from "./useLevelMariachiInstruments";

type LevelMariachiInstrumentsProps = {
  navigation?: NavigationHelper;
};

export function LevelMariachiInstruments({
  navigation,
}: LevelMariachiInstrumentsProps) {
  const {
    activeId,
    setActiveId,
    setItems,
    handleWin,
    win,
    reset,
    removeLevel,
    items,
  } = useLevelMariachiInstruments();
  const { sensors } = useMueveleTantitoSensors();
  const putItemSound = new Audio(putItem);

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

  const style = {
    background:
      "radial-gradient(circle, rgba(0,165,255,1) 0%, rgba(0,141,255,1) 89%, rgba(0,104,255,1) 100%)",
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Instrumentos</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelAltarDeMuertos"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#00a5ff]  ${
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
            <Container id="container" items={items} />
            <DragOverlay transition={null}>
              {activeId ? (
                <Instrument id={activeId} instrument={activeId} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </>
  );
}
