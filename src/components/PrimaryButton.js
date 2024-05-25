export class PrimaryButton extends HTMLElement {
  static name = 'primary-button'
  static get style() {
    return /*css*/`
      .primary-button {
        display: block;
        background-color: #383838;
        border-radius: 20px;
        border: none;
        box-shadow: 0px 7px 5px 0px rgba(255,219,185,0.5);
        height: 40px;
        width: 200px; 
        font-size: 20px;
        font-weight: bold;
        color: #B4B4B4;
        margin: 20px;
      }
      `
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.text = this.getAttribute('text')
    this.onClick = this.getAttribute('onclick') || null

    this.shadowRoot.innerHTML = /*html*/`
      <style>${PrimaryButton.style}</style>
      <button tabindex="0" class="primary-button" onclick="{this.onClick}" aria-label="${this.text}">${this.text}</button>
    `
  }
}

customElements.define(PrimaryButton.name, PrimaryButton)