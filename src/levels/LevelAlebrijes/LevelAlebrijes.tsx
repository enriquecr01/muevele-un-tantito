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
import { Container, Alebrije, useLevelAlebrijes } from "@LevelAlebrijes/index";

type LevelAlebrijesProps = {
  navigation?: NavigationHelper;
};

export function LevelAlebrijes({ navigation }: LevelAlebrijesProps) {
  const {
    activeId,
    setActiveId,
    handleWin,
    setItems,
    win,
    items,
    reset,
    removeLevel,
  } = useLevelAlebrijes();
  const { sensors } = useMueveleTantitoSensors();

  const putItemSound = new Audio(putItem);

  const style = {
    background:
      "radial-gradient(circle, rgba(236,172,93,1) 0%, rgba(222,153,67,1) 100%)",
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
        <title>¡Muévele Tantito! | Alebrijes</title>
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
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#ecac5d]  ${
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
                <Alebrije id={activeId} alebrije={activeId} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </>
  );
}
