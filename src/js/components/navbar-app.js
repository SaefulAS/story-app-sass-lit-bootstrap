import { LitElement, html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import './locale-picker.js';
import '../localization.js';

class NavbarApp extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  createRenderRoot() { return this; }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#">
            <img src="favicon.png" alt="Logo" width="28" height="28" style="object-fit:cover;border-radius:6px" />
            ${msg('Cerita Alam App')}
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNavbar">
            <div class="ms-auto d-flex gap-2 align-items-center">
              <button id="nav-dashboard" class="btn btn-outline-light active">${msg('Dashboard')}</button>
              <button id="nav-add" class="btn btn-light">${msg('Tambah Cerita Alam')}</button>
              <locale-picker></locale-picker>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define('navbar-app', NavbarApp);
