const path = require('path');

const express = require('express');

const rootDir = require('./utils/pathUTIL');
const homeRouter = require('./routes/homeRouter');
const contactRouter = require('./routes/contactRouter');
const app = express(); 

app.use(express.urlencoded());

app.use(homeRouter);
app.use(contactRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", '404.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});