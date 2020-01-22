import React from "react";
import { render } from "react-dom";
import Viewer from "./viewer";
import Slider from './slider.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ViewerContainer from './someContainer';
import FormContainer from './formContainer';


const initialState = { height: 2, width: 2, depth: 2, colour: "White" }

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
      case "UPDATE_COLOUR":
        newState = { ...state, colour: action.newColour };
        break


      default: newState = { ...state }
    }
    return newState
  }

  store = createStore(this.reducer);

  render() {

    return (
      <Provider store={this.store}>
        <div className='config-container'>




          <ViewerContainer />
          <FormContainer />

        </div>
      </Provider>
    )

  };

}
render(<App />, document.getElementById("root"));