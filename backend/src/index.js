// This is auto generated index.js file
const express = require('express');
const helmet = require('helmet');
const swaggerui = require('swagger-ui-express');
const swaggerJsdoc= require('swagger-jsdoc');
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;
const rateQueueLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 10 ,// limit each IP to 100 requests per windowMs
  message:'Сіз тім көп сұраныс жасадіңіз , 3 минут күте тұрыңыз!',
  statusCode: 429 // return 429 Too Many Requests response
});


const specs = swaggerJsdoc({
  definition:{
    openapi:'3.0.0',
    info:{
      title:'Hospital queuing system',
      version:'1.0.0'
    },
  },
  apis:[]
});

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use('/api-docs',swaggerui.serve,swaggerui.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Go to http://localhost:${port} to see the app`);
});
