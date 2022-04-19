import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "load/todos/pending":
      return {
        ...state,
        loading: true,
      };

    case "load/todos/fulfilled":
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };

    case "load/todos/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "add/todo/pending":
      return {
        ...state,
        loading: true,
      };

    case "add/todo/fulfilled":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };

    case "add/todo/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "delete/todo/pending":
      return {
        ...state,
        loading: true,
      };

    case "delete/todo/fulfilled":
      return {
        ...state,
        loading: false,
        todos: state.todos.filter((item) => item._id !== action.payload),
      };

    case "delete/todo/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "update/todo/pending":
      return {
        ...state,
        loading: true,
      };

    case "update/todo/fulfilled":
      return {
        ...state,
        loading: false,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload) {
            todo.completed = !todo.completed;
            return todo;
          }
          return todo;
        }),
      };

    case "update/todo/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const loadTodos = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "load/todos/pending" });
      
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("https://todo-rn-back.herokuapp.com/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const todos = await res.json();

      dispatch({ type: "load/todos/fulfilled", payload: todos });
    } catch (error) {
      dispatch({ type: "load/todos/rejected", payload: error });
    }
  };
};

export const addTodo = (text) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "add/todo/pending" });
      
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("https://todo-rn-back.herokuapp.com/todos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });
      const todo = await res.json();
      dispatch({ type: "add/todo/fulfilled", payload: todo });
    } catch (error) {
      dispatch({ type: "add/todo/rejected", payload: error });
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "delete/todo/pending" });

      const token = await AsyncStorage.getItem("token");

      await fetch(`https://todo-rn-back.herokuapp.com/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "delete/todo/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "delete/todo/rejected", payload: error });
    }
  };
};

export const updateTodo = (id, completed) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "update/todo/pending" });
      
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        `https://todo-rn-back.herokuapp.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            completed: !completed,
          }),
        }
      );

      dispatch({ type: "update/todo/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "update/todo/rejected", payload: error });
    }
  };
};
