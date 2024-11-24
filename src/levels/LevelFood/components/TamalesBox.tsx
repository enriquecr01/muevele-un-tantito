import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Food } from "@LevelFood/index";

export function TamalesBox(props) {
  const { setNodeRef } = useDroppable({
    id: "tamales",
  });

  return (
    <div
      className="bg-[#5da9ee] border-black border-2 rounded-xl h-4/6 w-full"
      ref={setNodeRef}
    >
      <div className="h-full flex items-center flex-row">
        {props.items.map((item, idx) => (
          <div key={`${item}-${idx}`}>
            <Food
              key={`${item}-${idx}`}
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
    </div>
  );
}
