import { currentLocale } from './locales';

export function formatDate(dateString) {
  let locale = currentLocale;
  if (locale === "ja") locale = "ja-JP";
  if (locale === "en") locale = "en-US";
  if (locale === "id") locale = "id-ID";
  return new Date(dateString).toLocaleDateString(locale, {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

export function setActiveNav(navButtons, btn) {
  navButtons.forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
}
