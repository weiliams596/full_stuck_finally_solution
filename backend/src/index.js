// This is auto generated index.js file
const express = require('express');
const helmet = require('helmet');
const swaggerui = require('swagger-ui-express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const sequelize = require('./Config/db');

const swaggerJsdoc = require('./utils/swagger');

const authRouter = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT||3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5173'],
  credentials: true,
  exposedHeaders: ['Authorization']
}));

app.use(cookieParser());

app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerJsdoc));
app.use('/api/v1', authRouter);

app.listen(port, () => {
  sequelize.sync({ force: true }).then(() => {
    console.log('Database synced');
  });
  console.log(`Server is running on port ${port}`);
  console.log(`Go to http://localhost:${port} to see the app`);
});
