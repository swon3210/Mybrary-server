const express = require('express');
const bodysParser = require('body-parser');
const app = express();

const feedRoutes = require('./routes/feed');
const sequelize = require('./utils/databse');

app.use(bodysParser.json()); // x-www-form-urlendcoded <form> <- 이건 필요없다. 그러니 josn 데이터로 받을 수 있도록 한다.

// 미들웨어 추가
app.use((req, res, next) => {
  // 응답이 가기전에 헤더를 추가
  // 특정 도메인에만 허용을 해줄 수도, 그냥 다 열어버릴 수도 있다.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // 오리진만 열어주면 안되고, 어떤 HTTP 메서드가 허용되는지도 정해줘야 한다.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  // 데이터 요청이나 권한 요청에 관해서만 허용하도록 한다.
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

// post 로 시작하는 모든 라우팅은 feedRoutes로 전달되어 핸들링 된다
app.use('/feed', feedRoutes);

// 데이터베이스 연결
sequelize.sync();

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('MySQL is connected');
// });

app.listen(8080, () => {
  console.log('server is now on http://localhost:8080');
})