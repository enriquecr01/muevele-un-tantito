import React, { useEffect, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import OllaContainer from "@components/levelClayCraft/olla/OllaContainer";
import Olla from "@components/levelClayCraft/olla/Olla";
import putItem from "@sounds/putitem.mp3";
import "animate.css";
import { shuffleArray } from "@utils/arrays";
import { initialConchas } from "@mocks/levelBakery";

type OllaRackProps = {
  ollasArray: number[];
  callback: (param: number[]) => void;
};

export default function OllaRack({ ollasArray, callback }: OllaRackProps) {
  const [ollas, setOllas] = useState<number[]>(ollasArray);
  const [activeId, setActiveId] = useState();

  const putItemSound = new Audio(putItem);

  // useEffect(() => {
  //   const shuffledConchas = shuffleArray(initialConchas);
  //   setCantaritos(shuffledConchas);
  // }, [cantaritos]);

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
