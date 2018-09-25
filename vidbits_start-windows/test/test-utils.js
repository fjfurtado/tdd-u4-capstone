const Video = require('../models/video')
const {jsdom} = require('jsdom');

// Create and return a sample Item object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'My favorite video';
  const url = options.url || 'https://www.youtube.com/embed/hcThTMk3SFk';
  const description = options.description || 'Just the best video';
  return {title, url, description};
};

// Add a sample Item object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector, attribute) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    if (attribute)
      return selectedElement.getAttribute(attribute);
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

const createVideo = (newVideo)=>{

  browser.url('/videos/create');
  if (newVideo.description)
    browser.setValue('textarea[id=description-input]', newVideo.description);
  if (newVideo.title)
    browser.setValue('input[id=title-input]', newVideo.title);
  if (newVideo.url)
    browser.setValue('input[id=url-input]', newVideo.url);
  browser.click('input[type=submit]');
}

module.exports = {
  buildVideoObject,
  seedVideoToDatabase,
  parseTextFromHTML,
  createVideo
};