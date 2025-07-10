import { registerUser } from "../api/authApi";
import { msg } from "@lit/localize";

export default function renderRegister(main) {
  if (window.location.hash !== "#register") window.location.hash = "register";

  main.innerHTML = `
    <section class="section-content d-flex flex-column align-items-center justify-content-center" style="min-height: 80vh;">
      <success-toast style="display:none"></success-toast>
      <form id="register-form" class="needs-validation p-4 rounded shadow" style="max-width: 380px; width:100%; background: #fff" novalidate autocomplete="off">
        <h2 class="mb-4 text-center">${msg("Register")}</h2>
        <div class="mb-3">
          <label for="register-name" class="form-label">${msg("Nama")}</label>
          <input type="text" class="form-control" id="register-name" name="name" required placeholder="${msg("Nama lengkap")}" />
          <div class="invalid-feedback">${msg("Nama wajib diisi!")}</div>
        </div>
        <div class="mb-3">
          <label for="register-email" class="form-label">${msg("Email")}</label>
          <input type="email" class="form-control" id="register-email" name="email" required placeholder="${msg("Email aktif")}" />
          <div class="invalid-feedback">${msg("Email wajib diisi!")}</div>
        </div>
        <div class="mb-3 position-relative">
          <label for="register-password" class="form-label">${msg("Password")}</label>
          <div class="input-group">
            <input type="password" class="form-control" id="register-password" name="password" required minlength="8" placeholder="${msg("Password minimal 8 karakter")}" />
            <span class="input-group-text" id="toggle-register-password" style="cursor:pointer;">
              <i class="fa fa-eye"></i>
            </span>
          </div>
          <div class="invalid-feedback">${msg("Password minimal 8 karakter!")}</div>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3">${msg("Register")}</button>
        <p class="mt-3 mb-0 text-center">${msg("Sudah punya akun?")} <a href="#login" id="to-login-link">${msg("Login")}</a></p>
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

  // Get field
  const nameInput = main.querySelector("#register-name");
  const emailInput = main.querySelector("#register-email");
  const pwdInput = main.querySelector("#register-password");
  const togglePwd = main.querySelector("#toggle-register-password");
  const pwdGroup = pwdInput.closest(".input-group");

  // Name: Real-time helper
  nameInput.addEventListener("input", () => {
    if (nameInput.checkValidity()) {
      nameInput.classList.remove("is-invalid");
      nameInput.classList.add("is-valid");
    } else {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
    }
  });
  nameInput.addEventListener("blur", () => {
    if (!nameInput.checkValidity()) {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
    }
  });

  // Email: Real-time helper
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

  // Password: Show/hide & real-time helper
  togglePwd.addEventListener("click", () => {
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      togglePwd.innerHTML = "<i class=\"fa fa-eye-slash\"></i>";
    } else {
      pwdInput.type = "password";
      togglePwd.innerHTML = "<i class=\"fa fa-eye\"></i>";
    }
  });

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

  // Toast
  const toast = main.querySelector("success-toast");

  // Form submit
  const form = main.querySelector("#register-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    Array.from(form.elements).forEach((el) => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.checkValidity()) {
          el.classList.add("is-valid");
          el.classList.remove("is-invalid");
          if (el.id === "register-password") {
            pwdGroup.classList.remove("is-invalid");
            pwdGroup.classList.add("is-valid");
          }
        } else {
          el.classList.add("is-invalid");
          el.classList.remove("is-valid");
          if (el.id === "register-password") {
            pwdGroup.classList.add("is-invalid");
            pwdGroup.classList.remove("is-valid");
          }
        }
      }
    });

    if (form.checkValidity()) {
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;
      const submitBtn = form.querySelector("button[type=\"submit\"]");
      const oldBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${msg("Register...")}`;

      try {
        const data = await registerUser({ name, email, password });
        if (!data.error) {
          toast.show(msg("Register berhasil! Silakan login."), "success", 2000);
          setTimeout(() => {
            window.location.hash = "login";
          }, 1100);
        } else {
          const errorMsg = errorMap[data.message] || msg("Register gagal");
        }
      } catch (err) {
        toast.show(err?.response?.data?.message || msg("Register gagal"), "error", 2500);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = oldBtnHTML;
      }
    } else {
      form.classList.add("was-validated");
    }
  });

  main.querySelector("#to-login-link").onclick = (e) => {
    e.preventDefault();
    window.location.hash = "login";
  };
}
