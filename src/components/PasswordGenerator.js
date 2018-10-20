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
import "./Toastify.scss";

class PasswordGenerator extends Component {
  state = {
    length: 16,
    password: "",
    specialChar: false,
    copied: false,
    value: 1
  };

  bgStyle = () => {
    const length = this.state.length;
    const bg =
      length <= 5
        ? { background: "#60261f" }
        : length <= 15
          ? { background: "#4A2600" }
          : { background: "rgba(10,33,32,1)" };
    console.log("hi");
    return bg;
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
        <span style={{ background: "#E6323C" }}>
          <img src={shielderror} alt="refresh-btn" /> Weak password
        </span>
      );
    } else if (length <= 15) {
      return (
        <span style={{ background: "#FF7014" }}>
          <img src={shield} alt="refresh-btn" /> Safe password
        </span>
      );
    } else {
      return (
        <span style={{ background: "#00757e" }}>
          <img src={shield} alt="refresh-btn" /> Strong Password
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
      <div className="bg-color" style={this.bgStyle()}>
        <div className="wrapper" style={this.bgStyle()}>
          <div
            className="panel"
            style={
              this.state.length <= 5
                ? { background: "#E6323C" }
                : this.state.length <= 15
                  ? { background: "#FF7014" }
                  : { background: "#00757e" }
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
                this.state.specialChar ? { border: "1.5px solid #00a5b1" } : {}
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
              maxValue={200}
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
              pauseOnHover
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordGenerator;
