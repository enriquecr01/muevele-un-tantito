import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Fruit } from "@LevelFruits/index";

export function EmptySpaceDroppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  const containerStyle = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  };

  return (
    <div className="bg-[#da874c] rounded border-black border-2 min-w-80 min-h-32">
      <div
        className="min-w-80 min-h-32"
        ref={setNodeRef}
        style={containerStyle}
      >
        {props.items.map((item, idx) => (
          <div key={`${item}-${idx}`}>
            <Fruit
              id={item.id}
              image={item.image}
              currentBox={item.currentBox}
              type={item.type}
            >
              {item}
            </Fruit>
          </div>
        ))}
      </div>
    </div>
  );
}
