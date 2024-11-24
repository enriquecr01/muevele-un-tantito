import { IFruit } from "@LevelFruits/index";

export function verifyWin(aguacate: IFruit, papaya: IFruit, pitaya: IFruit) {

    if (aguacate && papaya && pitaya) {
        return aguacate.id === 'aguacate' && papaya.id === "papaya" && pitaya.id === "pitaya";
    }

    return false;
}
