import React, { Component } from 'react';
import {PaperScope} from 'paper';
import q from 'q';
import request from "request";
import _ from 'lodash';

class SketchPad extends Component {
  constructor(props){
    super(props);

    this.props = props;

    //set up drawing tool
    const paper = new PaperScope();
    const tool = new paper.Tool();
    paper.tools.push(tool);
    paper.tool = tool;
    tool.onMouseDown = this.onMouseDown.bind(this);
    tool.onMouseDrag = this.onMouseDrag.bind(this);
    tool.onMouseUp = this.onMouseUp.bind(this);

    this.clear = this.clear.bind(this);
    this.predict = _.throttle(this.predict.bind(this), 1000 * 2); //throttle predictions to at most once every 2 seconds

    this.state = {paths: [], tool, paper};
  }

  componentDidMount(){
    // init paperJs
    let canvas = document.getElementById('sketchArea');
    q.when(canvas)
      .then(() => {
        this.setState({canvas: canvas});
        this.state.paper.setup(canvas);
        this.props.overlay? this.setOverlay() : this.setBackground();
      });
  }

  componentDidUpdate({overlay, category}){
    if(overlay !== this.props.overlay){
      console.log('overlay set');
      if(overlay) {
        this.setOverlay();
      }
      else {
        this.setBackground();
      }
    }
    if(category !== this.props.category){
      console.log('category set');
      this.predict();
    }


    //wait for canvas drawing events to render
    if(this.state.waitForLoading){
      window.requestAnimationFrame(() =>{
        let cb = this.state.loadingCallback;
        this.setState({waitForLoading: false, loadingCallback: null});
        this.createImageUrl(true, cb)
      })
    }
  }

  onMouseDown(event) {
    this.path = new this.state.paper.Path();
    this.path.strokeColor = '#000000';
    this.path.strokeWidth = 5;
    this.state.paths.push(this.path);
  }

  onMouseDrag(event) {
    this.path.add(event.point);
  }

  onMouseUp(event) {
    if(this.props.refresh) {
      this.predict()
    }
  }

  setOverlay() {
    if(!this.state.prediction)
      return this.setBackground();

    let raster = new this.state.paper.Raster(this.state.prediction);
    raster.scale(2);
    raster.position = this.state.paper.view.center;
    raster.sendToBack();

    // remove any existing background image
    if (this.state.currentBackground)
      this.state.currentBackground.remove();

    //update the state
    this.setState({currentBackground: raster})
  }

  setBackground() {
    let rect = new this.state.paper.Path.Rectangle({
      point: [0, 0],
      size: [this.state.paper.view.size.width, this.state.paper.view.size.height],
      strokeColor: 'white'
    });
    rect.sendToBack();
    rect.fillColor = '#ffffff';

    if (this.state.currentBackground)
      this.state.currentBackground.remove();

    this.setState({currentBackground: rect});
  }

  clear(){
    this.state.paths.forEach(path => path.remove());
    this.setState({paths: []})
  }

  predict(){
    this.createImageUrl(false, (imageUrl) => {
      this.requestPrediction(imageUrl)
    });
  }

  requestPrediction(imageUrl, drawingType){
    drawingType = drawingType || this.props.category.toLowerCase();

    //get the image type using the classifier if set to auto
    if(drawingType === 'auto'){
      request({method: 'POST', url: `http://localhost:5000/classify?token=JiNLcxYQ1rD7YQOOy5Yp0`, body: imageUrl},
        (error, response, body) => {
          if(error) {
            console.log(error);
            return;
          }
          console.log(body);
          return this.requestPrediction(imageUrl, body)
        });
      return;
    }

    request({method: 'POST', url: `http://localhost:5000/predict/${drawingType}?token=JiNLcxYQ1rD7YQOOy5Yp0`, body: imageUrl},
      (error, response, body) => {
        if(error) {
          console.log(error);
          return;
        }
        this.setState({prediction: body});
        if(this.props.overlay)
          this.setOverlay();
      })
  }

  createImageUrl(reset, cb){
    if(!reset) {
      this.setBackground();
      this.setState({waitForLoading: true, loadingCallback: cb});
      return;
    }
    let drawingUrl = this.state.canvas.toDataURL();
    this.setState({drawing: drawingUrl});
    if(cb)
      cb(drawingUrl);
  }

  render() {
    return (
      <div>
        <div className={"container"}>
          <div className={"row justify-content-center"}>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label htmlFor={"sketchArea"}>Sketch Area</label>
                <canvas id="sketchArea" className={"form-control"} style={{padding: 0, height: "512px", width: "512px"}}/>
              </div>
            </div>
            <div className={"col-md-6"}>
              <div className="form-group">
                <label htmlFor={"resultsArea"}>Results Area</label>
                <div>
                  <img id="resultsArea" src={this.state.prediction} alt={""} style={{height: "512px", width: '512px'}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"btn btn-primary float-right"} onClick={this.clear}>Clear</div>
        <div className={"btn btn-primary float-right"} onClick={this.predict}>Draw</div>
      </div>
    );
  }
}

export default SketchPad;
