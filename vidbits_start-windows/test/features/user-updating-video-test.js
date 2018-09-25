const {assert} = require('chai');
const {createVideo, buildVideoObject} = require('../test-utils.js')

describe('user visits update page', ()=>{
    describe('updating a video with valid data', ()=>{
        it('changes values', ()=>{
            createVideo(buildVideoObject());
            const newTitle = 'a new title'

            browser.click('#edit-button');

            browser.setValue('#title-input', newTitle);

            browser.click('input[type=submit]');

            assert.equal(browser.getText('#video-title'), newTitle);
        })

        it('does not create a new video', ()=>{
            const video = buildVideoObject();
            createVideo(video);
            const newTitle = 'a new title'

            browser.click('#edit-button');

            browser.setValue('#title-input', newTitle);

            browser.click('input[type=submit]');

            browser.url('/videos');

            assert.notInclude(browser.getText('.video-title'), video.title);
        })
    })

})