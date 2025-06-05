import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../sass/main.scss';

import './components/navbar-app.js';
import './components/story-list.js';
import './components/story-card.js';
import './components/add-story-form.js';
import './components/success-toast.js';

import renderDashboard from './dashboard';
import renderAddForm from './storyForm';


const main = document.querySelector('main');
const navDashboard = document.getElementById('nav-dashboard');
const navAdd = document.getElementById('nav-add');
const navButtons = [navDashboard, navAdd];

// Routing function
function handleRoute() {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'add-story') {
    renderAddForm(main, navAdd, navButtons);
  } else {
    // default: dashboard
    renderDashboard(main, navDashboard, navButtons);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const navbar = document.querySelector('navbar-app');
  const navDashboard = navbar.querySelector('#nav-dashboard');
  const navAdd = navbar.querySelector('#nav-add');
  const navButtons = [navDashboard, navAdd];

  function handleRoute() {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'add-story') {
      renderAddForm(main, navAdd, navButtons);
    } else {
      renderDashboard(main, navDashboard, navButtons);
    }
  }

  navDashboard.addEventListener('click', () => {
    window.location.hash = 'dashboard';
  });
  navAdd.addEventListener('click', () => {
    window.location.hash = 'add-story';
  });

  window.addEventListener('hashchange', handleRoute);

  // First load
  if (!window.location.hash || window.location.hash === '#') {
    window.location.hash = 'dashboard';
  } else {
    handleRoute();
  }
});
