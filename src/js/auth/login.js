import { loginUser } from "../api/authApi";
import { msg } from "@lit/localize";

export default function renderLogin(main) {
  if (window.location.hash !== "#login") window.location.hash = "login";

  main.innerHTML = `
    <section class="section-content d-flex flex-column align-items-center justify-content-center" style="min-height: 80vh;">
      <success-toast style="display:none"></success-toast>
      <form id="login-form" class="needs-validation p-4 rounded shadow" style="max-width: 380px; width:100%; background: #fff" novalidate autocomplete="off">
        <h2 class="mb-4 text-center">${msg("Login")}</h2>
        <div class="mb-3">
          <label for="login-email" class="form-label">${msg("Email")}</label>
          <input type="email" class="form-control" id="login-email" name="email" required placeholder="${msg("Masukkan email")}" />
          <div class="invalid-feedback">${msg("Email wajib diisi!")}</div>
        </div>
        <div class="mb-3 position-relative">
          <label for="login-password" class="form-label">${msg("Password")}</label>
          <div class="input-group">
            <input type="password" class="form-control" id="login-password" name="password" required placeholder="${msg("Password")}" minlength="8" />
            <span class="input-group-text" id="toggle-login-password" style="cursor:pointer;">
              <i class="fa fa-eye"></i>
            </span>
          </div>
          <div class="invalid-feedback" style="margin-top:0.3rem;">${msg("Password minimal 8 karakter!")}</div>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3">${msg("Login")}</button>
        <p class="mt-3 mb-0 text-center">${msg("Belum punya akun?")} <a href="#register" id="to-register-link">${msg("Register")}</a></p>
      </form>
    </section>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
    .input-group + .invalid-feedback,
    .form-control + .invalid-feedback {
      min-height: 20px;
      display: block;
      visibility: hidden;
      margin-bottom: 0.1rem;
    }
    .input-group.is-invalid + .invalid-feedback,
    .form-control.is-invalid + .invalid-feedback {
      visibility: visible;
      color: #dc3545;
    }
  `;
  document.head.appendChild(style);

  const emailInput = main.querySelector("#login-email");

  emailInput.addEventListener("input", () => {
    if (emailInput.checkValidity()) {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
    } else {
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
    }
  });
  emailInput.addEventListener("blur", () => {
    if (!emailInput.checkValidity()) {
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
    }
  });

  const pwdInput = main.querySelector("#login-password");
  const togglePwd = main.querySelector("#toggle-login-password");
  togglePwd.addEventListener("click", () => {
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      togglePwd.innerHTML = "<i class=\"fa fa-eye-slash\"></i>";
    } else {
      pwdInput.type = "password";
      togglePwd.innerHTML = "<i class=\"fa fa-eye\"></i>";
    }
  });

  const pwdGroup = pwdInput.closest(".input-group");

  pwdInput.addEventListener("input", () => {
    if (pwdInput.value.length < 8) {
      pwdInput.classList.add("is-invalid");
      pwdInput.classList.remove("is-valid");
      pwdGroup.classList.add("is-invalid");
      pwdGroup.classList.remove("is-valid");
    } else {
      pwdInput.classList.remove("is-invalid");
      pwdInput.classList.add("is-valid");
      pwdGroup.classList.remove("is-invalid");
      pwdGroup.classList.add("is-valid");
    }
  });
  pwdInput.addEventListener("blur", () => {
    if (pwdInput.value.length < 8) {
      pwdInput.classList.add("is-invalid");
      pwdInput.classList.remove("is-valid");
      pwdGroup.classList.add("is-invalid");
      pwdGroup.classList.remove("is-valid");
    }
  });

  const toast = main.querySelector("success-toast");

  const form = main.querySelector("#login-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    Array.from(form.elements).forEach((el) => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.checkValidity()) {
          el.classList.add("is-valid");
          el.classList.remove("is-invalid");
        } else {
          el.classList.add("is-invalid");
          el.classList.remove("is-valid");
        }
      }
    });

    if (form.checkValidity()) {
      const email = form.email.value.trim();
      const password = form.password.value;
      const submitBtn = form.querySelector("button[type=\"submit\"]");
      const oldBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${msg("Login...")}
      `;

      try {
        const data = await loginUser({ email, password });
        if (!data.error) {
          toast.show(msg("Login berhasil!"), "success");
          setTimeout(() => {
            localStorage.setItem("access_token", data.loginResult.token);
            localStorage.setItem("user_name", data.loginResult.name);
            window.location.hash = "dashboard";
            window.location.reload();
          }, 800);
        } else {
          toast.show(data.message) || msg("Login gagal"), "error";
        }
      } catch (err) {
        toast.show(err?.response?.data?.message || msg("Login gagal"), "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = oldBtnHTML;
      }
    } else {
      form.classList.add("was-validated");
    }
  });

  main.querySelector("#to-register-link").onclick = (e) => {
    e.preventDefault();
    window.location.hash = "register";
  };
}
