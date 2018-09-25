const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../setup-teardown-utils');

const {parseTextFromHTML, buildVideoObject} = require('../test-utils.js')

const Video = require('../../models/video');

describe('server path /videos/create', ()=>{

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase);

    describe('POST request', ()=>{
        it('the video should be saved in database', async ()=>{
            //setup
            const newVideo = buildVideoObject();

            //setup
            const response = await request(app)
                            .post('/videos/create')
                            .type('form')
                            .send(newVideo);

            //verify
            const videoFromDb = await Video.findOne({});
            assert.equal(videoFromDb.title, newVideo.title);
            assert.equal(videoFromDb.url, newVideo.url);
            assert.equal(videoFromDb.description, newVideo.description);
        })
        it('should not save with missing title', async ()=>{
            const response = await request(app)
                .post('/videos/create')
                .type('form')
                .send({description: 'a description', url: 'a url'});

            //verify
            assert.include(parseTextFromHTML(response.text, '.error'), 'Path `title` is required.')
        })

        it('should return 400 error', async ()=>{
            const response = await request(app)
                .post('/videos/create')
                .type('form')
                .send({description: 'a description', url: 'a url'});

            //verify
            assert.equal(response.status, 400)
        })
    })
})