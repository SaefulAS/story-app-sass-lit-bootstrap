import { getStories } from "./data";
import { formatDate, setActiveNav } from "./utils";
import { getLocale } from "./localization";
import { msg } from "@lit/localize";

export default async function renderDashboard(main, navDashboard, navButtons) {
  setActiveNav(navButtons, navDashboard);

  main.innerHTML = `
    <section class="section-content">
      <loading-spinner></loading-spinner>
    </section>
  `;

  let currentPage = 1;
  const pageSize = 12;
  let isLastPage = false;

  async function loadStories(page) {
    main.innerHTML = `
      <section class="section-content">
        <story-list></story-list>
        <div class="pagination-container mt-4 d-flex justify-content-center"></div>
      </section>
    `;

    const stories = await getStories({ page, size: pageSize });
    const lang = getLocale();

    isLastPage = stories.length < pageSize;

    const storyList = main.querySelector("story-list");
    storyList.stories = stories.map((s) => ({
      ...s,
      name: typeof s.name === "object" ? s.name[lang] || s.name["id"] : s.name,
      description:
        typeof s.description === "object"
          ? s.description[lang] || s.description["id"]
          : s.description,
      createdAt: formatDate(s.createdAt),
    }));

    const paginationDiv = main.querySelector(".pagination-container");
    paginationDiv.innerHTML = `
      <button class="btn btn-outline-primary me-2" id="prev-page" ${page <= 1 ? "disabled" : ""}>
        &laquo; ${msg("Sebelumnya")}
      </button>
      <span class="mx-2">Page ${page}</span>
      <button class="btn btn-outline-primary ms-2" id="next-page" ${isLastPage ? "disabled" : ""}>
       ${msg("Selanjutnya")} &raquo;
      </button>
    `;

    paginationDiv.querySelector("#prev-page").onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        loadStories(currentPage);
      }
    };
    paginationDiv.querySelector("#next-page").onclick = () => {
      if (!isLastPage) {
        currentPage++;
        loadStories(currentPage);
      }
    };
  }

  loadStories(currentPage);
}
