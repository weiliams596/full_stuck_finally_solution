// This is auto generated index.js file
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Go to http://localhost:${port} to see the app`);
});
