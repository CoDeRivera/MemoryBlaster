import React, { Component } from "react";
import ReactDOM from "react-dom";
require("./index.css");

import ButtonGrid from "./components/ButtonGrid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      usrMoves: [],
      pcMoves: [],
      score: 0,
      isUserTurn: true,
      greenButton: {
        color: "green"
      },
      redButton: {
        color: "red"
      },
      yellowButton: {
        color: "yellow"
      },
      blueButton: {
        color: "blue"
      },
      isUserTurn: false,

      // Sound files
      greenSound: new Audio(
        "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
      ),
      redSound: new Audio(
        "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
      ),
      yellowSound: new Audio(
        "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
      ),
      blueSound: new Audio(
        "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
      ),
      wrongAnswer: new Audio(
        "http://www.freesound.org/data/previews/331/331912_3248244-lq.mp3"
      )
    };

    this.activateButton = this.activateButton.bind(this);
    this.playSound = this.playSound.bind(this);
    this.usrTurn = this.usrTurn.bind(this);
  }
  // =====================================================================

  // =====================================================================
  //  Causes button selected to flash
  // =====================================================================
  activateButton(colorButton) {
    this.playSound(colorButton);
    this.setState(
      {
        [colorButton + "Button"]: {
          color: "white"
        }
      },
      () => {
        setTimeout(() => {
          this.setState({
            [colorButton + "Button"]: {
              color: colorButton
            }
          });
        }, 300);
      }
    );
  }
  // =====================================================================

  // =====================================================================
  //   Plays sound for color selected
  // =====================================================================
  playSound(color) {
    if (color === "green") {
      this.state.greenSound.play();
    } else if (color === "red") {
      this.state.redSound.play();
    } else if (color === "yellow") {
      this.state.yellowSound.play();
    } else {
      this.state.blueSound.play();
    }
  }
  // =====================================================================

  // =====================================================================
  //  Takes button selected by user and adds it to user sequence
  // =====================================================================
  usrTurn(color) {
    let tmpUsrMoves = this.state.usrMoves;
    tmpUsrMoves.push(color);
    this.setState(
      {
        usrMoves: tmpUsrMoves
      },
      () => {
        this.activateButton(color);
      }
    );
  }
  // =====================================================================

  // =====================================================================
  //  Renders ButtonGrid component and passes properties for buttons
  // =====================================================================
  render() {
    return (
      <div className="base">
        <ButtonGrid
          greenButton={this.state.greenButton}
          redButton={this.state.redButton}
          yellowButton={this.state.yellowButton}
          blueButton={this.state.blueButton}
          handleClick={this.usrTurn}
          isUserTurn={this.state.isUserTurn}
          score={this.state.score}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
