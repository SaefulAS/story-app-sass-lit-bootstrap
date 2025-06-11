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
      function (e) {
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
          let photoUrl = "";
          if (photoFile && photoFile.size > 0) {
            photoUrl = URL.createObjectURL(photoFile);
          }

          addStory({
            id: `story-${Date.now()}`,
            name: fd.get("name").trim(),
            photo: photoFile,
            photoUrl,
            description: fd.get("description").trim(),
            createdAt: new Date().toISOString(),
          });

          toast.style.display = "";
          setTimeout(() => {
            toast.style.display = "none";
            window.location.hash = "dashboard";
          }, 1000);
        }
      },
      false
    );
  }

  waitForFormAndInit();
}
