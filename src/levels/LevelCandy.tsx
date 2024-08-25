import React, { useEffect, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
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
import {
  oneLineColorCondition,
  twoVerticalLinesColorsCondition,
} from "@win-conditions/levelBakery";
import { Helmet } from "react-helmet";
import ScreenWin from "pages/ScreenWin";
import "animate.css";
import { shuffleArray } from "@utils/arrays";
import { initialConchas } from "@mocks/levelBakery";
import { NavigationHelper } from "@utils/components/Navigation/NavigationContainer";
import FruitDraggable from "@components/LevelCandy/FruitDraggable";
import CartDroppable from "@components/LevelCandy/CartDroppable";

type LevelCandyProps = {
  navigation?: NavigationHelper;
};

export function LevelCandy({ navigation }: LevelCandyProps) {
  const [items, setItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState();
  const [activeColor, setActiveColor] = useState();
  const [win, setWin] = useState<boolean>(false);
  const [removeLevel, setRemoveLevel] = useState<boolean>(false);

  const fruits = ["Apple", "Banana", "Lemon", "Pear", "Mango"];
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [cartItems2, setCartItems2] = useState<string[]>([]);
  const [cartItems3, setCartItems3] = useState<string[]>([]);

  const addItemsToCart = (e: DragEndEvent) => {
    const newItem = e.active.data.current?.title;
    const { active, over } = e;
    console.log("over", over);
    if (
      (e.over?.id !== "cart-1" &&
        e.over?.id !== "cart-2" &&
        e.over?.id !== "cart-3") ||
      !newItem
    )
      return;
    let temp = [];

    if (e.over?.id === "cart-1") {
      temp = [...cartItems];
      temp.push(newItem);
      setCartItems(temp);
    }

    if (e.over?.id === "cart-2") {
      temp = [...cartItems2];
      temp.push(newItem);
      setCartItems2(temp);
    }

    if (e.over?.id === "cart-3") {
      temp = [...cartItems3];
      temp.push(newItem);
      setCartItems3(temp);
    }
  };

  const putItemSound = new Audio(putItem);

  useEffect(() => {
    const shuffledConchas = shuffleArray(initialConchas);
    setItems(shuffledConchas);
  }, [setItems]);

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

  async function handleDragEnd(event) {
    const { active, over } = event;
    const { id: overId } = over;
    let win = false;

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

      win = oneLineColorCondition(newItems);
      if (!win) {
        win = twoVerticalLinesColorsCondition(newItems);
      }

      if (win) {
        setTimeout(() => {
          setRemoveLevel(true);
        }, 1000);
        setTimeout(() => {
          setWin(win);
        }, 2000);
      }

      setActiveId(null);
      putItemSound.play();
      return newItems;
    });
  }

  const reset = () => {
    const shuffledConchas = shuffleArray(initialConchas);
    setItems(shuffledConchas);
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
          <DndContext onDragEnd={addItemsToCart}>
            <main className="flex flex-col items-center gap-16 p-4">
              <div className="flex flex-col items-center gap-4">
                <h1>Fruit List</h1>
                <ul className="flex justify-center w-full gap-4">
                  {fruits.map((fruit) => (
                    <FruitDraggable key={fruit}>{fruit}</FruitDraggable>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center gap-4 w-9/12">
                <h1>My Cart</h1>
                <CartDroppable id="cart-1" items={cartItems} />
                <h1>My Cart 2</h1>

                <CartDroppable id="cart-2" items={cartItems2} />
                <h1>My Cart 3</h1>

                <CartDroppable id="cart-3" items={cartItems3} />
              </div>
            </main>
          </DndContext>
        </div>
      )}
    </>
  );
}
