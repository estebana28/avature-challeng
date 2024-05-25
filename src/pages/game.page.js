import { MainTitle } from '../components/MainTitle.js'
import { Board } from '../components/Board.js'
import { Footer } from '../components/Footer.js'
import { TicTacToe } from '../utils/game.js'
import { findBox } from '../utils/auxiliary.js'

export class GamePage extends HTMLElement {
  static name = 'game-page'
  static gameSession = null
  static get style() {
    return /*css*/`
      .game-page-container {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: 100%;
      }
      .board-container {
        display: flex;
        flex-direction: column;,
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
      .turno {
        font-size: 20px;
        font-weight: bold;
        align-self: start;
      }
      .winner {
        color: #9BDA4B;
        align-self: center;
        transition: all 2s;
      }
      .loser {
        color: #D6293E;
        align-self: center;
        transition: all 2s;
      }
      #restart {
        padding-top: 20px;
      }
      .hide-element {
        display: none;
      }
    `
  }
  constructor() {
    super();
    this.gameSession = new TicTacToe()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = /*html*/`
      <style>${GamePage.style}</style>
      <div class="game-page-container">
        <div>
          <main-title></main-title>
        </div>
        <div class="board-container">
          <p class="turno">Turno de ${this.gameSession.playerOneName}</p>
          <board-container></board-container>
          <div id="restart" class="hide-element">
            <primary-button text="Nuevo Juego"></primary-button>
          </div>
        </div>
        <div>
          <footer-container></footer-container>
        </div>
      </div>
    `
  }
// TODO refactorizar
  handleEvent(event) {
    if (event.type === 'box-click') {
      const player = this.gameSession.play(event.detail.row, event.detail.col);
      this.changeTurn(this.gameSession.currentPlayerMark)
      this.paintBoard(event, player)
      const result = this.gameSession.checkWin(player)
      if (result && result === 'Tie') {
        this.handleTie()
      } else if (result) {
        this.handleWinner(result)
      }
    }
  }

  paintBoard(event, player) {
    const boxes = this.shadowRoot.querySelector('board-container').shadowRoot.querySelectorAll('.board-box')
      const clickedBox = findBox(boxes, event.detail.row, event.detail.col)
      if (clickedBox && clickedBox.innerHTML === '') {
        clickedBox.style.color = player === 'X' ? '#7300FE' : '#FFB252'
        clickedBox.innerHTML = player
      }
  }

  changeTurn(player) {
    this.shadowRoot.querySelector('.turno').innerHTML = player === 
    'O' ? `Turno de ${this.gameSession.playerTwoName}` : `Turno de ${this.gameSession.playerOneName}`
  }

  handleTie() {
    this.shadowRoot.querySelector('.turno').innerHTML = 'Empate'
    this.shadowRoot.querySelector('.turno').classList.add('loser')
    this.shadowRoot.querySelector('#restart').classList.remove('hide-element')
    document.removeEventListener('box-click', this)
  }

  handleWinner(player) {
    this.shadowRoot.querySelector('.turno').innerHTML = `Ganaste ${player} ! ! !`
    this.shadowRoot.querySelector('.turno').classList.add('winner')
    this.shadowRoot.querySelector('#restart').classList.remove('hide-element')

    document.removeEventListener('box-click', this)
  }

  connectedCallback() {
    document.addEventListener('box-click', this)
    this.shadowRoot.querySelector('#restart').children[0].addEventListener('click', () => this.newGame());
  }

  newGame() {
    this.resetBoard()
    this.gameSession = new TicTacToe()
  }

  resetBoard() {
    this.shadowRoot.querySelector('#restart').classList.add('hide-element')
    const boxes = this.shadowRoot.querySelector('board-container').shadowRoot.querySelectorAll('.board-box')
    for (const box of boxes) {
      box.innerHTML = ''
    }
    this.changeTurn('X')
    this.shadowRoot.querySelector('.turno').classList.remove('winner')
    this.shadowRoot.querySelector('.turno').classList.remove('loser')
    this.connectedCallback()
  }

}

customElements.define(GamePage.name, GamePage)