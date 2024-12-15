import React from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import putItem from "@sounds/putitem.mp3";
import { Helmet } from "react-helmet";
import { ScreenWin } from "pages/index";
import "animate.css";
import { NavigationHelper, useMueveleTantitoSensors } from "@utils/index";
import { Container, Tile, useLevelTalavera } from "@LevelTalavera/index";

type LevelTalaveraProps = {
  navigation?: NavigationHelper;
};

export function LevelTalavera({ navigation }: LevelTalaveraProps) {
  const {
    activeId,
    setActiveId,
    setItems,
    swapArrays,
    handleWin,
    win,
    reset,
    removeLevel,
    items,
  } = useLevelTalavera();
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
    let win = false;

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
      "radial-gradient(circle, rgba(250,241,202,1) 0%, rgba(255,247,214,1) 100%)",
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Talavera</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelFood"
            navigation={navigation}
            reset={reset}
          />
        </div>
      )}
      {!win && (
        <div
          className={`flex flex-column justify-center items-center overflow-hidden h-screen bg-[#faf1ca]  ${
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
                <Tile id={activeId} tile={activeId} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      )}
    </>
  );
}
