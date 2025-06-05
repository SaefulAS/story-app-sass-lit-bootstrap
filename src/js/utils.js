export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

export function setActiveNav(navButtons, btn) {
  navButtons.forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
}
