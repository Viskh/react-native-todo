import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getTokenId } from "../redux/features/auth";

import Login from "./Sign/Login";
import { useDispatch, useSelector } from "react-redux";
import DrawerNavigate from "./DrawerNavigate";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loadingGetToken);

  useEffect(async () => {
    dispatch(getTokenId());
  }, []);

  return (
    <NavigationContainer>
      {!loading && token ? (
        <DrawerNavigate />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawerNavigate"
            component={DrawerNavigate}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
