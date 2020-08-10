const path = require('path');
const express = require('express');
const { port } = require('./config');

const app = express();
require('./utils/initDb');
require('./model/db').healthCheck();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.use('/api/users', require('./routes/usersRouter'));
app.use('/api/statistics', require('./routes/statisticsRouter'));

app.listen(port, () => {
  console.log(`Server is running on ${port} port...`);
});
