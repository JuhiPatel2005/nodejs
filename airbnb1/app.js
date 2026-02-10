const path = require('path');

const express = require('express');

const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUTIL");
const errorController = require('./controllers/errors');
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use('/css', express.static(path.join(rootDir, 'views', 'css')));

// Serve public static assets (images, scripts, additional css)
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(userRouter);
app.use("/host", hostRouter);

app.use(errorController.pageNotFound);

const PORT = 3000;

const DB_PATH = "mongodb+srv://Juhi2005:Juhi%402005@airbnbcluster.qimn3ox.mongodb.net/airbnb?appName=airbnbCluster";

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
  console.log(`Server running on address: http://localhost:${PORT}`);
});
}).catch(err => {
  console.log('Error while connecting to mongo', err);
})