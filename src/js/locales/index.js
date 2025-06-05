import id from "./id";
import en from "./en";
import ja from "./ja";

const locales = { id, en, ja };

export let currentLocale = localStorage.getItem("locale") || "id";

export function setLocale(locale) {
  currentLocale = locale;
  localStorage.setItem("locale", locale);
  document.dispatchEvent(new CustomEvent("locale-changed", { detail: locale }));
}

export function t(key) {
  return locales[currentLocale]?.[key] || key;
}
