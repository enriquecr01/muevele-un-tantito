import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Food } from "./Food";

function BoxFood(props) {
  const { setNodeRef } = useDroppable({
    id: "elote",
  });

  return (
    <div
      className="bg-[#5da9ee] border-black border-2 rounded-xl h-5/6 w-1/3 max-w-32"
      ref={setNodeRef}
    >
      {props.items.map((item, idx) => (
        <Food
          key={`${item}-${idx}`}
          id={item.id}
          image={item.image}
          currentBox={item.currentBox}
          type={item.type}
        >
          {item}
        </Food>
      ))}
    </div>
  );
}

export default BoxFood;
