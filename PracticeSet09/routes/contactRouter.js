const express = require('express');
const path = require('path');

const contactRoute = express.Router();

const rootDir = require('../utils/pathUTIL');

contactRoute.get("/contact-us", (req,res,next) => {
  console.log('handling contact-us dummty middleware', req.url, req.method);
  res.sendFile(path.join(rootDir, 'views', 'contact-us.html'));
});

contactRoute.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, 'views', 'contact-success.html'));
});


module.exports = contactRoute;