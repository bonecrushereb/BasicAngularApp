const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build'))
  .get('*', (req, res) => {
    res.redirect('/#' + req.url);
  })
  .listen(5000, () => console.log('server up'));
