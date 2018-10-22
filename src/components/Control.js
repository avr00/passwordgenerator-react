import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import InputRange from "react-input-range";
import "react-toastify/dist/ReactToastify.css";
import "react-input-range/lib/css/index.css";
import "./Slider.scss";
import "./Toastify.scss";

class Controls extends Component {
  notify = () => {
    return toast.success("Copied!");
  };

  render() {
    return (
      <div className="control">
        <button
          className="btn btn-symbol"
          style={
            this.props.specialChar ? { border: "1.5px solid #00a5b1" } : {}
          }
          onClick={this.props.handleInputChange}
        >
          Symbols
        </button>
        <CopyToClipboard
          text={this.props.password}
          onCopy={() => this.setState({ copied: true }, this.notify)}
        >
          <button className="btn btn-copy">Copy password</button>
        </CopyToClipboard>

        <div className="length">
          Length: <span>{this.props.length}</span>
        </div>

        <InputRange
          maxValue={200}
          minValue={1}
          value={this.props.length}
          onChange={this.props.onChangeLength}
          // onChangeComplete={() => console.log("Finished")}
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
    );
  }
}

export default Controls;
