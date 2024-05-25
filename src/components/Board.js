export class Board extends HTMLElement {
  static name = 'board-container'
  static get style() {
    return /*css*/`
      .board-row-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        width: 210px;
        height: 210px;     
        padding: 20px;   
        border-radius: 10px;
        background-color: #383838;
        box-shadow: 0px 10px 10px 0px rgba(255,219,185,0.5);
      }
      .board-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        border: 1px solid #E5E5E5;
        font-size: 40px;
        font-weight: bold;
      }
    `
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    
   
    this.shadowRoot.innerHTML = /*html*/`
      <style>${Board.style}</style>
    <div class="board-row-container">
        <div class="board-box" data-row="0" data-col="0" aria-label="box-0-0"></div>
        <div class="board-box" data-row="0" data-col="1" aria-label="box-0-1"></div>
        <div class="board-box" data-row="0" data-col="2" aria-label="box-0-2"></div>
        
        <div class="board-box" data-row="1" data-col="0" aria-label="box-1-0"></div>
        <div class="board-box" data-row="1" data-col="1" aria-label="box-1-1"></div>
        <div class="board-box" data-row="1" data-col="2" aria-label="box-1-2"></div>
        
        <div class="board-box" data-row="2" data-col="0" aria-label="box-2-0"></div>
        <div class="board-box" data-row="2" data-col="1" aria-label="box-2-1"></div>
        <div class="board-box" data-row="2" data-col="2" aria-label="box-2-2"></div>
      </div>
    `

    
  }

  handleEvent(event) {
    if (event.type === 'click') {
      const clickEvent = new CustomEvent('box-click', {
        detail: {
          row: event.target.dataset.row,
          col: event.target.dataset.col
        },
        bubbles: true,
        composed: true
      })    
      this.dispatchEvent(clickEvent)
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('.board-box').forEach(element => {
      element.addEventListener('click', this)
    });}
  
}

customElements.define(Board.name, Board)