import React, { Component } from 'react';
import SketchPad from "./sketch-pad";
import TracePad from "./trace-pad";
import ModeDropdown from "./app-mode-switcher";

class App extends Component {
  constructor(props){
    super(props);

    this.onChangeDrawingMode = this.onChangeDrawingMode.bind(this);
    this.onChangeRefreshMode = this.onChangeRefreshMode.bind(this);
    this.onChangePreviewMode = this.onChangePreviewMode.bind(this);
    this.onChangeCategoryMode = this.onChangeCategoryMode.bind(this);
    this.onChangeOverlayMode = this.onChangeOverlayMode.bind(this);

    this.state = {
      drawingMode: 'Predict',
      refreshMode: true,
      previewMode: true,
      overlayMode: false,
      categoryMode: 'Auto'
    };
  }

  onChangeDrawingMode({mode}){
    console.log('drawing mode:', mode);
    this.setState({drawingMode: mode});
  }

  onChangeRefreshMode({mode}){
    console.log('refresh mode:', mode);
    this.setState({refreshMode: mode})
  }

  onChangePreviewMode({mode}){
    console.log('preview mode:', mode);
    this.setState({previewMode: mode})
  }

  onChangeCategoryMode({mode}){
    console.log('category mode:', mode);
    this.setState({categoryMode: mode})
  }

  onChangeOverlayMode({mode}){
    console.log('overlay mode:', mode);
    this.setState({overlayMode: mode})
  }

  isDrawingMode(){
    console.log(this.state.drawingMode);
    return this.state.drawingMode === 'Predict'
  }

  isTracingMode(){
    console.log(this.state.drawingMode);
    return this.state.drawingMode === 'Trace'
  }


  render() {
    return (
      <div>
        <ModeDropdown onChangeDrawingMode={this.onChangeDrawingMode}
                      onChangeRefreshMode={this.onChangeRefreshMode}
                      onChangePreviewMode={this.onChangePreviewMode}
                      onChangeCategoryMode={this.onChangeCategoryMode}
                      onChangeOverlayMode={this.onChangeOverlayMode}
        />
        <div className="container">
          { this.isDrawingMode()? <SketchPad refresh={this.state.refreshMode}
                                             preview={this.state.previewMode}
                                             category={this.state.categoryMode}
                                             overlay={this.state.overlayMode}
          /> : null }
          { this.isTracingMode()? <TracePad refresh={this.state.refreshMode}
                                            preview={this.state.previewMode}
                                            category={this.state.categoryMode}
                                            overlay={this.state.overlayMode}
          /> : null }
        </div>
      </div>
    );
  }
}

export default App;
