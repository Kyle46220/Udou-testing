import React from "react";
import { render } from "react-dom";
import MainView from "./main";
import Viewer from "./viewer";
import Slider from './slider.jsx';


import { createStore } from 'redux';

import { Provider } from 'react-redux';
import SomeContainer from './someContainer';


const initialState = { height: 2, width: 2, depth: 2, colour: "" }

class App extends React.Component {


  reducer(state = initialState, action) {
    let newState = {}

    switch (action.type) {
      case "UPDATE_HEIGHT":
        newState = { ...state, height: action.newHeight };
        break

      case "UPDATE_WIDTH":
        newState = { ...state, width: action.newWidth };
        break

      case "UPDATE_DEPTH":
        newState = { ...state, depth: action.newDepth };
        break


      default: newState = { ...state }
    }
    return newState
  }

  store = createStore(this.reducer);

  render() {

    return (
      <Provider store={this.store}>
        <div>
          <p>This is the main App page</p>
          
          {/* <Viewer /> */}
          {/* <Viewer height={this.store.height} width={this.store.width} depth={this.store.depth} /> */}

          <Slider
            type="range"
            defaultValue={this.store.defaultValue}
            // min={this.props.min}
            min={0.5}
            // max={this.props.max}
            max={3}
            value={this.store.height}
            // step={this.props.step}
            step={0.1}
            onChange={(e) => {
              this.store.dispatch({ type: "UPDATE_HEIGHT", newHeight: e.target.value });
            }}
          />
          <Slider
            type="range"
            defaultValue={this.store.defaultValue}
            // min={this.props.min}
            min={0.5}
            // max={this.props.max}
            max={3}
            value={this.store.depth}
            // step={this.props.step}
            step={0.1}
            onChange={(e) => {
              this.store.dispatch({ type: "UPDATE_DEPTH", newDepth: e.target.value });
            }}
            
          />
          <Slider
            type="range"
            defaultValue={this.store.defaultValue}
            // min={this.props.min}
            min={0.5}
            // max={this.props.max}
            max={3}
            value={this.store.width}
            // step={this.props.step}
            step={0.1}
            onChange={(e) => {
              this.store.dispatch({ type: "UPDATE_WIDTH", newWidth: e.target.value });
            }}/>
            <SomeContainer />
          
        </div>
      </Provider>
    )

  };

}
render(<App />, document.getElementById("root"));