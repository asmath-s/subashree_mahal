/* eslint-disable */
import React from "react";
import AuthContextProvider from "./auth";
import "./App.css";
import Router from "./Router/index";

function App() {
  return (
    <React.Fragment>
      {/* <AuthContextProvider> */}
      <Router />
      {/* </AuthContextProvider> */}
    </React.Fragment>
  );
}

export default App;
