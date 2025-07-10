import { LitElement, html } from "lit";
import { getLocale, setLocale } from "../localization.js";
import { updateWhenLocaleChanges } from "@lit/localize";

const localeNames = {
  id: "Indonesia",
  en: "English",
  ja: "日本語",
};

class LocalePicker extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const current = getLocale();
    return html`
      <select
        class="form-select form-select-sm"
        style="width:auto; display:inline-block; vertical-align:middle;"
        @change=${this._onChange}
      >
        ${Object.keys(localeNames).map(
          (locale) =>
            html`<option value="${locale}" ?selected=${current === locale}>
              ${localeNames[locale]}
            </option>`
        )}
      </select>
    `;
  }

  async _onChange(e) {
    await setLocale(e.target.value);
    window.dispatchEvent(new CustomEvent("locale-changed"));
  }
}
customElements.define("locale-picker", LocalePicker);
