const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('./web/public'));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './web/public/'));
});

app.listen(process.env.PORT);

module.exports = app;
