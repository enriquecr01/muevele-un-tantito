import React from "react";
import { NavigationHelper, Params } from "./NavigationContainer";

type StackPageProps = {
  name: string;
  component: React.ComponentType<any>;
  navigation?: NavigationHelper;
  params?: Params;
};

const StackPage = ({
  name,
  component: Component,
  navigation,
  params,
}: StackPageProps) => {
  return <Component name={name} navigation={navigation} params={params} />;
};
export default StackPage;
