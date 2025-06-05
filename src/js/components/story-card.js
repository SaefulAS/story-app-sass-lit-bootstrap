import { LitElement, html, css } from 'lit';

class StoryCard extends LitElement {
  static properties = {
    name: {}, photoUrl: {}, description: {}, createdAt: {}
  };
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .card {
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.08);
      overflow: hidden;
      background: #fff;
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: transform .15s, box-shadow 0.15s;
    }
    .card:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 8px 28px rgba(57,73,171,0.13);
    }
    img { width: 100%; height: 180px; object-fit: cover; background: #ddd; }
    .card-body { padding: 1rem; flex: 1; display: flex; flex-direction: column; gap: .6rem; }
    .card-title { margin: 0 0 .3rem; font-size: 1.11rem; color: #3949ab; font-weight: 600; }
    .card-text { margin: 0 0 .3rem; font-size: .98rem; color: #333; }
    .text-muted { color: #888; font-size: .85rem; }
  `;
  render() {
    return html`
      <div class="card story-card h-100">
        <img src="${this.photoUrl}" alt="${this.name}" />
        <div class="card-body story-card-body">
          <h3 class="card-title">${this.name}</h3>
          <p class="card-text">${this.description}</p>
          <small class="text-muted">${this.createdAt}</small>
        </div>
      </div>
    `;
  }
}
customElements.define('story-card', StoryCard);