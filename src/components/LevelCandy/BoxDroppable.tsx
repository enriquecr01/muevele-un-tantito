import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Candy, ICandy } from "./Candy";

function BoxCartDroppable(props) {
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
          <Candy id={item.id} image={item.image} currentBox={item.currentBox}>
            {item}
          </Candy>
          {/* {item} */}
        </div>
      ))}
    </ul>
  );
}

export default BoxCartDroppable;
