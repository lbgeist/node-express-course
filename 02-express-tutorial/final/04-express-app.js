const express = require('express');
const path = require('path'); // comes included with Node.js

const app = express();

// setup static and middleware
app.use(express.static('./public')); // makes resources in folder available without having to set them up individually

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html')); // sendFile requires path could also use path.join
  // not needed because index.html is a static asset and can be included in the app.use above
  // use other methods to render index.html:
  // adding to static assets
  // server side rendering (SSR) using template engine
});

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});

app.listen(5000, () => {
  console.log('server is listening on port 5000....');
});
