import React, { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Container from "@components/levelBakery/Container";
import Concha from "@components/levelBakery/Concha";
import putItem from "@sounds/putitem.mp3";

export function LevelBakery() {
  const initialItems = [
    "chocolate-1",
    "chocolate-4",
    "chocolate-2",
    "chocolate-5",
    "chocolate-6",
    "chocolate-3",
    "vainilla-3",
    "vainilla-5",
    "vainilla-2",
    "vainilla-6",
    "vainilla-1",
    "vainilla-4",
    "fresa-5",
    "fresa-4",
    "fresa-1",
    "fresa-3",
    "fresa-2",
    "fresa-6",
  ];

  const [items, setItems] = useState([
    "chocolate-4",
    "vainilla-4",
    "vainilla-3",
    "chocolate-2",
    "fresa-2",
    "chocolate-3",
    "chocolate-6",
    "vainilla-5",
    "fresa-1",
    "vainilla-6",
    "vainilla-1",
    "fresa-5",
    "fresa-4",
    "chocolate-5",
    "fresa-3",
    "chocolate-1",
    "vainilla-2",
    "fresa-6",
  ]);
  const [activeId, setActiveId] = useState();
  const [activeColor, setActiveColor] = useState();

  const putItemSound = new Audio(putItem);

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

    const splitedId = id.split("-");
    const color = splitedId[0];

    setActiveId(id);
    setActiveColor(color);
  }

  function handleDragEndTwo(event) {
    const { active, over } = event;
    const { id: overId } = over;

    if (activeId === overId) {
      return;
    }

    setItems((items) => {
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

      return newItems;
    });

    setActiveId(null);
    putItemSound.play();
  }

  return (
    <div className="flex flex-row">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEndTwo}
      >
        <Container id="charola" items={items} />
        <DragOverlay transition={null}>
          {activeId ? (
            <Concha id={activeId} color={activeColor} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
