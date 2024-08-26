import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Candy } from "./Candy";

function BoxCartDroppable(props) {
  const { setNodeRef } = useDroppable({
    // id: "cart-droppable",
    id: props.id,
  });

  const containerStyle = {
    padding: 10,
    margin: 10,
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
  };

  return (
    <div style={{ perspective: "2000px" }}>
      <div
        className="bg-[#da874c] rounded border-black border-2 m-2"
        style={{ transform: "rotateX(15deg)" }}
      >
        <div
          className="bg-[#bb6d3e] rounded border-black border-2 min-w-96 max-w-96 min-h-20 max-h-20"
          ref={setNodeRef}
          style={containerStyle}
        >
          {props.items.map((item, idx) => (
            <div key={`${item}-${idx}`} className="text-2xl rounded-lg">
              <Candy
                id={item.id}
                image={item.image}
                currentBox={item.currentBox}
              >
                {item}
              </Candy>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoxCartDroppable;
