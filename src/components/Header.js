import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Список дел</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: 100,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 52,
    color: "#fff",
  },
});

export default Header;
