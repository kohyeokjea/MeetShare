import React from "react";
import { CirclePicker } from "react-color";

function CircleColorPicker({ color, handleColorChange }) {
  // 색상 배열
  const colors = ["#F5CE4A", "#FFB74D", "#E57373", "#BA68C8", "#64B5F6"];

  return (
    <div>
      <CirclePicker
        color={color}
        onChange={handleColorChange}
        colors={colors}
        circleSize={30}
      />
    </div>
  );
}

export default CircleColorPicker;
