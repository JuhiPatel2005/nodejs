const path = require('path');

const express = require('express');
const session = require('express-session');
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUTIL");
const errorController = require('./controllers/errors');
const mongoDBStore = require('connect-mongodb-session')(session);

const DB_PATH = "mongodb+srv://Juhi2005:Juhi%402005@airbnbcluster.qimn3ox.mongodb.net/airbnb?appName=airbnbCluster";


const { default: mongoose } = require('mongoose');



const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const store = new mongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

app.use('/css', express.static(path.join(rootDir, 'views', 'css')));

// Serve public static assets (images, scripts, additional css)
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

app.use(userRouter);
app.use('/host', (req, res, next) => {
  if(!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});

app.use("/host", hostRouter);
app.use(authRouter);

app.use(errorController.pageNotFound);

const PORT = 3000;


mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
  console.log(`Server running on address: http://localhost:${PORT}`);
});
}).catch(err => {
  console.log('Error while connecting to mongo', err);
})