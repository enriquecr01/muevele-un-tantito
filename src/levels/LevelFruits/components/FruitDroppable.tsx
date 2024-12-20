import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Fruit, aguacate1, papaya1, pitaya1 } from "@LevelFruits/index";

export function FruitDroppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  const containerStyle = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  };

  const getFruitImage = () => {
    switch (props.id) {
      case "aguacate":
        return aguacate1;
      case "papaya":
        return papaya1;
      case "pitaya":
        return pitaya1;
    }
  };

  return (
    <div
      style={{
        perspective: "2000px",
      }}
    >
      <div className="bg-[#da874c] rounded border-black border-2 m-2">
        <div ref={setNodeRef} style={containerStyle}>
          <Fruit
            id={props.id + 1}
            image={getFruitImage()}
            currentBox={props.id}
            disabled={true}
          />
          {props.fruit && (
            <div key={`${props.fruit.id}-${1}`}>
              <Fruit
                id={props.fruit.id}
                image={props.fruit.image}
                currentBox={props.fruit.currentBox}
                disabled={false}
              >
                {props.fruit}
              </Fruit>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
