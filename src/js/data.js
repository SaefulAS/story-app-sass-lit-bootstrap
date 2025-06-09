import data from '../data/data.json';
import { getLocale } from './localization.js';

export function getStories() {
  const lang = getLocale();
  return (data.listStory || []).map(story => ({
    ...story,
    name: typeof story.name === "object" ? (story.name[lang] || story.name["id"]) : story.name,
    description: typeof story.description === "object" ? (story.description[lang] || story.description["id"]) : story.description
  }));
}

export function addStory(story) {
  const entry = {
    ...story,
    name: { id: story.name, en: story.name, ja: story.name },
    description: { id: story.description, en: story.description, ja: story.description },
  };
  data.listStory.unshift(entry);
}
