const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.setHeader('Content-Type', 'text/html');
  if(req.url === '/home'){
    res.write('<h1>Welcome to home </h1>');
    res.end();
  } else if(req.url === '/man'){
    res.write('<h1>Welcome to Man Page </h1>');
    res.end();
  } else if(req.url === '/women'){
    res.write('<h1>Welcome to Women Page </h1>');
    res.end();
  } else if(req.url === '/kids'){
    res.write('<h1>Welcome to Kids Page </h1>');
    res.end();
  } else if(req.url === '/cart'){
    res.write('<h1>Welcome to Cart Page </h1>');
    res.end();
  } else {
  res.write(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Myntra</title>
</head>
<body>
    <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/man">Man</a></li>
      <li><a href="/women">Women</a></li>
      <li><a href="/kids">Kids</a></li>
      <li><a href="/cart">Cart</a></li>
    </ul>
    </nav>
</body>
</html>`
  );
  res.end();
}
});

server.listen(3000, () => {
  console.log("Server running on address http://localhost:3000");
});
