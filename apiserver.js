const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sharkRouter = require(__dirname + '/routes/sharksrouter');
const preyRouter = require(__dirname + '/routes/preyrouter');
const countRouter = require(__dirname + '/routes/countrouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sharksprey_db');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});

app.use('/api', sharkRouter);
app.use('/api', preyRouter);
app.use('/api', countRouter);
app.use((req, res) => {
  res.status(404).send('Error 404 File not found');
});
module.exports = app.listen(PORT, () => console.log('server up on port:' + PORT));
