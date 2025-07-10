import { LitElement, html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";
import "./locale-picker.js";
import "../localization.js";

class NavbarApp extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const loggedIn = typeof window !== "undefined" && !!localStorage.getItem("access_token");
    const userName = typeof window !== "undefined" ? localStorage.getItem("user_name") : "";

    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#">
            <img
              src="favicon.png"
              alt="Logo"
              width="28"
              height="28"
              style="object-fit:cover;border-radius:6px"
            />
            ${msg("Cerita Alam App")}
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNavbar">
            <div class="ms-auto d-flex gap-2 align-items-center">
              ${loggedIn
                ? html`
                    <button id="nav-dashboard" class="btn btn-outline-light active">
                      ${msg("Dashboard")}
                    </button>
                    <button id="nav-add" class="btn btn-light">${msg("Tambah Cerita Alam")}</button>
                  `
                : ""}
              <locale-picker></locale-picker>
              ${loggedIn
                ? html`
                    <span class="text-light me-2 d-none d-md-inline"
                      >${userName ? `👤 ${userName}` : ""}</span
                    >
                    <button id="logout-btn" class="btn btn-outline-light" title="Logout">
                      <i class="fa fa-sign-out-alt"></i> ${msg("Keluar")}
                    </button>
                  `
                : ""}
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  firstUpdated() {
    const btn = this.querySelector("#logout-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_name");
        window.location.hash = "login";
        window.location.reload();
      });
    }
  }
}
customElements.define("navbar-app", NavbarApp);
