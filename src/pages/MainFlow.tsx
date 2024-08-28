import React from "react";
import NavigationContainer from "@utils/components/Navigation/NavigationContainer";
import StackNavigation from "@utils/components/Navigation/StackNavigation";
import StackPage from "@utils/components/Navigation/StackPage";
import { LevelBakery } from "levels/LevelBakery";
import { LevelClayCraft } from "levels/LevelClayCraft";
import { LevelMariachiInstruments } from "levels/LevelMariachiInstruments";
import MainMenu from "./MainMenu";
import { LevelCandy } from "levels/LevelCandy";

export default function MainFlow() {
  return (
    <NavigationContainer>
      <StackNavigation initialRouteName="MainMenu">
        <StackPage name="MainMenu" component={MainMenu} />
        <StackPage name="LevelBakery" component={LevelBakery} />
        <StackPage name="LevelClayCraft" component={LevelClayCraft} />
        <StackPage
          name="LevelMariachiInstruments"
          component={LevelMariachiInstruments}
        />
        <StackPage name="LevelCandy" component={LevelCandy} />
      </StackNavigation>
    </NavigationContainer>
  );
}
