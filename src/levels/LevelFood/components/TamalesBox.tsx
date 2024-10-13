import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Food } from "./Food";

function TamalesBox(props) {
  const { setNodeRef } = useDroppable({
    id: "tamales",
  });

  const containerStyle = {
    flex: 1,
    display: "flex",
    gridTemplateColumns: "repeat(3, 1fr)",
  };

  return (
    <div
      className="bg-[#5da9ee] border-black border-2 rounded-xl h-4/6 w-full"
      ref={setNodeRef}
    >
      <div className="h-full" style={containerStyle}>
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
    </div>
  );
}

export default TamalesBox;
