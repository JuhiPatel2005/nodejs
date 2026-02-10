const {sumRequestHandler } = require('./sum');

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
      <head><title>Practice Set</title></head>
      <body>
      <h1>Welcome to Calculator</h1>
      <a href="/calculator">Go to Calculator</a>
      <body>
      </html>
      `);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
      <head><title>Practice Set</title></head>
      <body>
      <h1> here is the calculator</h1>
      <form action="/calculate-result" method="POST">
      <input type="text" placeholder="First num" name="first" />
      <input type="text" placeholder="Second num" name="second" />
      <input type="submit" value="sum">
      </form>
      <body>
      </html>
      
      `);
    return res.end();
  } else if(req.url.toLowerCase() === "/calculate-result" && req.method ==="POST" ){
    return sumRequestHandler(req,res);
    
    }
  res.setHeader("Content-Type", "text/html");
  res.write(`
      <html>
      <head><title>Practice Set</title></head>
      <body>
      <h1> 404 page error</h1>
      <a href="/">Go to Home</a>
      <body>
      </html>
      
      `);
  return res.end();
};


module.exports = requestHandler;
