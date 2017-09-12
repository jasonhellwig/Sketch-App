import React, { Component } from 'react';
import SketchPad from "./sketch-pad";
import SketchNavbar from "./Navbar";
import ClassificationResult from "./classification-result"

class App extends Component {
  constructor(props){
    super(props);

    this.onTextChanged = this.onTextChanged.bind(this);
    this.state = {text : 'one fish, two fish, red fish, blue fish'}
  }

  onTextChanged({target}){
    this.setState({text: target.value});
  }

  render() {
    return (
      <div>
        <SketchNavbar/>
        <div className="container">
          <SketchPad text={this.state.text} onTextChanged={this.onTextChanged}/>
          <ClassificationResult text={this.state.text}/>
        </div>
      </div>
    );
  }
}

export default App;
