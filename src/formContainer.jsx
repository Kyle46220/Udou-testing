import React from "react";
import { render } from "react-dom";
import Slider from './slider';

import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    height: state.height,
    width: state.width,
    depth: state.depth,
    colour: state.colour
  }
}


class FormContainer extends React.Component {

  handleOptionChange = (e) => {
    this.props.dispatch({ type: "UPDATE_COLOUR", newColour: e.target.value });
  }

  
  render() {
    return (

    <form className="slider-form">
      <label>
      <Slider
        type="range"
        
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
      />Height</label>
      <label>
      <Slider
        type="range"
        
        // min={this.props.min}
        min={0.5}
        // max={this.props.max}
        max={3}
        value={this.props.depth}
        // step={this.props.step}
        step={0.1}
        onChange={(e) => {
          this.props.dispatch({ type: "UPDATE_DEPTH", newDepth: e.target.value });
        }}

      />Depth
      </label>
      <label>
      <Slider
        type="range"
        
        // min={this.props.min}
        min={0.5}
        // max={this.props.max}
        max={3}
        value={this.props.width}
        // step={this.props.step}
        step={0.1}
        onChange={(e) => {
          this.props.dispatch({ type: "UPDATE_WIDTH", newWidth: e.target.value });
        }} />Width</label>

      {/* <input
        type="radio"
        name="colourOption"
        onChange={(e) => {
          this.props.dispatch({ type: "UPDATE_COLOUR", newColour: e.target.value });
        }}
        value={this.props.colour}></input> */}

      
        <div className="radio">
          <label>
            <input type="radio" value="Natural" checked={this.props.colour === "Natural"} onChange={this.handleOptionChange} />
            Natural
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="Black" checked={this.props.colour === "Black"} onChange={this.handleOptionChange} />
            Black
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="White" checked={this.props.colour === "White"} onChange={this.handleOptionChange} />
            White
          </label>
        </div>
      
      <button>Place Order</button>
    </form>
    )
  }
}


export default connect(mapStateToProps)(FormContainer)