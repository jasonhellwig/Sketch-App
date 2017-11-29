import React, {Component} from 'react';
import { ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

class ModeDropdown extends Component{
  constructor(props){
    super(props);

    this.toggle = this.toggle.bind(this);

    this.onChangeDrawingMode = props.onChangeDrawingMode;
    this.onChangeRefreshMode = props.onChangeRefreshMode;
    this.onChangePreviewMode = props.onChangePreviewMode;
    this.onChangeCategoryMode = props.onChangeCategoryMode;
    this.onChangeOverlayMode = props.onChangeOverlayMode;

    this.state = {
      drawingButtonText: 'Predict',
      refreshButtonText: 'Enabled',
      previewButtonText: 'Enabled',
      categoryButtonText: 'Auto',
      overlayButtonText: 'Disabled'
    };
  }

  toggle(state) {
    let stateChange = {};
    stateChange[state] = !this.state[state];
    this.setState(stateChange);
  }

  changeDrawingMode(mode){
    this.onChangeDrawingMode({mode});
    this.setState({drawingButtonText: mode});
  }

  changeRefreshMode(mode){
    this.onChangeRefreshMode({mode});
    this.setState({refreshButtonText: mode? 'Enabled' : 'Disabled'});
  }

  changePreviewMode(mode){
    this.onChangePreviewMode({mode});
    this.setState({previewButtonText: mode? 'Enabled' : 'Disabled'});
  }

  changeOverlayMode(mode){
    this.onChangeOverlayMode({mode});
    this.setState({overlayButtonText: mode? 'Enabled' : 'Disabled'});
  }

  changeCategoryMode(mode){
    this.onChangeCategoryMode({mode});
    this.setState({categoryButtonText: mode});
  }

  render(){
    return (
      <ButtonGroup>
        <ButtonDropdown isOpen={this.state.drawingDropdownOpen} toggle={() => this.toggle('drawingDropdownOpen')}>
          <DropdownToggle caret>
            {this.state.drawingButtonText} Mode
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.changeDrawingMode('Trace')}>Trace Mode</DropdownItem>
            <DropdownItem onClick={() => this.changeDrawingMode('Predict')}>Predict Mode</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonDropdown isOpen={this.state.refreshDropdownOpen} toggle={() => this.toggle('refreshDropdownOpen')}>
          <DropdownToggle caret>
            Auto Refresh {this.state.refreshButtonText}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.changeRefreshMode(true)}>Enabled</DropdownItem>
            <DropdownItem onClick={() => this.changeRefreshMode(false)}>Disabled</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        {/*<ButtonDropdown isOpen={this.state.previewDropdownOpen} toggle={() => this.toggle('previewDropdownOpen')}>*/}
          {/*<DropdownToggle caret>*/}
            {/*Preview {this.state.previewButtonText}*/}
          {/*</DropdownToggle>*/}
          {/*<DropdownMenu>*/}
            {/*<DropdownItem onClick={() => this.changePreviewMode(true)}>Enabled</DropdownItem>*/}
            {/*<DropdownItem onClick={() => this.changePreviewMode(false)}>Disabled</DropdownItem>*/}
          {/*</DropdownMenu>*/}
        {/*</ButtonDropdown>*/}
        <ButtonDropdown isOpen={this.state.overlayDropdownOpen} toggle={() => this.toggle('overlayDropdownOpen')}>
          <DropdownToggle caret>
            Overlay {this.state.overlayButtonText}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.changeOverlayMode(true)}>Enabled</DropdownItem>
            <DropdownItem onClick={() => this.changeOverlayMode(false)}>Disabled</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonDropdown isOpen={this.state.categoryDropdownOpen} toggle={() => this.toggle('categoryDropdownOpen')}>
          <DropdownToggle caret>
            Category: {this.state.categoryButtonText}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.changeCategoryMode('Auto')}>Auto</DropdownItem>
            <DropdownItem onClick={() => this.changeCategoryMode('Tiger')}>Tiger</DropdownItem>
            <DropdownItem onClick={() => this.changeCategoryMode('Shark')}>Shark</DropdownItem>
            <DropdownItem onClick={() => this.changeCategoryMode('Elephant')}>Elephant</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>
    );
  }

}


export default ModeDropdown