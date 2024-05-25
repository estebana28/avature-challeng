export class MainTitle extends HTMLElement {
  static name = 'main-title'
  static get style() {
    return /*css*/`
      .title {
        display: block;
        font-size: 50px;
        font-weight: bold;
        color: #FFDBB9;
      },
      `
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = /*html*/`
      <style>${MainTitle.style}</style>
      <h1 class="title" aria-label="Tic Tac Toe">Tic Tac Toe</h1>
    `
  }
}

customElements.define(MainTitle.name, MainTitle)