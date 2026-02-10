const express = require('express');
const hostRouter = express.Router();

const homesController = require('../controllers/hostController')

hostRouter.get("/add-home",homesController.getAddHome);

hostRouter.post("/add-home",homesController.postAddHome);

hostRouter.get("/host-homes",homesController.getHostHomes);

hostRouter.get("/edit-home/:homeId", homesController.getEditHome);

hostRouter.post("/edit-home", homesController.postEditHome);

hostRouter.post("/delete-home/:homeId", homesController.postDeleteHome);

module.exports = hostRouter;

