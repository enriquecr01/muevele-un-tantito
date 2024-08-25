import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";
import FruitDraggable from "./FruitDraggable";

interface ICartDroppable {
  items: string[];
  id: string;
}

const CartDroppable: FC<ICartDroppable> = (props) => {
  const { setNodeRef } = useDroppable({
    // id: "cart-droppable",
    id: props.id,
  });

  return (
    <ul
      className="flex p-4 w-full rounded justify-center gap-4 flex-wrap bg-red-500"
      ref={setNodeRef}
    >
      {props.items.map((item, idx) => (
        <div key={`${item}-${idx}`} className="text-2xl rounded-lg">
          <FruitDraggable key={item}>{item}</FruitDraggable>
          {/* {item} */}
        </div>
      ))}
    </ul>
  );
};

export default CartDroppable;
