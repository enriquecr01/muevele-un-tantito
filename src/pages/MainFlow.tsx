import React from "react";
import NavigationContainer from "@utils/components/Navigation/NavigationContainer";
import StackNavigation from "@utils/components/Navigation/StackNavigation";
import StackPage from "@utils/components/Navigation/StackPage";
import { LevelBakery } from "@LevelBakery/LevelBakery";
import { LevelClayCraft } from "@LevelClayCraft/LevelClayCraft";
import { LevelMariachiInstruments } from "@LevelMariachiInstruments/LevelMariachiInstruments";
import { LevelCandy } from "@LevelCandy/LevelCandy";
import { LevelAltarDeMuertos } from "@LevelAltarDeMuertos/LevelAltarDeMuertos";
import MainMenu from "./MainMenu";

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
        <StackPage name="LevelClayCraft" component={LevelClayCraft} />
        <StackPage name="LevelCandy" component={LevelCandy} />
        <StackPage name="LevelBakery" component={LevelBakery} />
      </StackNavigation>
    </NavigationContainer>
  );
}
