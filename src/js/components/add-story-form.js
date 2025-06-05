import { LitElement, html } from 'lit';
import { t } from '../locales';

class AddStoryForm extends LitElement {
  createRenderRoot() { return this; }

  render() {
    return html`
      <form id="add-story-form"
        class="needs-validation d-flex flex-column gap-2 mx-auto mt-3"
        style="max-width: 380px;" novalidate autocomplete="off">
        <div class="mb-3">
          <label for="name" class="form-label">${t("name")}</label>
          <input type="text" name="name" id="name" class="form-control" required placeholder="${t("name")}" />
          <div class="invalid-feedback">${t("nameRequired")}</div>
        </div>
        <div class="mb-3">
          <label for="photoUrl" class="form-label">${t("photoUrl")}</label>
          <input type="url" name="photoUrl" id="photoUrl" class="form-control" required placeholder="https://..." />
          <div class="invalid-feedback">${t("urlRequired")}</div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">${t("description")}</label>
          <textarea name="description" id="description" class="form-control" rows="3" required placeholder="${t("storyDescPlaceholder")}"></textarea>
          <div class="invalid-feedback">${t("descRequired")}</div>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-3">${t("addStoryBtn")}</button>
      </form>
    `;
  }
}
customElements.define('add-story-form', AddStoryForm);
