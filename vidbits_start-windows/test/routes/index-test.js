const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../setup-teardown-utils');

const Video = require('../../models/video');

const {seedVideoToDatabase, parseTextFromHTML} = require('../test-utils')

describe('server path /', ()=>{

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase)

    describe('GET request', ()=>{
        it('existing videos should render correctly', async ()=>{
            //setup
            const video = await seedVideoToDatabase();

            //exercise
            const response = await request(app).get('/videos').send();

            //verify
            assert.include(parseTextFromHTML(response.text, '.video-title'), video.title);
        })
    })
})