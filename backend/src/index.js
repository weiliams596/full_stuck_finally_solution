// This is auto generated index.js file
const express = require('express');
const helmet = require('helmet');
const swaggerui = require('swagger-ui-express');


const swaggerJsdoc = require('./utils/swagger');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerJsdoc));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Go to http://localhost:${port} to see the app`);
});
