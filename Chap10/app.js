const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

app.use((req,res,next) => {
  console.log('First dummty middleware', req.url, req.method);
  next();
});

app.use((req,res,next) => {
  console.log('Second dummty middleware', req.url, req.method);
  next();
});

app.get("/", (req,res,next) => {
  console.log('handling home dummty middleware', req.url, req.method);
  res.send("<h1> Welcoe to complete coding</h1>");
  next();
});

app.get("/contact-us", (req,res,next) => {
  console.log('handling contact-us dummty middleware', req.url, req.method);
  res.send(`
    <h1>Please give your details</h1>
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Enter yout name: "/>
      <input type="email" name="email" placeholder="Enter your email: "/>
      <input type="Submit"/>
    </form>`);
  next();
});

app.post("/contact-us", (req, res, next) => {
  console.log('FIrst post handling', req.url, req.method, req.body);
  next();
});

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log('handling contact-us dummty middleware', req.url, req.method, req.body);
  res.send("<h1> we will contact you shortly</h1>");
});

// app.use((req,res,next) => {
//   console.log('Second dummty middleware', req.url, req.method);
//   res.send("<h1>Welcome to compplete coding.");
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});