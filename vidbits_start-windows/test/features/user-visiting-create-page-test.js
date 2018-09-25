const {assert} = require('chai');
const {createVideo, buildVideoObject} = require('../test-utils.js')


describe('User visits create page', ()=>{
    describe('with valid inputs', ()=>{
        it('should create a new video and redirect to /videos/:id', ()=>{
            //setup

            const newVideo = buildVideoObject();
            createVideo(newVideo);

            //verify
            assert.include(browser.getText('#video-title'), newVideo.title);
        })
    })

    describe('with missing title', ()=>{
        it('shows error message', ()=>{
            
            createVideo({description: 'this is a new video described here', url: 'a url'});
            //verify
            assert.include(browser.getText('.error'), 'Path `title` is required.');

        })
        it('preserves values', ()=>{
            const newVideo = {description: 'a descriptoion', url: 'a url'};
            createVideo(newVideo);
            
            //verify
            assert.include(browser.getText('#description-input'), newVideo.description);
            assert.include(browser.getAttribute('#url-input', 'value'), newVideo.url);

        })
    })

    describe('with missing url', ()=>{
        it('shows error message', ()=>{
            createVideo({description: 'this is a new video described here', title: 'a titel .. '});
            
            //verify
            assert.include(browser.getText('.error'), 'Path `url` is required.');
        })
    })
    
})