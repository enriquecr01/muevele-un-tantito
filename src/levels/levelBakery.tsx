import React, { useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Container from "@components/levelBakery/Container";
import { Item } from "@components/levelBakery/SortableConcha";
import putItem from "@sounds/putitem.mp3";

export function LevelBakery() {
  const [items, setItems] = useState({
    chocolate: [
      "chocolate-1",
      "vainilla-3",
      "fresa-1",
      "fresa-5",
      "vainilla-5",
      "chocolate-4",
    ],
    vainilla: [
      "chocolate-2",
      "fresa-3",
      "vainilla-2",
      "fresa-4",
      "vainilla-6",
      "chocolate-5",
    ],
    fresa: [
      "vainilla-1",
      "fresa-2",
      "chocolate-3",
      "fresa-6",
      "vainilla-4",
      "chocolate-6",
    ],
  });
  const [activeId, setActiveId] = useState();
  const [activeColor, setActiveColor] = useState();

  const putItemSound = new Audio(putItem);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    const splitedId = id.split("-");
    const color = splitedId[0];

    setActiveId(id);
    setActiveColor(color);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
    putItemSound.play();
  }

  return (
    <div className="flex flex-row">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="chocolate" items={items.chocolate} />
        <Container id="vainilla" items={items.vainilla} />
        <Container id="fresa" items={items.fresa} />
        <DragOverlay>
          {activeId ? (
            <Item id={activeId} color={activeColor} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
