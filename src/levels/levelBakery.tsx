import React, { useState } from "react";
import {
  closestCenter,
  closestCorners,
  DndContext,
  DragOverEvent,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  arraySwap,
  SortableContext,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import Container from "@components/levelBakery/Container";
import { Item } from "@components/levelBakery/SortableConcha";
import putItem from "@sounds/putitem.mp3";

// https://stackoverflow.com/questions/76746110/dnd-kit-sortable-animation-is-triggering-twice-on-dragend
// https://codesandbox.io/p/devbox/dnd-kit-twice-animation-qc6h52?file=%2Fsrc%2Fcomponents%2FItemSlot.tsx%3A54%2C18-54%2C28
// https://codesandbox.io/s/eloquent-kirch-t9r13j
// https://codesandbox.io/s/exp-builder-b0ikb?file=/src/apps/app/App.tsx:1270-1278

export function LevelBakery() {
  const initialItems = {
    charola1: [
      "chocolate-1",
      "chocolate-4",
      "chocolate-2",
      "chocolate-5",
      "chocolate-6",
      "chocolate-3",
    ],
    charola2: [
      "vainilla-3",
      "vainilla-5",
      "vainilla-2",
      "vainilla-6",
      "vainilla-1",
      "vainilla-4",
    ],
    charola3: [
      "fresa-5",
      "fresa-4",
      "fresa-1",
      "fresa-3",
      "fresa-2",
      "fresa-6",
    ],
  };

  const [items, setItems] = useState({
    // charola1: [
    //   "chocolate-1",
    //   "vainilla-3",
    //   "fresa-1",
    //   "fresa-5",
    //   "vainilla-5",
    //   "chocolate-4",
    // ],
    // charola2: [
    //   "chocolate-2",
    //   "fresa-3",
    //   "vainilla-2",
    //   "fresa-4",
    //   "vainilla-6",
    //   "chocolate-5",
    // ],
    // charola3: [
    //   "vainilla-1",
    //   "fresa-2",
    //   "chocolate-3",
    //   "fresa-6",
    //   "vainilla-4",
    //   "chocolate-6",
    // ],
    charola1: [
      "chocolate-1",
      "chocolate-4",
      "chocolate-2",
      "chocolate-5",
      "chocolate-6",
      "chocolate-3",
    ],
    charola2: [
      "vainilla-3",
      "vainilla-5",
      "vainilla-2",
      "vainilla-6",
      "vainilla-1",
      "vainilla-4",
    ],
    charola3: [
      "fresa-5",
      "fresa-4",
      "fresa-1",
      "fresa-3",
      "fresa-2",
      "fresa-6",
    ],
  });
  const previousItems = initialItems;
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

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    console.log(items);

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

  function handleDragOverTwo(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    console.log(
      "joto jajaj",
      !activeContainer || !overContainer || activeContainer === overContainer,
      activeContainer,
      overContainer,
      id,
      overId,
      active,
      over
    );

    if (String(id).includes("charola") || String(overId).includes("charola")) {
      return;
    }

    if (!activeContainer || !overContainer || !id || !overId) {
      return;
    }

    setItems(() => {
      const presentationItems = previousItems;
      // console.log("puto", previousItems);

      const activeItem = presentationItems[activeContainer].find(
        (x) => x === active.id
      )!;
      const activeIdx = presentationItems[activeContainer].indexOf(activeItem);

      const overItem = presentationItems[overContainer].find(
        (x) => x === over.id
      )!;
      const overIdx = presentationItems[overContainer].indexOf(overItem);

      presentationItems[activeContainer][activeIdx] = overItem;
      presentationItems[overContainer][overIdx] = activeItem;

      // console.log("puto2", presentationItems);

      // console.log(
      //   prev,
      //   presentationItems,
      //   activeContainer,
      //   overContainer,
      //   activeIdx,
      //   overIdx
      // );

      return presentationItems;
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

  function handleDragEndTwo(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    console.log("joto jajaj", id, overId, active, over);

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (String(id).includes("charola") || String(overId).includes("charola")) {
      return;
    }

    if (!activeContainer || !overContainer || activeId === overId) {
      return;
    }

    const activeItem = items[activeContainer].find((x) => x === active.id)!;
    const activeIdx = items[activeContainer].indexOf(activeItem);

    const overItem = items[overContainer].find((x) => x === over.id)!;
    const overIdx = items[overContainer].indexOf(overItem);

    setItems((items) => {
      const newItems = items;

      newItems[activeContainer][activeIdx] = overItem;
      newItems[overContainer][overIdx] = activeItem;

      // console.log(items, activeContainer, overContainer, activeIdx, overIdx);

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
        onDragOver={handleDragOverTwo}
        // onDragEnd={handleDragEnd}
        onDragEnd={handleDragEndTwo}
      >
        <Container id="charola1" items={items.charola1} />
        <Container id="charola2" items={items.charola2} />
        <Container id="charola3" items={items.charola3} />
        <DragOverlay transition={null}>
          {activeId ? (
            <Item id={activeId} color={activeColor} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
