// Dependencies
import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

// Screens
import LoginScreen from "./Screen/LoginScreen";
import Home from "./Screen/Home";
import Profile from "./Screen/Profile";
import ChangePwd from "./Screen/ChangePwd";

/* START MY SCREENS IMPORT */

import ActorEdit from "./Screen/ActorEdit";
import ActorList from "./Screen/ActorList";
import FilmEdit from "./Screen/FilmEdit";
import FilmList from "./Screen/FilmList";
import FilmMakerEdit from "./Screen/FilmMakerEdit";
import FilmMakerList from "./Screen/FilmMakerList";

/* END MY SCREENS IMPORT */

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const AppNavigator = createStackNavigator(
      {
        Login: { screen: LoginScreen },
        Home: { screen: Home },
        Profile: { screen: Profile },
        ChangePwd: { screen: ChangePwd },

        /* START MY SCREENS */

    ActorEdit: { screen: ActorEdit },
    ActorList: { screen: ActorList },
    FilmEdit: { screen: FilmEdit },
    FilmList: { screen: FilmList },
    FilmMakerEdit: { screen: FilmMakerEdit },
    FilmMakerList: { screen: FilmMakerList },
    
     /* END MY SCREENS */
      },
      {
        initialRouteName: this.props.user ? "Home" : "Login",
        headerMode: "none"
      }
    );

    const AppContainerRouter = createAppContainer(AppNavigator);

    return <AppContainerRouter />;
  }
}

export default AppContainer;
