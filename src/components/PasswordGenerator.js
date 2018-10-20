import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import InputRange from "react-input-range";
import "react-toastify/dist/ReactToastify.css";
import "react-input-range/lib/css/index.css";
import "./PasswordGenerator.scss";
import "./Slider.scss";
import refreshImg from "./images/refresh-btn.png";
import shield from "./images/shield.png";
import shielderror from "./images/shielderror.png";

class PasswordGenerator extends Component {
  state = {
    length: 16,
    password: "",
    specialChar: false,
    copied: false,
    value: 1
  };

  componentDidMount() {
    this.generatePassword();
  }

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
      return (
        <span style={{ background: "red" }}>
          <img src={shielderror} alt="refresh-btn" /> Weak Password
        </span>
      );
    } else if (length <= 15) {
      return (
        <span style={{ background: "orange" }}>
          <img src={shield} alt="refresh-btn" /> Strong Password
        </span>
      );
    } else {
      return (
        <span style={{ background: "#7aff3d" }}>
          <img src={shield} alt="refresh-btn" /> Very Strong Password
        </span>
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
      <div className="wrapper">
        <div
          className="panel"
          style={
            this.state.length <= 5
              ? { background: "red" }
              : this.state.length <= 15
                ? { background: "orange" }
                : { background: "#7aff3d" }
          }
        >
          <div className="password">
            <div className="password-output">
              <span>{this.state.password}</span>
            </div>
            <div className="btn-refresh" onClick={this.handleRefresh}>
              <img src={refreshImg} alt="refresh-btn" />
            </div>
          </div>
          <div className="security-check">
            <p>{this.checkSafety()}</p>
          </div>
        </div>
        <div className="control">
          <button
            className="btn btn-symbol"
            style={
              this.state.specialChar ? { border: "1px solid #2dbf90" } : {}
            }
            onClick={this.handleInputChange}
          >
            Symbols
          </button>
          <CopyToClipboard
            text={this.state.password}
            onCopy={() => this.setState({ copied: true }, this.notify)}
          >
            <button className="btn btn-copy">Copy password</button>
          </CopyToClipboard>
          <div className="length">
            Length: <span>{this.state.length}</span>
          </div>
          <InputRange
            maxValue={100}
            minValue={1}
            value={this.state.length}
            onChange={length =>
              this.setState({ length }, this.generatePassword)
            }
            onChangeComplete={() => console.log("Finished")}
          />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            closeOnClick
            pauseOnVisibilityChange
          />
        </div>
      </div>
    );
  }
}

export default PasswordGenerator;
