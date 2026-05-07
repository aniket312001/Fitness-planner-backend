const express = require('express');
const cors = require('cors');
require('dotenv').config();

const errorMiddleware = require('./middleware/error.middleware');

const authRoutes = require('./features/auth/auth.routes');
const userRoutes = require('./features/users/users.routes');
const planRoutes = require('./features/plans/plans.routes');

const exerciseRoutes = require('./features/exercises/exercises.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/exercises', exerciseRoutes);

app.use(errorMiddleware);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



module.exports = app;