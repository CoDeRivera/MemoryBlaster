import React from "react";
import ReactModal from "react-modal";

export default function ButtonGrid(props) {
  let test = true;

  return (
    <div>
      <div
        className={"button " + props.greenButton.color}
        style={{ borderTopLeftRadius: "250px" }}
        onClick={() => props.handleClick(props.greenButton.color)}
      />
      <div
        className={"button " + props.redButton.color}
        style={{ borderTopRightRadius: "250px" }}
        onClick={() => props.handleClick(props.redButton.color)}
      />

      <div className="center">
        <h2>Memory Blaster</h2>
        <button
          className="startButton"
          onClick={() => console.log("This will start the game")}
        >
          Start
        </button>
      </div>

      <div
        className={"button " + props.yellowButton.color}
        style={{ borderBottomLeftRadius: "250px" }}
        onClick={() => props.handleClick(props.yellowButton.color)}
      />

      <div
        className={"button " + props.blueButton.color}
        style={{ borderBottomRightRadius: "250px" }}
        onClick={() => props.handleClick(props.blueButton.color)}
      />
    </div>
  );
}
