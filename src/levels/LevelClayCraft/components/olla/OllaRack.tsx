import React, { useState } from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import putItem from "@sounds/putitem.mp3";
import "animate.css";
import { OllaContainer, Olla } from "@LevelClayCraft/index";
import { useMueveleTantitoSensors } from "@utils/index";

type OllaRackProps = {
  ollasArray: number[];
  callback: (param: number[]) => void;
};

export function OllaRack({ ollasArray, callback }: OllaRackProps) {
  const [ollas, setOllas] = useState<number[]>(ollasArray);
  const [activeId, setActiveId] = useState();

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

    if (activeId === overId || overId === "ollas") {
      return;
    }

    setOllas((items) => {
      const newItems = [...items];

      const activeItem = items.find((x) => x === active.id)!;
      const activeIdx = items.indexOf(activeItem);

      const overItem = items.find((x) => x === over.id)!;
      const overIdx = items.indexOf(overItem);
      //Yes, I know I could have used findIndex
      [newItems[activeIdx], newItems[overIdx]] = [
        newItems[overIdx],
        newItems[activeIdx],
      ];

      callback(newItems);

      setActiveId(null);
      putItemSound.play();
      return newItems;
    });
  }

  return (
    <>
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <OllaContainer id="ollas" items={ollas} />
          <DragOverlay transition={null}>
            {activeId ? (
              <Olla id={activeId} size={activeId} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
