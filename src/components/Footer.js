export class Footer extends HTMLElement {
  static name = 'footer-container'
  static get style() {
    return /*css*/`
      .footer-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      .footer-text {
        font-size: 10px;
        font-weight: bold;
        color: #B4B4B4;
      }
      .footer-icons {
        font-size: 10px;
        align-self: center;
      }
      .footer-icons img {
        margin-left: 10px;
        height: 20px;
        width: 20px;
        color: #000
      }
    `
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = /*html*/`
      <style>${Footer.style}</style>
      <footer class="footer-container">
        <p class="footer-text" aria-label="Avature challenge by Esteban &#x1F60E;">Avature challenge by Esteban &#x1F60E;</p>
        <div class="footer-icons" tabindex="0" aria-label="Social media icons">
          <a href="https://github.com/estebana28" target="_blank" aria-label="github button">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" />
          </a>
          <a href="https://www.linkedin.com/in/estebana28" target="_blank" aria-label="linkedin button">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedin" />
          </a>
        </div>
      </footer>
    `
  }
}

customElements.define(Footer.name, Footer)
