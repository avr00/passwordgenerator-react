import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import InputRange from "react-input-range";
import "react-toastify/dist/ReactToastify.css";
import "react-input-range/lib/css/index.css";
import "./PasswordGenerator.scss";
import "./Slider.scss";

class PasswordGenerator extends Component {
  state = {
    length: 1,
    password: "",
    specialChar: false,
    copied: false,
    value: 1
  };

  generatePassword = () => {
    const length = this.state.length;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charSetWithSpecial =
      "!%&'()*+,-.:;<=>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const specialOrNot = this.state.specialChar ? charSetWithSpecial : charset;
    let retVal = "";
    for (var i = 0, n = specialOrNot.length; i < length; ++i) {
      retVal += specialOrNot.charAt(Math.floor(Math.random() * n));
    }

    return this.setState({ password: retVal });
  };

  handleInputChange = () => {
    const specialChar = this.state.specialChar === true ? false : true;
    this.setState({ specialChar }, this.generatePassword);
  };

  checkSafety = () => {
    const length = this.state.length;
    if (length <= 5) {
      return <span style={{ background: "red" }}>Weak Password</span>;
    } else if (length <= 15) {
      return <span style={{ background: "orange" }}>Strong Password</span>;
    } else {
      return (
        <span style={{ background: "#7aff3d" }}>Very Strong Password</span>
      );
    }
  };

  handleRefresh = event => {
    event.preventDefault();
    this.generatePassword();
  };

  notify = () => {
    return toast.success("Copied!");
  };

  render() {
    return (
      <div>
        <form>
          <label>Password Generator Length: {this.state.length}</label> Special
          Characters
          <input
            name="speialChar"
            type="checkbox"
            checked={this.state.specialChar}
            onChange={this.handleInputChange}
          />
          <p>Your new password is: {this.state.password}</p>
          <p>How safe is your password: {this.checkSafety()}</p>
          <button onClick={this.handleRefresh}>Refresh</button>
        </form>

        <CopyToClipboard
          text={this.state.password}
          onCopy={() => this.setState({ copied: true }, this.notify)}
        >
          <button>Copy Password</button>
        </CopyToClipboard>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          closeOnClick
          pauseOnVisibilityChange
        />
        <InputRange
          maxValue={100}
          minValue={1}
          value={this.state.length}
          onChange={length => this.setState({ length }, this.generatePassword)}
          onChangeComplete={() => console.log("Finished")}
        />
      </div>
    );
  }
}

export default PasswordGenerator;
