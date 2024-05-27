import { PrimaryButton } from '../components/PrimaryButton.js'
import { MainTitle } from '../components/MainTitle.js'
import { Footer } from '../components/Footer.js'
import { router } from "../../main.js"

export class HomePage extends HTMLElement {
  static name = 'home-page';
  static get style() {
    return /*css*/`
      .home-page-container {
        display: grid;
        height: 100%;
        grid-template-rows: auto 1fr auto;
      }   
      .disabled {
        opacity: 0.7;
      }
    `
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = /*html*/`
      <style>${HomePage.style}</style>
      <div class="home-page-container">
        <div>
          <main-title></main-title>
        </div>
        <div>
          <div class="disabled">
            <primary-button id="one-game" text="One Player"></primary-button>
          </div>

          <primary-button id="two-game" text="Two Players"></primary-button>
        </div>
        <div>
          <footer-container></footer-container>
        </div>
      </div>
    `
  }

  connectedCallback() {
    // this.shadowRoot.querySelector('#one-game').addEventListener('click', () => {router.load('who?player=1')})
    this.shadowRoot.querySelector('#two-game').addEventListener('click', () => {router.load('who?player=2')})
    this.shadowRoot.querySelector('#one-game').classList.add('disabled')
  }

  

}

customElements.define(HomePage.name, HomePage)