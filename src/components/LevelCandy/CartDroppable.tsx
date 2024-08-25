import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";

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
      className="flex p-4 w-full rounded-lg justify-center gap-4 flex-wrap"
      ref={setNodeRef}
    >
      {props.items.map((item, idx) => (
        <div key={`${item}-${idx}`} className="text-2xl rounded-lg">
          {item}
        </div>
      ))}
    </ul>
  );
};

export default CartDroppable;
