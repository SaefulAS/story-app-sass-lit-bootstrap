import { LitElement, html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

class AddStoryForm extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form
        id="add-story-form"
        class="needs-validation d-flex flex-column gap-2 mx-auto mt-3"
        style="max-width: 380px;"
        novalidate
        autocomplete="off"
      >
        <div class="mb-3">
          <label for="name" class="form-label">${msg("Nama")}</label>
          <input
            type="text"
            name="name"
            id="name"
            class="form-control"
            required
            placeholder="${msg("Nama user")}"
          />
          <div class="invalid-feedback">${msg("Nama wajib diisi!")}</div>
        </div>
        <div class="mb-3">
          <label for="photo" class="form-label">${msg("Foto")}</label>
          <input
            type="file"
            name="photo"
            id="photo"
            class="form-control"
            required
            accept="image/*"
          />
          <div class="invalid-feedback">${msg("Foto wajib diunggah!")}</div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">${msg("Deskripsi")}</label>
          <textarea
            name="description"
            id="description"
            class="form-control"
            rows="3"
            required
            placeholder="${msg("Tuliskan cerita...")}"
          ></textarea>
          <div class="invalid-feedback">${msg("Deskripsi wajib diisi!")}</div>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3">${msg("Tambah Story")}</button>
      </form>
    `;
  }
}
customElements.define("add-story-form", AddStoryForm);
