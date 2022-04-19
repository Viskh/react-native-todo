import React, { useEffect } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { View, Button, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
/* import AnimatedLoader from "react-native-animated-loader";
 */ import {
  deleteTodo,
  loadTodos,
  updateTodo,
} from "../../redux/features/todos";
import ContentLoader from "react-native-easy-content-loader";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todosReducer.todos);
  const loading = useSelector((state) => state.todosReducer.loading);
  const error = useSelector((state) => state.todosReducer.error);

  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleUpdateTodo = (id, completed) => {
    dispatch(updateTodo(id, completed));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  if (loading) {
    return <ContentLoader active listSize={todos.length} />;
  }

  if (error) {
    return <View><Text>error</Text></View>
  }

  return (
    <View style={styles.view}>
      {todos.map((item) => {
          return (
            <View style={styles.todo__block} key={item._id}>
              <BouncyCheckbox
                isChecked={item.completed}
                onPress={() => handleUpdateTodo(item._id, item.completed)}
              />
              <Text style={styles.todo__text}>{item.text}</Text>
              <Button
                onPress={() => handleDeleteTodo(item._id)}
                title="x"
                style={styles.todo__btn}
              />
            </View>
          );
        })
        .reverse()}
    </View>
  );
};

const styles = StyleSheet.create({
  todo__text: {
    fontSize: 28,
    color: "black",
    backgroundColor: "gray",
    flex: 0.9,
    borderRadius: 20,
    paddingHorizontal: 10,
  },

  lottie: {
    width: 100,
    height: 100,
  },

  todo__block: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  view: {
    paddingHorizontal: 20,
  },

  todo__btn: {
    color: "gray",
  },
});

export default Todos;
