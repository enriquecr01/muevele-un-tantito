import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import putItem from "@sounds/putitem.mp3";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/ScreenWin";
import "animate.css";
import { shuffleArray } from "@utils/arrays";
import { initialConchas } from "@mocks/levelBakery";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";
import { Candy, ICandy } from "@components/LevelCandy/Candy";
import BoxCartDroppable from "@components/LevelCandy/BoxDroppable";
import {
  lollipopCandies,
  rectangleCandies,
  roundedCandies,
} from "@mocks/levelCandy";

type LevelCandyProps = {
  navigation?: NavigationHelper;
};

export function LevelCandy({ navigation }: LevelCandyProps) {
  const [activeId, setActiveId] = useState<ICandy>();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const candiesDefaultArrays: ICandy[] = [
    ...lollipopCandies,
    ...roundedCandies,
    ...rectangleCandies,
  ];

  const [candiesDefault, setCandiesDefault] =
    useState<ICandy[]>(candiesDefaultArrays);
  const [candies, setCandies] = useState<ICandy[]>([]);
  const [candies2, setCandies2] = useState<ICandy[]>([]);
  const [candies3, setCandies3] = useState<ICandy[]>([]);

  const putItemSound = new Audio(putItem);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.data.current.data);
  };

  const addToBox = (e: DragEndEvent) => {
    const newItem = { ...e.active.data.current.data };
    const { active, over } = e;
    if (
      (e.over?.id !== "default-box" &&
        e.over?.id !== "box-1" &&
        e.over?.id !== "box-2" &&
        e.over?.id !== "box-3") ||
      !newItem
    )
      return;

    const currentBox = active.data.current.data.currentBox;
    const overBox = over.id;

    if (currentBox === overBox) return;

    let currentArray = [];
    let tempArray = [];

    switch (currentBox) {
      case "default-box":
        currentArray = [...candiesDefault];
        break;
      case "box-1":
        currentArray = [...candies];
        break;
      case "box-2":
        currentArray = [...candies2];
        break;
      case "box-3":
        currentArray = [...candies3];
        break;
    }

    switch (overBox) {
      case "default-box":
        tempArray = [...candiesDefault];
        break;
      case "box-1":
        tempArray = [...candies];
        break;

      case "box-2":
        tempArray = [...candies2];
        break;
      case "box-3":
        tempArray = [...candies3];
        break;
    }

    const index = currentArray.findIndex((candy) => candy.id === active.id);
    newItem.currentBox = overBox;

    currentArray.splice(index, 1);
    tempArray.push(newItem);

    switch (currentBox) {
      case "default-box":
        setCandiesDefault(currentArray);
        break;
      case "box-1":
        setCandies(currentArray);
        break;
      case "box-2":
        setCandies2(currentArray);
        break;
      case "box-3":
        setCandies3(currentArray);
        break;
    }

    switch (overBox) {
      case "default-box":
        setCandiesDefault(tempArray);
        break;
      case "box-1":
        setCandies(tempArray);
        break;
      case "box-2":
        setCandies2(tempArray);
        break;
      case "box-3":
        setCandies3(tempArray);
        break;
    }

    putItemSound.play();
  };

  // useEffect(() => {
  //   const shuffledConchas = shuffleArray(initialConchas);
  //   setItems(shuffledConchas);
  // }, [setItems]);

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

  const reset = () => {
    const shuffledConchas = shuffleArray(initialConchas);
    // setItems(shuffledConchas);
    setRemoveLevel(false);
    setWin(false);
  };

  const style = {
    background:
      "radial-gradient(circle, rgba(255,220,69,1) 0%, rgba(252,199,19,1) 100%)",
  };

  return (
    <>
      <Helmet>
        <title>¡Muévele Tantito! | Dulces</title>
      </Helmet>
      {win && (
        <div
          className={`${win ? "animate__animated animate__jackInTheBox" : ""}`}
        >
          <ScreenWin
            nextLevel="LevelBakery"
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
            onDragStart={handleDragStart}
            onDragEnd={addToBox}
            sensors={sensors}
          >
            <main className="flex flex-col items-center gap-16 p-4">
              <div className="flex flex-col items-center gap-4">
                <h1>Candies</h1>
                <ul className="flex justify-center w-full gap-4">
                  <BoxCartDroppable id="default-box" items={candiesDefault} />
                </ul>
              </div>
              <div className="flex flex-col items-center gap-4 w-9/12">
                <h1>My Cart</h1>
                <BoxCartDroppable id="box-1" items={candies} />
                <h1>My Cart 2</h1>

                <BoxCartDroppable id="box-2" items={candies2} />
                <h1>My Cart 3</h1>

                <BoxCartDroppable id="box-3" items={candies3} />
              </div>
              <DragOverlay transition={null}>
                {activeId ? (
                  <Candy id={activeId.id} image={activeId.image} isDragging />
                ) : null}
              </DragOverlay>
            </main>
          </DndContext>
        </div>
      )}
    </>
  );
}
