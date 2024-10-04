import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Food } from "./Food";

function BoxFood(props) {
  const { setNodeRef } = useDroppable({
    id: "elote",
  });

  const containerStyle = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    boxShadow: "1px 1px 10px 4px rgba(10,10,10,1) inset",
  };

  return (
    <div
      className="bg-[#5da9ee] border-black border-2 rounded-xl h-5/6 w-1/3 max-w-32"
      ref={setNodeRef}
      // style={containerStyle}
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