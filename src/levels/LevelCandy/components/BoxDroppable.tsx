import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Candy } from "@LevelCandy/index";

export function BoxDroppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  const containerStyle = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    boxShadow: "1px 1px 10px 4px rgba(10,10,10,1) inset",
  };

  return (
    <div
      className="max-[543px]:w-full max-[1023px]:min-w-60 max-[1023px]:max-w-60 xl:min-w-[20%] xl:max-w-[20%]"
      style={{
        perspective: "2000px",
      }}
    >
      <div
        className="bg-[#da874c] rounded border-black border-2 m-2"
        style={{
          transform: "rotateX(30deg)",
          boxShadow:
            "0px 20px 0px 0px rgba(218, 135, 76, 1), 0px 22px 0px 2px black",
        }}
      >
        <div
          className="bg-[#bb6d3e] p-2.5 m-2.5 rounded border-black border-2 max-[543px]:min-h-28 max-[543px]:max-h-28 max-[1023px]:min-h-44 max-[1023px]:max-h-44 lg:min-w-72 lg:max-w-72 lg:min-h-40 lg:max-h-40 xl:min-w-[94%] xl:max-w-[94%]"
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
