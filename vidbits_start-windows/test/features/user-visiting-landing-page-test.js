const {assert} = require('chai');

const {buildVideoObject, createVideo} = require('../test-utils.js')


describe('User visits landing page', ()=>{
    describe('with no videos', ()=>{
        it('should display an empty container', ()=>{
            //setup
            browser.url('/videos');

            //verify
            assert.equal(browser.getText('#videos-container'), '')
        })
    })
    describe('with or without videos user can navigate to create new', ()=>{
        it('should navigate to save a video page ', ()=>{
            //setup
            browser.url('/videos');

            //exercise 
            browser.click('#add-button');

            //verify
            assert.include(browser.getText('body'), 'Save a video')
        })
    })

    describe('with existing video', ()=>{
        it('renders the video', ()=>{
            //setup
            const newVideo = buildVideoObject();
            
            createVideo(newVideo);

            browser.url('/videos');

            assert.include(browser.getAttribute('.video-player', 'src'), newVideo.url);

        
        })
    })

})