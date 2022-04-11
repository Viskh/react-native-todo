import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Header from "./Header";
import Form from "./Todos/Form";
import Todos from "./Todos/Todos";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Form />
      <ScrollView>
        <Todos />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  text: {
    fontSize: 42,
  },
});

export default Home;
