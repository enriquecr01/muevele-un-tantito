import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Food } from "./Food";

function BoxFood(props) {
  const { setNodeRef } = useDroppable({
    id: "tacos",
  });

  return (
    <div
      className="bg-[#5da9ee] border-black border-2 rounded-xl h-2/6 w-full"
      ref={setNodeRef}
    >
      {props.items.map((item, idx) => (
        <div key={`${item}-${idx}`}>
          <Food
            id={item.id}
            image={item.image}
            currentBox={item.currentBox}
            type={item.type}
          >
            {item}
          </Food>
        </div>
      ))}
    </div>
  );
}

export default BoxFood;
