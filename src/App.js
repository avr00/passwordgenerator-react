import React, { Component } from "react";
import "./App.scss";
import PasswordGenerator from "./components/PasswordGenerator";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PasswordGenerator />
      </div>
    );
  }
}

export default App;
