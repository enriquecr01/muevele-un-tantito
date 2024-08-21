/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Params, useNavigation } from './NavigationContainer';

type Page = {
  name: string;
  params?: Params;
};

type StackNavigationProps = {
  children: React.ReactNode;
  initialRouteName?: string;
};

export const StackNavigation = ({
  children,
  initialRouteName,
}: StackNavigationProps) => {
  const { currentRoute, setCurrentRoute } = useNavigation();
  const [stack, setStack] = useState<Page[]>([]);

  useEffect(() => {
    if (initialRouteName) {
      setCurrentRoute(initialRouteName);
      setStack([
        {
          name: initialRouteName,
        },
      ]);
    } else {
      const childrenArray = React.Children.toArray(
        children,
      ) as React.ReactElement<any>[];
      const firstChildName = childrenArray[0]?.props?.name;
      setCurrentRoute(firstChildName);
      setStack([firstChildName]);
    }
  }, [children, initialRouteName, setCurrentRoute]);

  const navigate = (routeName: string, params?: Params) => {
    setCurrentRoute(routeName);
    setStack((prevStack) => [
      ...prevStack,
      {
        name: routeName,
        params,
      },
    ]);
  };

  const goBack = (params?: Params) => {
    if (canGoBack()) {
      const newStack = [...stack];
      newStack.pop();
      setCurrentRoute(newStack[newStack.length - 1].name);
      if (params) {
        newStack[newStack.length - 1].params = params;
      }
      setStack(newStack);
    }
  };

  const canGoBack = () => {
    return stack.length > 1;
  };

  const filteredChildren = React.Children.toArray(children).filter(
    (child) => (child as React.ReactElement<any>).props.name === currentRoute,
  );

  return (
    <div>
      {filteredChildren.map((child) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          navigation: {
            navigate,
            goBack,
            canGoBack,
          },
          params: stack[stack.length - 1]?.params,
        });
      })}
    </div>
  );
};

export default StackNavigation;
