import React from "react";
import { Provider} from "react-redux";
import Navigation from "./components/Navigation";
import { store } from "./redux/configureStore";


export default function App() {
  

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
