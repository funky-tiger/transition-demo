import React, { Component } from "react";
import TestChildren from "../component/TestChildren";

class TestChild extends Component {
  getDom = () => {
    return (
      <div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
      </div>
    );
  };
  render() {
    return (
      <div>
        <TestChildren dom={this.getDom()} />
      </div>
    );
  }
}

export default TestChild;
