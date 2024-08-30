import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Candy } from "./Candy";

function EmptySpaceDroppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  const containerStyle = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
  };

  return (
    <div className="max-[543px]:min-w-[300px] max-[543px]:max-w-[300px] max-[1023px]:min-w-[400px] max-[1023px]:max-w-[400px] xl:min-w-[20%] xl:max-w-[80%]">
      <div className="sm:m-2">
        <div
          className="sm:p-2.5 sm:m-2.5 max-[543px]:min-h-24 max-[543px]:max-h-24 max-[1023px]:min-h-44 max-[1023px]:max-h-44 lg:min-w-[400px] lg:max-w-[400px] lg:min-h-40 lg:max-h-40 xl:min-w-[100%] xl:max-w-[100%]"
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

export default EmptySpaceDroppable;
