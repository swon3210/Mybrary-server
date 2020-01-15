const Book = require('../models/book');
const BookShelf = require('../models/book_shelf');


// 네이버 검색 API
const clientId = 'o4HY4geY37qR_mJopk_o';
const clientSecret = '3zmjXCI44f';

// 카카오 검색 API
const kakaoAPIKey = 'c2b1e561719d5ebaa23081c3e8e48fee';

// 패키지 IMPORT
const rp = require('request-promise');


exports.getBooks = (req, res) => {
  
  const bookShelfIdx = req.params.bookShelfIdx;

  BookShelf.findAll({
    where: {
      id: bookShelfIdx
    },
    include: [{
      model: Book,
      through: {
        attributes: ['title', 'description'],
      },
      
    }]
  })
    .then(books => {
      res.status(200).send(books);
    })
    .catch(err => {
      console.log(err);
    })
}

exports.searchBooks = (req, res) => {

  // ----- 카카오 책 검색

  const query = req.query.query;

  const api_url = `https://dapi.kakao.com/v3/search/book?query=${encodeURI(query)}`

  const options = {
    uri: api_url,
    headers: {
      'Authorization': `KakaoAK ${kakaoAPIKey}`
    }
  }

  rp(options)
    .then(body => {
      res.status(200).send(body);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end()
    })



  // ----- 네이버 책 검색

  // const query = req.query.query;
  // const display = req.query.display;
  // const start = req.query.start;

  // const api_url = `https://openapi.naver.com/v1/search/book.json?query=${encodeURI(query)}&display=${display}&start=${start}`;

  // const options = {
  //   uri: api_url,
  //   headers: {
  //     'X-Naver-Client-Id': clientId, 
  //     'X-Naver-Client-Secret': clientSecret
  //   }
  // };

  // rp(options)
  //   .then(body => {
  //     res.status(200).send(body);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(406).end();
  //   });
}


exports.addBook = (req, res) => {

  const bookShelfIdx = req.body.bookShelfIdx;
  const addingTitle = req.body.title;
  const addingDescription = req.body.description;

  let fetchedBook;

  Book.create({
    title: addingTitle,
    description: addingDescription
  })
    .then(book => {
      fetchedBook = book;
      return BookShelf.findByPk(bookShelfIdx);
    })  
    .then(bookShelf => {
      return bookShelf.addBook(fetchedBook);
    })
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      res.status(500).end();
      console.log(err);
    });

}

exports.updateBook = (req, res) => {

  const idx = req.body.idx;
  const updatingTitle = req.body.title;
  const updatingDescription = req.body.description;

  Book.findByPk(idx)
    .then(book => {
      book.title = updatingTitle;
      book.description = updatingDescription;
      book.save()
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end()
    })
}

exports.deleteBook = (req, res) => {

  const idx = req.params.idx;

  Book.findByPk(idx)
    .then(book => {
      return book.destory();
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    })
}