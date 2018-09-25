const {assert} = require('chai');
const {createVideo, buildVideoObject} = require('../test-utils.js')

describe('user deleting video', ()=>{
    describe('with an existing video', ()=>{
        it('removes video from list', ()=>{
            createVideo(buildVideoObject());

            browser.click('#delete-button');

            assert.equal(browser.getText('#videos-container'), '');
        });
    });
});