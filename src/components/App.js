import React, { Component } from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends Component {
  state = {
    players: [
      // {
      //   name: 'Guil',
      //   score: 0,
      //   id: 1
      // },
      // {
      //   name: 'Treasure',
      //   score: 0,
      //   id: 2
      // },
      // {
      //   name: 'Ashley',
      //   score: 0,
      //   id: 3
      // },
      // {
      //   name: 'James',
      //   score: 0,
      //   id: 4
      // }
    ]
  };

  //player id counter
  prevPlayerId = 0;

  handleScoreChange = (index, delta) => {
    this.setState(prevState => {
      return {
        score: prevState.players[index].score += delta
      }
    });
  };

  handleAddPlayer = (name) => {
    this.setState(prevState => {
      return {
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            id: this.prevPlayerId += 1
          }
        ]
      }
    });
  }

  handleRemovePlayer = (id) => {
    this.setState(prevState => {
      return {
        players: prevState.players.filter((player) => {
          return player.id !== id;
        })
      };
    });
  }

  getHighScore = () => {
    const scores = this.state.players.map(p => p.score);
    const highScore = Math.max(...scores);
    if (highScore) {
      return highScore;
    }
    return null;
  }

  render() {
    const highScore = this.getHighScore();

    return (
      <div className="scoreboard">
        <Header
          players={this.state.players}
        />
        <div className="player-list">
          {/* Players list */}
          {this.state.players.map((player, index) =>
            <Player
              key={player.id.toString()}
              score={player.score}
              isHighScore={highScore === player.score}
              id={player.id}
              name={player.name}
              index={index}
              changeScore={this.handleScoreChange}
              removePlayer={this.handleRemovePlayer}
            />
          )}
        </div>
        <AddPlayerForm addPlayer={this.handleAddPlayer} />
      </div>
    );
  }
}

export default App;
