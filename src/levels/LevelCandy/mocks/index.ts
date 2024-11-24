import {
    paleta1,
    paleta2,
    paleta3,
    paleta4,
    pipitoria,
    obleas,
    mazapan,
    borrachito,
    cocada,
    jamoncillo,
    ICandy
} from '@LevelCandy/index'


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
