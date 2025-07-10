import { LitElement, html, css } from "lit";

class SuccessToast extends LitElement {
  static properties = {
    message: { type: String },
    type: { type: String }, // "success" or "error"
  };

  static styles = css`
    .toast-container {
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 1055;
      padding: 1.2rem;
    }
    .toast {
      background: var(--toast-bg, #388e3c);
      color: #fff;
      border-radius: 9px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      padding: 1rem 1.4rem;
      display: flex;
      align-items: center;
      gap: 1.1rem;
      font-size: 1rem;
      min-width: 220px;
    }
    .toast.error {
      background: #e53935;
    }
    .toast.success {
      background: #388e3c;
    }
    .close-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.3rem;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.message = "";
    this.type = "success"; // or 'error'
  }

  render() {
    return html`
      <div class="toast-container" style="display:${this.message ? "" : "none"};">
        <div class="toast ${this.type}">
          <span>${this.message}</span>
          <button class="close-btn" @click=${() => this.hide()}>×</button>
        </div>
      </div>
    `;
  }

  show(msg, type = "success", timeout = 2000) {
    this.message = msg;
    this.type = type;
    this.style.display = "";
    clearTimeout(this._hideTimer);
    this._hideTimer = setTimeout(() => this.hide(), timeout);
  }

  hide() {
    this.message = "";
    this.style.display = "none";
  }
}

customElements.define("success-toast", SuccessToast);
