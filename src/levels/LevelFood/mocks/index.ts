import paleta1 from "@LevelCandy/assets/paleta1.png";
import paleta2 from "@LevelCandy/assets/paleta2.png";
import paleta3 from "@LevelCandy/assets/paleta3.png";
import paleta4 from "@LevelCandy/assets/paleta4.png";
import pipitoria from "@LevelCandy/assets/pipitoria.png";
import obleas from "@LevelCandy/assets/obleas.png";
import mazapan from "@LevelCandy/assets/mazapan.png";
import borrachito from "@LevelCandy/assets/borrachito.png";
import cocada from "@LevelCandy/assets/cocada.png";
import jamoncillo from "@LevelCandy/assets/jamoncillo.png";
import { ICandy } from "levels/LevelCandy/components/Candy";

import elote from "@LevelFood/assets/elote.png";
import quesadilla from "@LevelFood/assets/quesadilla.png";
import taco from "@LevelFood/assets/taco.png";
import tamal from "@LevelFood/assets/tamal.png";

export const lollipopCandies: ICandy[] = [
    { id: 1, image: paleta1, currentBox: "default-box", type: 'lollipop' },
    { id: 2, image: paleta2, currentBox: "default-box", type: 'lollipop' },
    { id: 3, image: paleta3, currentBox: "default-box", type: 'lollipop' },
    { id: 4, image: paleta4, currentBox: "default-box", type: 'lollipop' },
];
export const roundedCandies: ICandy[] = [
    { id: 5, image: pipitoria, currentBox: "default-box", type: 'rounded' },
    { id: 6, image: obleas, currentBox: "default-box", type: 'rounded' },
    { id: 7, image: mazapan, currentBox: "default-box", type: 'rounded' },
];
export const rectangleCandies: ICandy[] = [
    { id: 8, image: borrachito, currentBox: "default-box", type: 'rectangle' },
    { id: 9, image: cocada, currentBox: "default-box", type: 'rectangle' },
    { id: 10, image: jamoncillo, currentBox: "default-box", type: 'rectangle' },
];

export const defaultFood = [
    { id: 1, image: elote, currentBox: "default-box", type: 'elote' },
    { id: 2, image: quesadilla, currentBox: "default-box", type: 'quesadilla' },
    { id: 3, image: quesadilla, currentBox: "default-box", type: 'quesadilla' },
    { id: 4, image: quesadilla, currentBox: "default-box", type: 'quesadilla' },
    { id: 5, image: taco, currentBox: "default-box", type: 'taco' },
    { id: 6, image: taco, currentBox: "default-box", type: 'taco' },
    { id: 7, image: taco, currentBox: "default-box", type: 'taco' },
    { id: 8, image: tamal, currentBox: "default-box", type: 'tamal' },
    { id: 9, image: tamal, currentBox: "default-box", type: 'tamal' },
    { id: 10, image: tamal, currentBox: "default-box", type: 'tamal' },
];