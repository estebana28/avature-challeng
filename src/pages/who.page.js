import { MainTitle } from '../components/MainTitle.js'
import { Footer } from '../components/Footer.js'
import { Input } from '../components/Input.js'
import { router } from "../../main.js"
import { setStorage } from '../utils/storage.js';


export class WhoPage extends HTMLElement {
  static name = 'who-page';
  static router = null
  static get style() {
    return /*css*/`
      .who-page-container {
        display: grid;
        height: 100%;
        grid-template-rows: auto 1fr auto;
      }
      .input-error {
        opacity: 0;
        color: red;
        font-size: 12px;
        font-weight: bold;
        margin-top: 5px;
      }
      .error {
        opacity: 1;
      }
    
    `
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.playerName = ''

    this.shadowRoot.innerHTML = /*html*/`
      <style>${WhoPage.style}</style>
      <div class="who-page-container">
        <div>
          <main-title></main-title>
        </div>
        <div class="form-container">
          <input-component placeholder="Ingrese su nombre" name="nameOne" label="Jugador 1"></input-component>
          <input-component placeholder="Ingrese su nombre" name="nameTwo" label="Jugador 2"></input-component>
          <p id="input-error" class="input-error">Debe de tener al menos 2 caracteres</p>
          <primary-button id="continue" text="Continuar"></primary-button>
        </div>
        <div>
          <footer-container></footer-container>
        </div>
      </div>
    `
  }

  submitName() {    
    console.log(this.shadowRoot.querySelector('.form-container').childNodes);
    const nameOne = this.shadowRoot.querySelector('.form-container').childNodes[1].shadowRoot.querySelector('input').value
    const nameTwo = this.shadowRoot.querySelector('.form-container').childNodes[3].shadowRoot.querySelector('input').value
    
    if (nameOne.length >= 2 && nameTwo.length >= 2) {
      setStorage('player-one', nameOne)
      setStorage('player-two', nameTwo)
      router.load('game')
    } else {
      this.shadowRoot.querySelector('.input-error').classList.add('error')
    }
    
  } 

  connectedCallback() {
    this.shadowRoot.querySelector('.form-container').querySelector('#continue').addEventListener('click', () => {
      this.submitName()
    })
    this.shadowRoot.querySelector('.form-container').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.submitName()
      }
    })
  }
}

customElements.define(WhoPage.name, WhoPage)