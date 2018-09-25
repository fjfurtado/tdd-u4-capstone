const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {connectDatabase, disconnectDatabase} = require('../setup-teardown-utils');

const {parseTextFromHTML, buildVideoObject, seedVideoToDatabase} = require('../test-utils.js')

const Video = require('../../models/video');

describe('/videos/:id/update', ()=>{

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase);

    describe('POST', ()=>{
        it('updates the record', async ()=>{
            const newVideo = await seedVideoToDatabase();
            
            const newTitle = 'a new title';
            //setup
            const response = await request(app)
                            .post(`/videos/${newVideo._id}/update`)
                            .type('form')
                            .send({title: newTitle, 
                                url: newVideo.url,
                                description: newVideo.description});
            const video = await Video.findOne({})
            assert.equal(video.title, newTitle);
        })

        it('redirects correctly', async ()=>{
            const newVideo = await seedVideoToDatabase();
            
            const newTitle = 'a new title';
            //setup
            const response = await request(app)
                            .post(`/videos/${newVideo._id}/update`)
                            .type('form')
                            .send({title: newTitle, 
                                url: newVideo.url,
                                description: newVideo.description});

            assert.equal(response.status, 302);
            assert.equal(response.headers.location, `/videos/${newVideo._id}`);
        })

        it('does not update with invalid data', async ()=>{
            const newVideo = await seedVideoToDatabase();
            
            //setup
            const response = await request(app)
                            .post(`/videos/${newVideo._id}/update`)
                            .type('form')
                            .send({url: newVideo.url,
                                description: newVideo.description});
            
            assert.equal(response.status, 400);
            assert.equal(parseTextFromHTML(response.text, '.error'), 'Path `title` is required.');
            
        })
    })
})

describe('/videos/:id/delete', ()=>{

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase);

    describe('with existing video', ()=>{
        it('sucessfully deletes the video', async ()=>{
            const newVideo = await seedVideoToDatabase();
            
            //setup
            const response = await request(app)
                            .post(`/videos/${newVideo._id}/delete`)
                            .type('form')
                            .send();
            
            assert.equal(response.status, 302);
            assert.equal(response.headers.location, '/videos');
        })
    })
})