import { loginUser } from "../api/authApi";

export default function renderLogin(main) {
  if (window.location.hash !== "#login") window.location.hash = "login";

  main.innerHTML = `
    <section class="section-content d-flex flex-column align-items-center justify-content-center" style="min-height: 80vh;">
      <form id="login-form" class="needs-validation p-4 rounded shadow" style="max-width: 380px; width:100%; background: #fff" novalidate autocomplete="off">
        <h2 class="mb-4 text-center">Login</h2>
        <div class="mb-3">
          <label for="login-email" class="form-label">Email</label>
          <input type="email" class="form-control" id="login-email" name="email" required placeholder="Masukkan email" />
          <div class="invalid-feedback">Email wajib diisi!</div>
        </div>
        <div class="mb-3 position-relative">
          <label for="login-password" class="form-label">Password</label>
          <div class="input-group">
            <input type="password" class="form-control" id="login-password" name="password" required placeholder="Password" minlength="8" />
            <span class="input-group-text" id="toggle-login-password" style="cursor:pointer;">
              <i class="fa fa-eye"></i>
            </span>
          </div>
          <div class="invalid-feedback">Password minimal 8 karakter!</div>
        </div>
        <div id="login-error" class="text-danger mb-2" style="display:none;"></div>
        <button type="submit" class="btn btn-primary w-100 mt-3">Login</button>
        <p class="mt-3 mb-0 text-center">Belum punya akun? <a href="#register" id="to-register-link">Register</a></p>
      </form>
    </section>
  `;

  // Show/hide password
  const pwdInput = main.querySelector("#login-password");
  const togglePwd = main.querySelector("#toggle-login-password");
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
  const form = main.querySelector("#login-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity()) {
      const email = form.email.value.trim();
      const password = form.password.value;
      try {
        const data = await loginUser({ email, password });
        if (!data.error) {
          localStorage.setItem("access_token", data.loginResult.token);
          localStorage.setItem("user_name", data.loginResult.name);
          window.location.hash = "dashboard";
          window.location.reload(); // Reload biar navbar juga update tombol logout
        } else {
          showError(data.message);
        }
      } catch (err) {
        showError(err?.response?.data?.message || "Login gagal");
      }
    } else {
      form.classList.add("was-validated");
    }
  });

  function showError(msg) {
    const errDiv = main.querySelector("#login-error");
    errDiv.style.display = "";
    errDiv.textContent = msg;
  }

  main.querySelector("#to-register-link").onclick = (e) => {
    e.preventDefault();
    window.location.hash = "register";
  };
}
