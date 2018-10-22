import React, { Component } from "react";
import refreshImg from "../images/refresh-btn.png";
import shield from "../images/shield.png";
import shielderror from "../images/shielderror.png";

class Panel extends Component {

  checkSafety = () => {
    const length = this.props.length;
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

  render() {
    return (
      <div
        className="panel"
        style={
          this.props.length <= 5
            ? { background: "#E6323C" }
            : this.props.length <= 15
              ? { background: "#FF7014" }
              : { background: "#00757e" }
        }
      >
        <div className="password">
          <div className="password-output">
            <span>{this.props.password}</span>
          </div>
          <div className="btn-refresh" onClick={this.props.generatePassword}>
            <img src={refreshImg} alt="refresh-btn" />
          </div>
        </div>
        <div className="security-check">
          <p>{this.checkSafety()}</p>
        </div>
      </div>
    );
  }
}

export default Panel;
