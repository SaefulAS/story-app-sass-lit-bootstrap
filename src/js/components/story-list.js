import { LitElement, html } from 'lit';
import './story-card.js';

class StoryList extends LitElement {
  static properties = { stories: { type: Array } };
  createRenderRoot() { return this; }

  constructor() {
    super();
    this.stories = [];
  }

  render() {
    return html`
      <div class="row g-4">
        ${this.stories.length === 0
          ? html`
            <div class="col-12">
              <div class="alert alert-info">Belum ada cerita.</div>
            </div>
          `
          : this.stories.map(story => html`
            <div class="col-sm-6 col-md-4 col-lg-3">
              <story-card
                .name=${story.name}
                .photoUrl=${story.photoUrl}
                .description=${story.description}
                .createdAt=${story.createdAt}
              ></story-card>
            </div>
          `)}
      </div>
    `;
  }
}
customElements.define('story-list', StoryList);