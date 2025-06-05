import { LitElement, html } from 'lit';

class NavbarApp extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#">
            <img src="favicon.png" alt="Logo" width="28" height="28" style="object-fit:cover;border-radius:6px" />
            Cerita Alam App
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNavbar">
            <div class="ms-auto d-flex gap-2">
              <button id="nav-dashboard" class="btn btn-outline-light active">Dashboard</button>
              <button id="nav-add" class="btn btn-light">Tambah Cerita Alam</button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define('navbar-app', NavbarApp);
