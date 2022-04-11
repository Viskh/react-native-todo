import React from "react";
import {
  TextInput,
  Button,
  View,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/features/todos";

const Form = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleAddTodo = () => {
    if (value) {
      dispatch(addTodo(value));
      setValue("");
    }
    setDisabled(true);
  };

  const handleChange = (e) => {
    setValue(e);
    setDisabled(e && false);
  };

  return (
    <View style={styles.view}>
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={(e) => handleChange(e)}
      />
      <Button disabled={disabled} title="add" onPress={handleAddTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    flex: 0.95,
    fontSize: 28,
  },

  view: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Form;
