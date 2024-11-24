import { IFood } from "@LevelFood/index";

function verifyEloteAndQuesadillasBox(array: IFood[]) {
    if (array.length === 1) {
        if (array[0].type === "elote") return true;
    }
    if (array.length === 3) {
        if (
            array[0].type === "quesadilla" &&
            array[1].type === "quesadilla" &&
            array[2].type === "quesadilla"
        )
            return true;
    }
    return false;
}

function verifyTamalesBox(array: IFood[]) {
    if (array.length === 3) {
        if (
            array[0].type === "tamal" &&
            array[1].type === "tamal" &&
            array[2].type === "tamal"
        )
            return true;
    }
    return false;
}

function verifyTacosBox(array: IFood[]) {
    if (array.length === 3) {
        if (
            array[0].type === "taco" &&
            array[1].type === "taco" &&
            array[2].type === "taco"
        )
            return true;
    }
    return false;
}

export function verifyWin(
    elote: IFood[],
    quesadillas: IFood[],
    tamales: IFood[],
    tacos: IFood[]
) {

    const veryfiedEloteBox = verifyEloteAndQuesadillasBox(elote);
    const veryfiedQuesadillaBox = verifyEloteAndQuesadillasBox(quesadillas);
    const veryfiedTamalBox = verifyTamalesBox(tamales);
    const veryfiedTacosBox = verifyTacosBox(tacos);

    return veryfiedEloteBox && veryfiedQuesadillaBox && veryfiedTamalBox && veryfiedTacosBox;
}
