import React, { Component } from 'react';

class TextPad extends Component {
  constructor(props){
    super(props);

    this.onTextChanged = props.onTextChanged;
    this.state = {text: props.text};
  }

  render() {
    return (
      <div className={"container"}>
        <div className={"row justify-content-center"}>
          <div className={"col-md-10"}>
            <div className="form-group">
              <label htmlFor={"textArea"}>Example textarea</label>
              <textarea className="form-control" id="textArea" rows="3" defaultValue={this.state.text} onChange={this.onTextChanged}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TextPad;
