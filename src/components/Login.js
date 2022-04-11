import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const Login = () => {
  return (
    <View style={styles.login__container}>
      <View style={styles.login__content}>
        <TextInput placeholder="login" style={styles.login__input} />
        <TextInput placeholder="password" style={styles.login__input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login__container: { 
    flex: 1,
    justifyContent: 'center'
  },

  login__content: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  login__input: {
    fontSize: 25,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    marginVertical: 20,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    
  },
});

export default Login;
