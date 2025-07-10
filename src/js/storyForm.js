import { msg } from "@lit/localize";
import { addStory } from "./data";
import { setActiveNav } from "./utils";

export default function renderAddForm(main, navAdd, navButtons) {
  setActiveNav(navButtons, navAdd);
  main.innerHTML = `
    <section class="section-content position-relative">
      <success-toast style="display:none"></success-toast>
      <h2 class="mb-4">${msg("Tambah Cerita")}</h2>
      <add-story-form></add-story-form>
    </section>
  `;

  function waitForFormAndInit(retry = 0) {
    const form = document.getElementById("add-story-form");
    const toast = main.querySelector("success-toast");

    if (!form) {
      if (retry < 10) setTimeout(() => waitForFormAndInit(retry + 1), 50);
      return;
    }

    Array.from(form.elements).forEach((el) => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.addEventListener("blur", function () {
          if (el.checkValidity()) {
            el.classList.add("is-valid");
            el.classList.remove("is-invalid");
          } else {
            el.classList.add("is-invalid");
            el.classList.remove("is-valid");
          }
        });
        el.addEventListener("input", function () {
          if (el.checkValidity()) {
            el.classList.add("is-valid");
            el.classList.remove("is-invalid");
          } else {
            el.classList.add("is-invalid");
            el.classList.remove("is-valid");
          }
        });
      }
    });

    form.addEventListener(
      "submit",
      async function (e) {
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
          const fd = new FormData(form);
          const photoFile = fd.get("photo");

          if (!(photoFile instanceof File) || photoFile.size === 0) {
            toast.innerText = "Foto wajib diunggah!";
            toast.style.display = "";
            setTimeout(() => {
              toast.style.display = "none";
            }, 1500);
            return;
          }

          const submitBtn = form.querySelector("button[type=\"submit\"]");
          const oldBtnHTML = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${msg(
            "Menambah..."
          )}`;

          try {
            const result = await addStory({
              description: fd.get("description").trim(),
              photo: photoFile,
            });
            if (result.error) {
              toast.innerText = result.message || "Gagal tambah story";
              toast.style.display = "";
              setTimeout(() => {
                toast.style.display = "none";
              }, 2000);
              return;
            }
            toast.innerText = "Story berhasil ditambahkan!";
            toast.style.display = "";
            setTimeout(() => {
              toast.style.display = "none";
              window.location.hash = "dashboard";
            }, 1000);
          } catch (error) {
            toast.innerText = error.message || "Gagal tambah story";
            toast.style.display = "";
            setTimeout(() => {
              toast.style.display = "none";
            }, 2000);
          } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = oldBtnHTML;
          }
        }
      },
      false
    );
  }

  waitForFormAndInit();
}
