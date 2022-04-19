import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTokenId, loginUser } from "../../redux/features/auth";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.SignInError);

  useEffect(async () => {
    dispatch(getTokenId());
  }, []);

  const handleSubmit = async () => {
    await dispatch(loginUser(email, password));
    await navigation.navigate("DrawerNavigate");
  };

  return (
    <View style={styles.login__container}>
      <View style={styles.login__content}>
        {error}
        <TextInput
          value={email}
          onChangeText={(e) => setEmail(e)}
          placeholder="login"
          style={styles.login__input}
        />
        <TextInput
          value={password}
          onChangeText={(e) => setPassword(e)}
          placeholder="password"
          style={styles.login__input}
        />
        <View style={styles.btns}>
          <Button title="SignIn" onPress={handleSubmit} />
          <Text>or</Text>
          <Button title="SignUp" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login__container: {
    flex: 1,
    justifyContent: "center",
  },

  btns: {
    flexDirection: "row",
  },

  login__content: {
    alignItems: "center",
    justifyContent: "center",
  },

  login__input: {
    width: 300,
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
