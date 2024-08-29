import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Candy } from "./Candy";

function BoxCartDroppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  const containerStyle = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
  };

  return (
    <div
      className="max-[543px]:w-full max-[1023px]:min-w-60 max-[1023px]:max-w-60"
      style={{ perspective: "2000px" }}
    >
      <div
        className="bg-[#da874c] rounded border-black border-2 m-2"
        style={{ transform: "rotateX(15deg)" }}
      >
        <div
          className="bg-[#bb6d3e] p-2.5 m-2.5 rounded border-black border-2 max-[543px]:min-h-28 max-[543px]:max-h-28 max-[1023px]:min-h-44 max-[1023px]:max-h-44 lg:min-w-72 lg:max-w-72 lg:min-h-40 lg:max-h-40"
          ref={setNodeRef}
          style={containerStyle}
        >
          {props.items.map((item, idx) => (
            <div key={`${item}-${idx}`}>
              <Candy
                id={item.id}
                image={item.image}
                currentBox={item.currentBox}
                type={item.type}
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
