import paleta1 from "@images/candies/paleta1.png";
import paleta2 from "@images/candies/paleta2.png";
import paleta3 from "@images/candies/paleta3.png";
import paleta4 from "@images/candies/paleta4.png";
import pipitoria from "@images/candies/pipitoria.png";
import obleas from "@images/candies/obleas.png";
import mazapan from "@images/candies/mazapan.png";
import borrachito from "@images/candies/borrachito.png";
import cocada from "@images/candies/cocada.png";
import jamoncillo from "@images/candies/jamoncillo.png";
import { ICandy } from "levels/LevelCandy/components/Candy";

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
