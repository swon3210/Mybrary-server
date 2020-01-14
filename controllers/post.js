const Post = require('../models/post');

exports.getPosts = (req, res) => {

  // 관계를 이용해서 포스트들 가져오기 -s 를 붙여야함.
  req.user.getPosts()
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      console.log(err);
    }); 
  
  // 모든 포스트 가져오기
  // Post.findAll().then(posts => {
  //   res.send(posts);
  // });
}

exports.findPost = (req, res) => {

  const title = req.body.title;

  // 특정 포스트만 가져오기
  Post.findAll({where: {title: title}}).then(posts => {
    res.send(posts);
  });
}

exports.addPost = (req, res) => {

  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const text = req.body.text;

  // 관계형 모델에 따라, 포스트가 생성되면 자동으로 유저 객체를 이용해 포스트를 생성시킴으로써 데이터베이스 상에 해당 관계를 포함한 행을 추가함(1대 다 관계 구현)
  req.user.createPost({
    title: title,
    imageURL: imageURL,
    text: text,
  }).then(result => {
    console.log(result);
    res.send('success!')
  }).catch(err => {
    console.log(err)
  });

}

exports.updatePost = (req, res) => {

  const id = req.body.id;
  const updatingTitle = req.body.title;
  const updatingImageURL = req.body.imageURL;
  const updatingText = req.body.text;

  Post.findByPk(id)
    .then(post => {
      post.title = updatingTitle;
      post.imageURL = updatingImageURL;
      post.text = updatingText;
      return post.save();
    })
    .then(result => {
      console.log('POST UPDATED!');
      res.send('POST UPDATED!');
    })
    .catch(err => {
      console.log(err);
    })
}

exports.deletePost = (req, res) => {

  const id = req.body.id;

  Post.findByPk(id)
    .then(post => {
      return post.destroy();
    })
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
}

// findById() -> findByPk()