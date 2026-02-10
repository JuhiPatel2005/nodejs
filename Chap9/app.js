
const express = require('express');

const requestHandler = require('./user');

const app = express();

app.get("/", (req , res , next) => {
  //res.send("<p>came from first middleware</p>");
  next();
});

app.post("/submit-details", (req , res , next) => {
  console.log("Came in second middleware", req.url, req.method);
  res.send("<p>Welcome to complete coding</p>");
});

app.use("/", (req , res , next) => {
  res.send("<p>came from another middleware</p>");
});


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
