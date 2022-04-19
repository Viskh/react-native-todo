import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  signUpLoading: true,
  signInLoading: true,
  SignUpError: null,
  SignInError: null,
  loadingGetToken: true,
  token: null,
  id: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case "auth/signup/pending":
      return {
        ...state,
        signUpLoading: true,
      };

    case "auth/signup/fulfilled":
      return {
        ...state,
        signUpLoading: false,
        SignUpError: null,
      };

    case "auth/signup/rejected":
      return {
        ...state,
        signUpLoading: false,
        SignUpError: action.payload,
      };

    case "auth/signin/pending":
      return {
        ...state,
        signInLoading: true,
      };

    case "auth/signin/fulfilled":
      return {
        ...state,
        signInLoading: false,
        SignInError: null,
      };

    case "auth/signin/rejected":
      return {
        ...state,
        signInLoading: false,
        SignInError: action.payload,
      };

    case "auth/logOut/fulfilled":
      return {
        ...state,
        loadingGetToken: false,
        token: null,
        id: null,
      };

    case "get/token/pending":
      return {
        ...state,
        loadingGetToken: true,
      };

    case "get/token/fulfilled":
      return {
        ...state,
        loadingGetToken: false,
        token: action.payload.token,
        id: action.payload.id,
      };

    default:
      return state;
  }
};

export const createUser = (email, password, name) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "auth/signup/pending" });
      const responseRegister = await fetch(
        "https://todo-rn-back.herokuapp.com/users/signup",
        {
          method: "POST",
          body: JSON.stringify({ email, password, name }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const jsonRegister = await responseRegister.json();

      dispatch({ type: "auth/signup/fulfilled", payload: jsonRegister });
    } catch (error) {
      dispatch({ type: "auth/signup/rejected", payload: error.message });
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "auth/signin/pending" });
      const response = await fetch(
        "https://todo-rn-back.herokuapp.com/users/signin",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const json = await response.json();

      dispatch({ type: "auth/signin/fulfilled", payload: json });

      await AsyncStorage.setItem("token", json.token);
      await AsyncStorage.setItem("id", json.id);
    } catch (error) {
      dispatch({ type: "auth/signin/rejected", payload: error.message });
    }
  };
};

export const getTokenId = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "get/token/pending" });
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      dispatch({ type: "get/token/fulfilled", payload: { token, id } });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: "auth/logOut/fulfilled" });
    await AsyncStorage.clear();
  };
};
