import React, { Component } from 'react';
import {PaperScope} from 'paper';
import q from 'q';
import request from "request";

class TracePad extends Component {
  constructor(props){
    super(props);

    const {refresh = true, preview = true, category = 'Auto'} = props;

    //set up drawing tool
    const paper = new PaperScope();
    const tool = new paper.Tool();
    tool.onMouseDown = this.onMouseDown.bind(this);
    tool.onMouseDrag = this.onMouseDrag.bind(this);
    tool.onMouseUp = this.onMouseUp.bind(this);
    tool.activate();

    this.clear = this.clear.bind(this);
    this.done = this.done.bind(this);
    this.load = this.load.bind(this);
    this.setBackground = this.setBackground.bind(this);
    this.setRaster = this.setRaster.bind(this);

    this.state = {paths: [], tool, paper, refresh, preview, category};
  }

  componentDidMount(){
    // init paperJs;
    let canvas = document.getElementById('traceArea');
    q.when(canvas)
      .then(() => {
        this.setState({canvas: canvas});
        this.state.paper.setup(canvas);
        this.load()
      });
  }

  componentDidUpdate(){
    //wait for canvas drawing events to render
    if(this.state.waitForLoading){
      window.requestAnimationFrame(() =>{
        this.setState({waitForLoading: false});
        this.done(true)
      })
    }
  }

  onMouseDown(event) {
    this.path = new this.state.paper.Path();
    this.path.strokeColor = '#ffffff';
    this.path.strokeWidth = 5;
    this.state.paths.push(this.path);
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

  setRaster(imageUrl) {
    // set the new background image
    let raster = new this.state.paper.Raster(imageUrl);
    raster.scale(2);
    raster.position = this.state.paper.view.center;
    raster.sendToBack();

    // remove any existing background image
    if (this.state.currentRaster)
      this.state.currentRaster.remove();

    //update the state
    this.setState({currentRaster: raster})
  }

  clear(){
    this.state.paths.forEach(path => path.remove());
    this.setState({paths: []})
  }

  done(reset){
    if(!reset) {
      //set up final image
      this.state.paths.forEach(p => p.strokeColor = 'black');
      this.state.currentRaster.remove();
      this.setBackground();
      this.setState({waitForLoading: true});
      return;
    }
    let dataUrl = this.state.canvas.toDataURL();
    this.setState({result: dataUrl});
    request({method: 'POST', url: 'http://localhost:5000/trace?token=JiNLcxYQ1rD7YQOOy5Yp0', body: dataUrl},
      (error, response, body) => {
        if(error) {
          console.log(error);
          return;
        }
        this.load()
      })
  }

  load(){
    this.state.background && this.state.background.remove();
    this.clear();
      request({method: 'GET', url: 'http://localhost:5000/trace?token=JiNLcxYQ1rD7YQOOy5Yp0'},
        (error, response, body) => {
          if(error) {
            console.log(error);
            return;
          }
          this.setRaster(body)
        })
  }

  setBackground() {
    let rect = new this.state.paper.Path.Rectangle({
      point: [0, 0],
      size: [this.state.paper.view.size.width, this.state.paper.view.size.height],
      strokeColor: 'white'
    });
    rect.sendToBack();
    rect.fillColor = '#ffffff';
    this.setState({background: rect})
  }

  render() {
    return (
      <div>
        <div className={"container"}>
          <div className={"row justify-content-center"}>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label htmlFor={"traceArea"}>Sketch Area</label>
                <canvas id="traceArea" className={"form-control"} style={{padding: 0, height: "512px", width: "512px"}}/>
              </div>
            </div>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label htmlFor={"resultsArea"}>Results Area</label>
                <img id="resultsArea" src={this.state.result} alt={""}/>
              </div>
            </div>
          </div>
        </div>
        <div className={"btn btn-primary float-right"} onClick={this.load}>Next</div>
        <div className={"btn btn-primary float-right"} onClick={this.clear}>Clear</div>
        <div className={"btn btn-primary float-right"} onClick={() => this.done()}>Submit</div>
      </div>
    );
  }
}

export default TracePad;
