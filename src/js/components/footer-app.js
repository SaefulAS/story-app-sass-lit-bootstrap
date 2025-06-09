import { LitElement, html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

class FooterApp extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  createRenderRoot() { return this; }

  render() {
    return html`
      <footer class="bg-light text-center text-muted py-3 mt-4 border-top">
        ${msg('Built with Saeful Abdulloh Sayuti | Cerita Alam App')}
      </footer>
    `;
  }
}
customElements.define("footer-app", FooterApp);
