
import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";

var THREE = require('three');


// class Slider extends React.component {

//   render() {
//     return (
//       ({ value, defaultValue, min, max, step, onChange }) => (
//         <input
//           type="range"
//           defaultValue={defaultValue}
//           min={min}
//           max={max}
//           value={value}
//           step={step}
//           onChange={onChange}
//         />
//       )
//     )
//   }
// }
  const Slider = ({ value, defaultValue, min, max, step, onChange }) => (
    <input
      type="range"
      defaultValue={defaultValue}
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={onChange}
    />
  )


  export default Slider