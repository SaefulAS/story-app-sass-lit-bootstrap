import { LitElement, html } from 'lit';
import { t, setLocale, currentLocale } from '../locales';

class NavbarApp extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#">
            <img src="favicon.png" alt="Logo" width="28" height="28" style="object-fit:cover;border-radius:6px" />
            ${t("appTitle")}
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNavbar">
            <div class="ms-auto d-flex gap-2 align-items-center">
              <button id="nav-dashboard" class="btn btn-outline-light active">${t("dashboard")}</button>
              <button id="nav-add" class="btn btn-light">${t("addStory")}</button>
              <select id="locale-select" class="form-select ms-2" style="width:auto"
                @change="${this.changeLocale}">
                <option value="id" ?selected=${currentLocale === "id"}>ID</option>
                <option value="en" ?selected=${currentLocale === "en"}>EN</option>
                <option value="ja" ?selected=${currentLocale === "ja"}>日本語</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
  changeLocale(e) {
    setLocale(e.target.value);
    this.requestUpdate();
    document.querySelectorAll("*").forEach(el => el.requestUpdate?.());
  }
}
customElements.define('navbar-app', NavbarApp);
