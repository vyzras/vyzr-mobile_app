import React from "react";
import { createStackNavigator } from 'react-navigation';
import SignInScreen from '../Screens/SignInScreen';
import SplashScreen from '../Screens/SplashScreen';
import HomeScreen from '../Screens/HomeScreen';
import OverviewScreen from '../Screens/OverviewScreen';
import Registration from '../Screens/Registration';

export const SignedIn = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Registration: {
    screen: Registration,
    navigationOptions: {
      header: null
    }
  },
  OverviewScreen: {
    screen: OverviewScreen,
    navigationOptions: {
      header: null
    }
  },

});

export const SignedOut = createStackNavigator({

  SignInScreen: {
    screen: SignInScreen,
    navigationOptions: {
      header: null
    }
  },
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },



})



export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      headerMode: "none",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut",
      transitionConfig: () => ({
        screenInterpolator: (sceneProps) => {

        },
      })
    }
  );
};