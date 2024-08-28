import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Candy } from "./Candy";

function EmptySpaceDroppable(props) {
  const { setNodeRef } = useDroppable({
    // id: "cart-droppable",
    id: props.id,
  });

  const containerStyle = {
    padding: 10,
    margin: 10,
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
  };

  return (
    <div className="max-[543px]:w-full max-[1023px]:min-w-[400px] max-[1023px]:max-w-[400px]">
      <div className="m-2">
        <div
          className=" max-[543px]:min-h-44 max-[543px]:max-h-44 max-[1023px]:min-h-44 max-[1023px]:max-h-44 lg:min-w-[400px] lg:max-w-[400px] lg:min-h-40 lg:max-h-40"
          ref={setNodeRef}
          style={containerStyle}
        >
          {props.items.map((item, idx) => (
            <div key={`${item}-${idx}`}>
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

export default EmptySpaceDroppable;
