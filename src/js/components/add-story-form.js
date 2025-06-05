import { LitElement, html } from 'lit';

class AddStoryForm extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <form id="add-story-form"
        class="needs-validation d-flex flex-column gap-2 mx-auto mt-3"
        style="max-width: 380px;" novalidate autocomplete="off">
        <div class="mb-3">
          <label for="name" class="form-label">Nama</label>
          <input type="text" name="name" id="name" class="form-control" required placeholder="Nama user"/>
          <div class="invalid-feedback">Nama wajib diisi!</div>
        </div>
        <div class="mb-3">
          <label for="photoUrl" class="form-label">URL Foto</label>
          <input type="url" name="photoUrl" id="photoUrl" class="form-control" required placeholder="https://..."/>
          <div class="invalid-feedback">URL wajib diisi!</div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Deskripsi</label>
          <textarea name="description" id="description" class="form-control" rows="3" required placeholder="Tuliskan cerita..."></textarea>
          <div class="invalid-feedback">Deskripsi wajib diisi!</div>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3">Tambah Story</button>
      </form>
    `;
  }
}
customElements.define('add-story-form', AddStoryForm);