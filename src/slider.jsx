
import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";

const THREE = require('three');



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