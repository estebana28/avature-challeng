

export class Input extends HTMLElement {
  static name = 'input-component'
  static get style() {
    return /*css*/`
      .input {
        width: 100%;
        height: 40px;
        border: 1px solid #E5E5E5;
        border-radius: 10px;
        padding-left: 10px;
        color: #B4B4B4;
        margin: 10px 0px;
      }
      .input:focus {
        outline: none;
        border: 1px solid #FFDBB9;
      }
      .label {
        display: block;
        font-size: 20px;
        font-weight: bold;
        color: #B4B4B4;
        margin-bottom: 5px;
        text-align: start;
      }
      
    `
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.placeholder = this.getAttribute('placeholder')
    this.value = this.getAttribute('value') || ""
    this.styles = this.getAttribute('styles') || ""
    this.label = this.getAttribute('label')
    this.name = this.getAttribute('name')


    this.shadowRoot.innerHTML = /*html*/`
      <style>${Input.style}</style>
      <div>
        <label class="label" htmlFor="${this.name}">${this.label}</label>
        <input id="${this.name}-input" placeholder="${this.placeholder}" name="${this.name}" class="input ${this.styles}">
      </div>
    `
  }



}

customElements.define(Input.name, Input)
