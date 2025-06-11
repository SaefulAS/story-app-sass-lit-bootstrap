import { getStories } from "./data";
import { formatDate, setActiveNav } from "./utils";

export default function renderDashboard(main, navDashboard, navButtons) {
  setActiveNav(navButtons, navDashboard);

  main.innerHTML = `
    <section class="section-content">
      <story-list></story-list>
    </section>
  `;

  const storyList = main.querySelector('story-list');
  const stories = getStories();
  storyList.stories = stories.map(s => ({
    ...s,
    createdAt: formatDate(s.createdAt)
  }));
}
