import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Food } from "./Food";

function TacosBox(props) {
  const { setNodeRef } = useDroppable({
    id: "tacos",
  });

  const containerStyle = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  };

  return (
    <div
      className="bg-[#5da9ee] border-black border-2 rounded-xl h-2/6 w-full"
      ref={setNodeRef}
    >
      <div className="h-5/6" style={containerStyle}>
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

export default TacosBox;
