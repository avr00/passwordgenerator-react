import React, { Component } from "react";
import Controls from "./Control";
import Panel from "./Panel";
import newPassword from "../helper";
import "react-input-range/lib/css/index.css";
import "./PasswordGenerator.scss";

class PasswordGenerator extends Component {
  state = {
    length: 16,
    password: "",
    specialChar: false,
    copied: false
  };

  bgStyle = () => {
    const length = this.state.length;
    if (length <= 5) {
      return { background: "#60261f" };
    } else if (length <= 15) {
      return { background: "#4A2600" };
    } else {
      return { background: "rgba(10,33,32,1)" };
    }
  };

  componentDidMount() {
    this.generatePassword();
  }

  generatePassword = () => {
    const newPass = newPassword(this.state.length, this.state.specialChar);
    this.setState({ password: newPass });
  };

  handleInputChange = () => {
    const specialChar = this.state.specialChar === true ? false : true;
    this.setState({ specialChar }, this.generatePassword);
  };

  onChangeLength = value => {
    this.setState({ length: value }, this.generatePassword);
  };

  render() {
    return (
      <div className="bg-color" style={this.bgStyle()}>
        <div className="wrapper" style={this.bgStyle()}>
          <p className="title">Password Generator</p>
          <Panel
            length={this.state.length}
            password={this.state.password}
            generatePassword={this.generatePassword}
          />
          <Controls
            specialChar={this.state.specialChar}
            password={this.state.password}
            length={this.state.length}
            handleInputChange={this.handleInputChange}
            generatePassword={this.generatePassword}
            onChangeLength={this.onChangeLength}
          />
        </div>
      </div>
    );
  }
}

export default PasswordGenerator;
