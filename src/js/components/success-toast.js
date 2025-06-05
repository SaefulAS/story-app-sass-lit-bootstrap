import { LitElement, html, css } from 'lit';

class SuccessToast extends LitElement {
  static styles = css`
    .toast-container {
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 1055;
      padding: 1.2rem;
    }
    .toast {
      background: #388e3c;
      color: #fff;
      border-radius: 9px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      padding: 1rem 1.4rem;
      display: flex;
      align-items: center;
      gap: 1.1rem;
      font-size: 1rem;
    }
    .close-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.3rem;
      cursor: pointer;
    }
  `;
  render() {
    return html`
      <div class="toast-container">
        <div class="toast">
          <span>Story berhasil ditambahkan!</span>
          <button class="close-btn" @click=${() => this.hide()}>×</button>
        </div>
      </div>
    `;
  }
  hide() {
    this.style.display = 'none';
  }
}
customElements.define('success-toast', SuccessToast);