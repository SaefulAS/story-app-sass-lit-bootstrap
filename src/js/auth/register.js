import { registerUser } from "../api/authApi";

export default function renderRegister(main) {
  if (window.location.hash !== "#register") window.location.hash = "register";

  main.innerHTML = `
    <section class="section-content d-flex flex-column align-items-center justify-content-center" style="min-height: 80vh;">
      <form id="register-form" class="needs-validation p-4 rounded shadow" style="max-width: 380px; width:100%; background: #fff" novalidate autocomplete="off">
        <h2 class="mb-4 text-center">Register</h2>
        <div class="mb-3">
          <label for="register-name" class="form-label">Nama</label>
          <input type="text" class="form-control" id="register-name" name="name" required placeholder="Nama lengkap" />
          <div class="invalid-feedback">Nama wajib diisi!</div>
        </div>
        <div class="mb-3">
          <label for="register-email" class="form-label">Email</label>
          <input type="email" class="form-control" id="register-email" name="email" required placeholder="Email aktif" />
          <div class="invalid-feedback">Email wajib diisi!</div>
        </div>
        <div class="mb-3 position-relative">
          <label for="register-password" class="form-label">Password</label>
          <div class="input-group">
            <input type="password" class="form-control" id="register-password" name="password" required minlength="8" placeholder="Password minimal 8 karakter" />
            <span class="input-group-text" id="toggle-register-password" style="cursor:pointer;">
              <i class="fa fa-eye"></i>
            </span>
          </div>
          <div class="invalid-feedback">Password minimal 8 karakter!</div>
        </div>
        <div id="register-error" class="text-danger mb-2" style="display:none;"></div>
        <button type="submit" class="btn btn-primary w-100 mt-3">Register</button>
        <p class="mt-3 mb-0 text-center">Sudah punya akun? <a href="#login" id="to-login-link">Login</a></p>
      </form>
    </section>
  `;

  // Show/hide password
  const pwdInput = main.querySelector("#register-password");
  const togglePwd = main.querySelector("#toggle-register-password");
  togglePwd.addEventListener("click", () => {
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      togglePwd.innerHTML = `<i class="fa fa-eye-slash"></i>`;
    } else {
      pwdInput.type = "password";
      togglePwd.innerHTML = `<i class="fa fa-eye"></i>`;
    }
  });

  // Form submit
  const form = main.querySelector("#register-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity()) {
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;
      try {
        const data = await registerUser({ name, email, password });
        if (!data.error) {
          alert("Register berhasil! Silakan login.");
          window.location.hash = "login";
        } else {
          showError(data.message);
        }
      } catch (err) {
        showError(err?.response?.data?.message || "Register gagal");
      }
    } else {
      form.classList.add("was-validated");
    }
  });

  function showError(msg) {
    const errDiv = main.querySelector("#register-error");
    errDiv.style.display = "";
    errDiv.textContent = msg;
  }

  main.querySelector("#to-login-link").onclick = (e) => {
    e.preventDefault();
    window.location.hash = "login";
  };
}
