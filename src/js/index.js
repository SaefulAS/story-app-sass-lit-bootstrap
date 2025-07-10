import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../sass/main.scss";
import "../sass/custom-bootstrap.scss";

import { msg } from "@lit/localize";

import "./components/navbar-app.js";
import "./components/story-list.js";
import "./components/story-card.js";
import "./components/add-story-form.js";
import "./components/success-toast.js";
import "./components/footer-app.js";

import renderDashboard from "./dashboard";
import renderAddForm from "./storyForm";
import renderLogin from "./auth/login.js";
import renderRegister from "./auth/register";

const main = document.querySelector("main");
const navbar = document.querySelector("navbar-app");
const navDashboard = () => navbar.querySelector("#nav-dashboard");
const navAdd = () => navbar.querySelector("#nav-add");

function handleRoute() {
  const hash = window.location.hash.replace("#", "");
  const token = localStorage.getItem("access_token");

  if (!token && hash !== "register") {
    if (window.location.hash !== "#login") window.location.hash = "login";
    renderLogin(main);
    return;
  }
  if (hash === "register") {
    if (window.location.hash !== "#register") window.location.hash = "register";
    renderRegister(main);
    return;
  }
  if (hash === "login") {
    if (token) {
      window.location.hash = "dashboard";
    } else {
      renderLogin(main);
    }
    return;
  }
  if (hash === "add-story") {
    renderAddForm(main, navAdd(), [navDashboard(), navAdd()]);
  } else {
    if (window.location.hash !== "#dashboard") window.location.hash = "dashboard";
    renderDashboard(main, navDashboard(), [navDashboard(), navAdd()]);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash || window.location.hash === "#") {
    window.location.hash = "dashboard";
  } else {
    handleRoute();
  }

  window.addEventListener("locale-changed", handleRoute);
  window.addEventListener("hashchange", handleRoute);

  document.body.addEventListener("click", (e) => {
    // Event delegation for nav-dashboard & nav-add
    if (e.target && e.target.id === "nav-dashboard") {
      window.location.hash = "dashboard";
    }
    if (e.target && e.target.id === "nav-add") {
      window.location.hash = "add-story";
    }
  });
});

function updateTitle() {
  document.title = msg("Cerita Alam App");
}
updateTitle();
window.addEventListener("locale-changed", updateTitle);
