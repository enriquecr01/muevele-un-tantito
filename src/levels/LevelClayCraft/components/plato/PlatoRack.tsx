import React, { useState } from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import putItem from "@sounds/putitem.mp3";
import "animate.css";
import { Plato, PlatosContainer } from "@LevelClayCraft/index";
import { useMueveleTantitoSensors } from "@utils/index";

type PlatoRackProps = {
  platosArray: number[];
  callback: (param: number[]) => void;
};

export function PlatoRack({ platosArray, callback }: PlatoRackProps) {
  const [platos, setPlatos] = useState<number[]>(platosArray);
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

    if (activeId === overId || overId === "platos") {
      return;
    }

    setPlatos((items) => {
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
          <PlatosContainer id="platos" items={platos} />
          <DragOverlay transition={null}>
            {activeId ? (
              <Plato id={activeId} size={activeId} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
