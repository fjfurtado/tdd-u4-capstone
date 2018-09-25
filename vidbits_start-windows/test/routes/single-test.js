const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../setup-teardown-utils');

const {parseTextFromHTML, seedVideoToDatabase} = require('../test-utils.js')

const Video = require('../../models/video');


describe('/videos/:id', ()=>{

    beforeEach(connectDatabase)
    afterEach(disconnectDatabase)

    describe('given a valid id for an existing video', ()=>{
        it('should render single page correctly', async ()=>{
            const video = await seedVideoToDatabase();
            const response = await request(app).get(`/videos/${video._id}`).send();

            assert.include(parseTextFromHTML(response.text, '#video-title'), video.title);
            assert.equal(parseTextFromHTML(response.text, 'iframe', 'src'), video.url);
            assert.include(parseTextFromHTML(response.text, '#video-description'), video.description);
        })
    })
})

describe('/videos/:id/edit', ()=>{
    beforeEach(connectDatabase)
    afterEach(disconnectDatabase)

    describe('given a valid id for an existing video', ()=>{
        it('should display the form with the video properties', async ()=>{
            const video = await seedVideoToDatabase();
            const response = await request(app).get(`/videos/${video._id}/edit`).send();

            assert.include(parseTextFromHTML(response.text, '#title-input', 'value'), video.title);
            assert.include(parseTextFromHTML(response.text, '#description-input'), video.description);
            assert.include(parseTextFromHTML(response.text, '#url-input', 'value'), video.url);
        })
    })

})