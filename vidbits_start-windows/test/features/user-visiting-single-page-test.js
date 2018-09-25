const {assert} = require('chai');
const {buildVideoObject, createVideo} = require('../test-utils.js');

describe('user visits single page', ()=>{
    describe('with a video on db', ()=>{
        it('should be able to navigate to landing page', ()=>{
            
            const newVideo = buildVideoObject();
            
            createVideo(newVideo);

            browser.click('.title-logo a');
            
            assert.include(browser.getUrl(), '/videos');
        })
    })
})