const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

const Video = require('../../models/video');

describe('Video', ()=>{
  describe('title', ()=>{
    it('should be a string', ()=>{
      const nonString = 99;
      const video = new Video({title: nonString});

      assert.strictEqual(video.title, nonString.toString());
    })

    it('should be required', ()=>{
      const video = new Video({description: 'a description'});
      video.validateSync();
      assert.equal(video.errors.title.message, 'Path `title` is required.');
    })
  })

  describe('description', ()=>{
    it('should be a string', ()=>{
      const nonString = 99;
      const video = new Video({description: nonString});

      assert.strictEqual(video.description, nonString.toString());
    })
  })

  describe('url', ()=>{
    it('should be a string', ()=>{
      const nonString = 99;
      const video = new Video({url: nonString});

      assert.strictEqual(video.url, nonString.toString());
    })
    it('should be required', ()=>{
      const video = new Video({title: 'a title', description: 'a description'});
      video.validateSync();
      assert.equal(video.errors.url.message, 'Path `url` is required.');
    })
  })
})