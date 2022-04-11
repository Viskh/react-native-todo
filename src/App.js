import React from "react";
import { Provider } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./redux/configureStore";
import Login from "./components/Login";
import Home from "./components/Home";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Login"
            screenOptions={{
              drawerStyle: {
                backgroundColor: "#c6cbef",
                paddingHorizontal: 20,
                paddingVertical: 40,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
              },
            }}
          >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Login" component={Login} />
          </Drawer.Navigator>
        </NavigationContainer>
    </Provider>
  );
}


