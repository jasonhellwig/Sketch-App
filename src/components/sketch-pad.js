import React, { Component } from 'react';
import paper, {Path, Tool} from 'paper';

class SketchPad extends Component {
  constructor(props){
    super(props);

    //set up drawing tool
    const tool = new Tool();
    tool.onMouseDown = this.onMouseDown;
    tool.onMouseDrag = this.onMouseDrag;
    tool.onMouseUp = this.onMouseUp;

    this.onDrawingChanged = props.onDrawingChanged;
    this.state = {};
  }

  componentDidMount(){
    // init paperJs
    this.canvas = document.getElementById('sketchArea');
    paper.setup(this.canvas);
  }

  onMouseDown(event) {
    this.path = new Path();
    this.path.strokeColor = 'black';
  }

  onMouseDrag(event) {
    this.path.add(event.point);
  }

  onMouseUp(event) {
    // const circle = new Path.Circle({
    //   center: event.point,
    //   radius: 10
    // });
    // circle.strokeColor = 'black';
    // circle.fillColor = 'blue';
  }

  render() {
    return (
      <div className={"container"}>
        <div className={"row justify-content-center"}>
          <div className={"col-md-10"}>
            <div className="form-group">
              <label htmlFor={"sketchArea"}>Sketch Area</label>
              <canvas id="sketchArea" className={"border border-secondary form-control"}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SketchPad;
