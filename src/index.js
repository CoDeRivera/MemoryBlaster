import React, { Component } from "react";
import ReactDOM from "react-dom";
require("./index.css");

import ButtonGrid from "./components/ButtonGrid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      usrMoves: [],
      aiMoves: [],
      score: 0,
      isUserTurn: true,
      gameOver: false,
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
    this.aiTurn = this.aiTurn.bind(this);
    this.playAISequence = this.playAISequence.bind(this);
  }
  // =====================================================================

  // =====================================================================

  gameRunning() {
    this.setState(
      {
        aiMoves: [],
        usrMoves: [],
        isMatch: true,
        isUserTurn: false,
        gameOver: false,
        score: 0
      },
      () => {
        this.aiTurn();
      }
    );
  }

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
        //Check to make sure that each button chosen, matches sequence
        for (let i = 0; i < this.state.usrMoves.length; i++) {
          if (this.state.usrMoves[i] != this.state.aiMoves[i]) {
            // this.state.wrongAnswer.play();
            this.setState(
              {
                isUserTurn: false,
                gameOver: true,
                aiMoves: [],
                usrMoves: []
              },
              () => {
                console.log("GAME OVER!");
              }
            );
          }
        }
        //Timeout to give state.gameOver a chance to update (**There's a better way**)
        setTimeout(() => {
          //checks if  the game is over and if its still users turn
          //makes sure the # of user moves doesnt exceed # of aiMoves
          //when the # user moves equals the # of aiMoves your turn is over
          if (
            this.state.usrMoves.length == this.state.aiMoves.length &&
            this.state.gameOver == false
          ) {
            this.setState(
              prevState => {
                return {
                  isUserTurn: !prevState.isUserTurn,
                  usrMoves: (prevState.usrMoves = []),
                  score: (prevState.score += 1)
                };
              },
              () => {
                setTimeout(() => {
                  this.aiTurn();
                  // console.log("aiTurn fired");
                }, 1200);
              }
            );
          }
        }, 100);
      }
    );
  }

  aiTurn() {
    let randomColor = Math.floor(Math.random() * 4);
    let color = "";
    if (randomColor == 0) {
      color = this.state.greenButton.color;
    } else if (randomColor == 1) {
      color = this.state.redButton.color;
    } else if (randomColor == 2) {
      color = this.state.yellowButton.color;
    } else {
      color = this.state.blueButton.color;
    }

    // =====================================================================
    //creates temp array and copys state.aiMoves
    //Push's colorButton and adds it to array
    //sets state aiMoves[] with the new array of tmpAIMoves[]
    //Play array sequence
    let tmpAIMoves = this.state.aiMoves;
    tmpAIMoves.push(color);
    this.setState(
      prevState => {
        aiMoves: prevState.aiMoves = tmpAIMoves;
      },
      () => {
        //Plays the sequence for the user
        this.playAISequence();

        //if aiMoves's length matches
        if (this.state.aiMoves.length >= this.state.usrMoves.length) {
          this.setState(prevState => {
            return {
              isUserTurn: (prevState.isUserTurn = true)
            };
          });
        }
      }
    );
  }
  // =====================================================================

  // =====================================================================
  playAISequence() {
    let sequence = this.state.aiMoves;
    let activate = this.activateButton;

    for (let i = 0; i < this.state.aiMoves.length; i++) {
      (function(i) {
        setTimeout(() => {
          activate(sequence[i]);
        }, 650 * i);
      })(i);
    }
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
          startGame={this.aiTurn}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
