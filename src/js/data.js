import data from '../data/data.json';

let stories = data.listStory || [];

export function getStories() {
  return stories;
}
export function addStory(story) {
  stories.unshift(story);
}
