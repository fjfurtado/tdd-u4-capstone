const router = require('express').Router();
const Video = require('../models/video')

router.get('/videos', async (req, res, next)=>{
    const videos = await Video.find({}) 
    res.render('index', {videos});
})

router.get('/videos/create', (req, res, next)=>{
    res.render('create');
})

router.post('/videos/create', async (req, res)=>{
    const newVideo = new Video(req.body);
    newVideo.validateSync();
    if (newVideo.errors){
        res.status(400).render('create', {video: newVideo})
    }else{
        await newVideo.save();
        res.status(201).redirect(`/videos/${newVideo._id}`);
    }
    
})

router.get('/videos/:id', async (req, res)=>{
    const video = await Video.findOne({_id: req.params.id});
    res.render('single', {video: video});
})

router.get('/videos/:id/edit', async (req, res)=>{
    const video = await Video.findOne({_id: req.params.id});
    res.render('edit', {video: video});
})

router.post('/videos/:id/update', async (req, res)=>{
    const testVideo = new Video(req.body)
    testVideo.validateSync();
    if (testVideo.errors){
        res.status(400).render('edit', {video: testVideo})
    }else{
        await Video.updateOne({_id: req.params.id}, req.body);
        const video = await Video.findOne({_id: req.params.id});

        res.redirect(`/videos/${req.params.id}`);
    }
    
})

router.post('/videos/:id/delete', async (req, res)=>{
    await Video.deleteOne({_id: req.params.id});
    res.redirect(`/videos`);
})

module.exports = router;