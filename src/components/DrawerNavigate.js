import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch } from 'react-redux';
import {  logOut } from "../redux/features/auth";
import Home from "./Home";

const Drawer = createDrawerNavigator();

const DrawerNavigate = () => {
  const dispatch = useDispatch();

  const handleSubmitExit = () => {
    dispatch(logOut());
  };

  return (
    <Drawer.Navigator drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={handleSubmitExit} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigate;