import { getStorage } from './storage'


// This class represents the game board and the logic of the game
export class TicTacToe {
  static name = 'tic-tac-toe'
  static winnerCombinations = [
    [[0,0], [0,1], [0,2]], 
    [[1,0], [1,1], [1,2]], 
    [[2,0], [2,1], [2,2]], 
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]]
  ]
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  constructor() {
    this.board = this.board
    this.playerOneName = getStorage('player-one') || 'X'
    this.playerTwoName = getStorage('player-two') || 'O'
    this.currentPlayerMark = 'X'
  }

  // Plays a move
  play(row, col) {
    if (this.board[row][col] === '') {
      this.board[row][col] = this.currentPlayerMark
      const oldPlayer = this.changePlayer(this.currentPlayerMark)
      return oldPlayer
    }   
  }

  // Change the player mark for the board
  changePlayer(player) {
    this.currentPlayerMark = player === 'X' ? 'O' : 'X'
    return player
  }
  
  // Check if the board is full or if there is a winner
  checkWin(player) {
    for (const combination of TicTacToe.winnerCombinations) {
      const [a, b, c] = combination
      if (this.board[a[0]][a[1]] === this.board[b[0]][b[1]] && this.board[a[0]][a[1]] === this.board[c[0]][c[1]] && this.board[a[0]][a[1]] !== '') {
        return player === 'X' ? this.playerOneName : this.playerTwoName
      }
    }
    if (this.board.every(row => row.every(col => col !== ''))) {
      return 'Tie'
    }
    return null
  }
}

