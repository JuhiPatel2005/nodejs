const path = require('path');

const express = require('express');
const userRouter = express.Router();

const homesController = require('../controllers/storeController');

userRouter.get("/",homesController.getIndex);
userRouter.get("/bookings", homesController.getBookings);
userRouter.get("/homes", homesController.getHomes);
userRouter.get("/favourite-list", homesController.getFavouriteList);
userRouter.post("/favourites", homesController.postAddFavourite);
userRouter.get("/homes/:homeId", homesController.getHomeDetails);

userRouter.get("/homes/:homeId/favourite", homesController.postAddFavourite);

userRouter.post("/favourites/delete/:homeId", homesController.postremoveFromFavourite);

module.exports = userRouter;
