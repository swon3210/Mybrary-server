const express = require('express');

const userController = require('../controllers/user');
const bookController = require('../controllers/book');
const bookShelfController = require('../controllers/book_shelf');
const libraryController = require('../controllers/library');
const postController = require('../controllers/post');


const router = express.Router();

// ------------- USER

// 모든 사용자들의 정보를 불러옵니다
router.get('/users', userController.getUsers);

// 특정 사용자의 정보를 찾아서 불러옵니다
router.get('/user/:userIdx', userController.findUser);


// ------------- Library

// 사용자의 도서관의 정보를 불러옵니다
router.get('/library/:userIdx', libraryController.getLibrary);

// 사용자의 도서관을 제정합니다
router.post('/library/create', libraryController.createLibrary);

// 사용자의 도서관의 정보를 업데이트 합니다
router.put('/library/:idx', libraryController.updateLibrary
);


// ------------- BOOKSHELF

// 사용자의 도서관에 있는 모든 책장을 불러옵니다
router.get('/bookShelves/:libraryIdx', bookShelfController.getBookShelves);

// 전체 책장들 중에서 검색 조건을 만족하는 책장을 불러옵니다
router.get('/bookShelves/search?name=name',bookShelfController.searchBookShelves);

// 사용자의 도서관에 새로운 책장을 저장합니다
router.post('/bookShelf/create', bookShelfController.createBookShelf);

// 사용자의 도서관에 있는 특정한 책장의 정보를 업데이트 합니다
router.put('/bookShelf/update', bookShelfController.updateBookShelf);

// 사용자의 도서관에 있는 특정한 책장을 지웁니다.
router.delete('/bookShelf/delete/:idx', bookShelfController.deleteBookShelf);

// ------------- BOOK

// 사용자의 도서관의 특정 책장에서 모든 책들을 불러옵니다
router.get('/books/:bookShelfIdx', bookController.getBooks);

// 외부의 책들 중 조건을 만족하는 책을 검색합니다
router.get('/books/find', bookController.findBooks);

// 책을 새로 사용자의 도서관의 책장에 저장합니다
router.post('/book/add', bookController.addBook);









// ------------- POST

// 모든 글들을 가져옵니다
router.get('/posts', postController.getPosts);

// 특정 사용자의 글을 가져옵니다
router.get('/posts/:idx', postController.findPost);

// 특정 사용자의 글을 추가합니다. 
router.post('/post/add', postController.addPost);


module.exports = router;