import { LitElement, html, css } from "lit";

class LoadingSpinner extends LitElement {
  static styles = css`
    .spinner-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 180px;
    }
  `;
  render() {
    return html`
      <div class="spinner-wrapper">
        <div class="spinner-border text-primary" role="status" style="width:3rem;height:3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
  }
}
customElements.define("loading-spinner", LoadingSpinner);
