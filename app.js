const express = require('express');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// 1) MIDDLEWEARS

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//3) Routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/portfolio', portfolioRoutes);
app.use('/api/v1/contacts', contactRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
