import React from "react";
import NavigationContainer from "@utils/components/Navigation/NavigationContainer";
import StackNavigation from "@utils/components/Navigation/StackNavigation";
import StackPage from "@utils/components/Navigation/StackPage";
import { LevelBakery } from "@LevelBakery/LevelBakery";
import { LevelClayCraft } from "@LevelClayCraft/LevelClayCraft";
import { LevelMariachiInstruments } from "@LevelMariachiInstruments/LevelMariachiInstruments";
import { LevelCandy } from "@LevelCandy/LevelCandy";
import { LevelAltarDeMuertos } from "@LevelAltarDeMuertos/LevelAltarDeMuertos";
import { LevelDrinks } from "@LevelDrinks/LevelDrinks";
import { LevelTalavera } from "@LevelTalavera/LevelTalavera";
import { LevelFood } from "@LevelFood/LevelFood";
import MainMenu from "./MainMenu";
import { LevelAlebrijes } from "@LevelAlebrijes/LevelAlebrijes";

export default function MainFlow() {
  return (
    <NavigationContainer>
      <StackNavigation initialRouteName="MainMenu">
        <StackPage name="MainMenu" component={MainMenu} />
        <StackPage
          name="LevelMariachiInstruments"
          component={LevelMariachiInstruments}
        />
        <StackPage name="LevelAltarDeMuertos" component={LevelAltarDeMuertos} />
        <StackPage name="LevelDrinks" component={LevelDrinks} />
        <StackPage name="LevelClayCraft" component={LevelClayCraft} />
        <StackPage name="LevelCandy" component={LevelCandy} />
        <StackPage name="LevelTalavera" component={LevelTalavera} />
        <StackPage name="LevelFood" component={LevelFood} />
        <StackPage name="LevelBakery" component={LevelBakery} />
        <StackPage name="LevelAlebrijes" component={LevelAlebrijes} />
      </StackNavigation>
    </NavigationContainer>
  );
}
