const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');

const router = express.Router();

// 전체 URL은 /feed/posts
router.get('/posts', feedController.getPosts);


// 배열은 미들웨어
// /feed/post
router.post('/post', [
  body('title')
    .trim()
    .isLength({min: 5}),
  body('content')
    .trim()
    .isLength({min: 5})
], feedController.addPost);



module.exports = router;
