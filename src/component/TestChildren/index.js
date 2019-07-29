import React, { Component } from "react";

class TestChildren extends Component {
  componentDidMount() {
    console.log(this.props.dom.props.children);
  }
  render() {
    return <div>TestChildren</div>;
  }
}

export default TestChildren;
