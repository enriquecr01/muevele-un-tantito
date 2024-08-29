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
import CantaritoContainer from "levels/LevelClayCraft/components/cantarito/CantaritoContainer";
import Cantarito from "levels/LevelClayCraft/components/cantarito/Cantarito";
import putItem from "@sounds/putitem.mp3";
import "animate.css";
import { shuffleArray } from "@utils/arrays";
import { initialConchas } from "levels/LevelBakery/components/mocks/levelBakery";

type CantaritoRackProps = {
  cantaritosArray: number[];
  callback: (param: number[]) => void;
};

export default function CantaritoRack({
  cantaritosArray,
  callback,
}: CantaritoRackProps) {
  const [cantaritos, setCantaritos] = useState<number[]>(cantaritosArray);
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

    if (activeId === overId || overId === "cantaritos") {
      return;
    }

    setCantaritos((items) => {
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
          <CantaritoContainer id="cantaritos" items={cantaritos} />
          <DragOverlay transition={null}>
            {activeId ? (
              <Cantarito id={activeId} size={activeId} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
