let app = require('express')();
let http = require('http').Server(app);
let port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(port, () => {
  console.log(`listening on ${port}`);
});
