const Book = require('../models/book');
const BookShelf = require('../models/book_shelf');

// 네이버 검색 API
const clientId = 'o4HY4geY37qR_mJopk_o';
const clientSecret = '3zmjXCI44f';

// 패키지 IMPORT
const rp = require('request-promise');


exports.getBooks = (req, res) => {
  
}

exports.findBooks = (req, res) => {

  console.log('엥 뭐징ㅇㅇ', req.query);

  const findingQuery = req.query.query;

  const api_url = 'https://openapi.naver.com/v1/search/book.json?query=' + encodeURI(findingQuery); // json 결과

  const options = {
    uri: api_url,
    headers: {
      'X-Naver-Client-Id': clientId, 
      'X-Naver-Client-Secret': clientSecret
    }
  };

  rp(options)
    .then((error, response, body) => {
      console.log(error, response, body);
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {
          'Content-Type': 'text/json;charset=utf-8'
        });
        res.send(body);
      } else {
        console.log('error = ' + response.statusCode);
        res.status(response.statusCode).end();
      }
    })
    .catch(err => {
      console.log(err);
    });
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
      res.status(201).send(result)
    })
    .catch(err => {
      console.log(err);
    });
  
  
  // .findByPk(bookShelfIdx)
  //   .then(bookShelf => {
  //     return bookShelf.createBook({
  //       title: addingTitle,
  //       description: addingDescription
  //     });
  //   })
  //   .then(result => {
  //     return res.send(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })

}