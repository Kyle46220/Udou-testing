import React from 'react';
import Slider from './slider';

import Viewer from './viewer';



import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    height: state.height,
    width: state.width,
    depth: state.depth
  }
}

class ViewerContainer extends React.Component {
  render() {
    return (
      <div className="viewer-container">
        {/* <div><MainView /></div> */}
        {/* <Slider
          type="range"
          defaultValue={this.props.defaultValue}
          // min={this.props.min}
          min={0.5}
          // max={this.props.max}
          max={3}
          value={this.props.height}
          // step={this.props.step}
          step={0.1}
          onChange={(e) => {
            this.props.dispatch({ type: "UPDATE_HEIGHT", newHeight: e.target.value });
          }}
        /> */}
        {/* <Slider
          type="range"
          defaultValue={this.props.defaultValue}
          // min={this.props.min}
          min={0.5}
          // max={this.props.max}
          max={3}
          value={this.props.height}
          // step={this.props.step}
          step={0.1}
          onChange={(e) => {
            this.props.dispatch({ type: "UPDATE_HEIGHT", newHeight: e.target.value });
          }} 
          /> */}
          <Viewer />


      </div>
    )
  }
}

// export default SomeContainer

export default connect(mapStateToProps)(ViewerContainer);
