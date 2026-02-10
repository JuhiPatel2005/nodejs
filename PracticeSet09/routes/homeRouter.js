const express = require('express');
const path = require('path');

const homeRoute = express.Router();

const rootDir = require('../utils/pathUTIL');

homeRoute.get("/", (req,res,next) => {
  console.log('handling / for get', req.url, req.method);
  res.sendFile(path.join(rootDir, "views", 'home.html'));
});

module.exports = homeRoute;