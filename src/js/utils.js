import { getLocale } from "./localization.js";

const localeMap = {
  id: "id-ID",
  en: "en-US",
  ja: "ja-JP",
};

export function formatDate(dateString) {
  const lang = getLocale();
  const locale = localeMap[lang] || "id-ID";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function setActiveNav(navButtons, btn) {
  navButtons.forEach((el) => el.classList.remove("active"));
  btn.classList.add("active");
}
