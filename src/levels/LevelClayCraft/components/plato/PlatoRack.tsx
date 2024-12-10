import React, { useState } from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import putItem from "@sounds/putitem.mp3";
import "animate.css";
import { Plato, PlatosContainer } from "@LevelClayCraft/index";
import { useMueveleTantitoSensors } from "@utils/index";

type PlatoRackProps = {
  platos: number[];
  setByType(type: string, active: any, over: any): void;
};

export function PlatoRack({ platos, setByType }: PlatoRackProps) {
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

    setByType("platos", active, over);
    setActiveId(null);
    putItemSound.play();
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
