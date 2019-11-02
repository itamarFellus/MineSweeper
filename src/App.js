import React from 'react';
import RenderBoard from './RenderBoard';
import WaitingPage from './WaitingPage';
import Score from './Score';
import kick1 from './audio/kick.wav';

const kick = new Audio(kick1);
const tink = new Audio(require('./audio/plastic.wav'));

export default class App extends React.Component {
  constructor() {
    super()

    this.getUpdatedUITable = this.getUpdatedUITable.bind(this);
    this.callForGame = this.callForGame.bind(this);

    this.state = {
      UITable: null,
      isRedTurn: null,
      score: null,
      redScore: null,
      blueScore: null,
      numberOfPlayers: 0
    };
  }

  componentWillMount() {
    fetch('/getData', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    }).then(res => res.json().then(res => {
      this.setState({ UITable: res.UITable, isRedTurn: res.isRedTurn, score: res.score, redScore: res.redScore, blueScore: res.blueScore })
    }))
  }

  getUpdatedUITable(column, row) {
    fetch('/updateUITable', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UITable: this.state.UITable, isRedTurn: this.state.isRedTurn, redScore: this.state.redScore, blueScore: this.state.blueScore, column: column, row: row, score: this.state.score })
    }).then(res => res.json().then(res => {
      if (res.cellValue === 'X') {
        kick.play();
      } else {
        tink.play();
      }
      this.setState({ UITable: res.table, isRedTurn: res.isRedTurn, score: res.score, redScore: res.redScore, blueScore: res.blueScore })
    })
    )
  }

  callForGame() {
    fetch('./ready', { method: 'POST' })
      .then(res => res.json())
      .then(res => {
        if (res.isReadyToPlay) {
          this.setState({ numberOfPlayers: 2 })
          console.log('Game!');
          return false;
        } else {
          console.log('still waiting');
          this.setState(this.state);
          return true;
        }
      })
  }

  greetUser() {
    fetch('/startSession', {
      method: 'POST',
    }).then(res => res.json().then(res => {
      if (res.isExists) {
        alert('Welcome back!')
      } else {
        alert('Hello newbie!')
      }
    }))
  }

  playerWon() {
    if(this.state.blueScore >= (Math.floor(this.state.score / 2) + 1)) {
      alert('BLUE HAS WON!');
    } else if (this.state.redScore >= 2) {
      if(window.confirm('RED HAS WON!')) {
        this.setState({ UITable: null })
      } else {
        alert('OK, Goodbye!');
      }
    }
    return;
  } 
  
  render() {
    if (!this.state.UITable) {
      this.greetUser();
      return null;
    } else if (this.state.numberOfPlayers < 2) {
      return (
        <WaitingPage numberOfPlayers={this.state.numberOfPlayers} callForGame={this.callForGame} />
      )
    } else {
      return (
        <div id="semiBody">
          <Score redScore={this.state.redScore} blueScore={this.state.blueScore} score={this.state.score} isRedTurn={this.state.isRedTurn} />
          <RenderBoard UITable={this.state.UITable} updateUITable={this.updateUITable} isRedTurn={this.state.isRedTurn} getUpdatedUITable={this.getUpdatedUITable} />
          {this.playerWon()}
        </div>
      )
    }
  }
}