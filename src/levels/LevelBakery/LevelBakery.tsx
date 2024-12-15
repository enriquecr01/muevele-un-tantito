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
import { Container, Concha, useLevelBakery } from "@LevelBakery/index";

type LevelBakeryProps = {
  navigation?: NavigationHelper;
};

export function LevelBakery({ navigation }: LevelBakeryProps) {
  const {
    setActiveColor,
    setActiveId,
    activeId,
    activeColor,
    setItems,
    handleWin,
    win,
    reset,
    removeLevel,
    items,
  } = useLevelBakery();

  const { sensors } = useMueveleTantitoSensors();

  const putItemSound = new Audio(putItem);

  const style = {
    background:
      "radial-gradient(circle, rgba(255,220,69,1) 0%, rgba(252,199,19,1) 100%)",
  };

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    const splitedId = id.split("-");
    const color = splitedId[0];

    setActiveId(id);
    setActiveColor(color);
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
        <title>¡Muévele Tantito! | Panadería</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelAlebrijes"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#ffdc45] ${
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
            <Container id="charola" items={items} />
            <DragOverlay transition={null}>
              {activeId ? (
                <Concha id={activeId} color={activeColor} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </>
  );
}
