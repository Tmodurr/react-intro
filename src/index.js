
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares){
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
  }

  return null;
      
}

function Square(props){
  // function component, doesn't have state, only takes props
    return (
        <button 
        className="square" 
        onClick={props.onClick}
      >
        {props.value}
      </button>
    )
}


function determineRow(i){
    if( [0,1,2].includes(i) ){
      return 1;
    }
    else if ( [3,4,5].includes(i) ){
      return 2;
    }
    else if ( [6,7,8].includes(i) ){
      return 3;
    }
  }
function determineCol(i){
  if( [0,3,6].includes(i) ){
    return 1;
  }
  else if ( [1,4,7].includes(i) ){
    return 2;
  }
  else if ( [2,5,8].includes(i) ){
    return 3;
  }
}


  
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} //this should be where x,o is passed
        onClick={()=> this.props.onClick(i)}
      />
    ); 
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          history: [{
              squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
          currentSelectionIndex: null,
      };
      
  }

  handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      console.log(i);
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]){
          return
      }
      squares[i] = this.state.xIsNext ? 'X': 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        currentSelectionIndex: i,
      });
  }
 
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
      
    const moves = history.map((step, move) => {
      let currentSelectionIndex = this.state.currentSelectionIndex;
      let row = determineRow(currentSelectionIndex); 
      let col = determineCol(currentSelectionIndex); 

      const desc = move ? 
        'Go to move #' + move + '(Col: ' + col + ' , ' + 'Row: ' + row + ')' : 
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  