const Portfolio = require('./../models/portfolioModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllPortfolios = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Portfolio.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const portfolio = await features.query;

  res.status(200).json({
    status: 'success',
    results: portfolio.length,
    data: {
      portfolio
    }
  });
});

exports.createPortfolio = catchAsync(async (req, res, next) => {
  const newPortfolio = await Portfolio.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      portfolio: newPortfolio
    }
  });
});

exports.updatePortfolio = catchAsync(async (req, res, next) => {
  const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!portfolio) {
    return next(new AppError('No Portfolio found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    portfolio
  });
});

exports.deletePortfolio = catchAsync(async (req, res, next) => {
  const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
  if (!portfolio) {
    return next(new AppError('No portfolio found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
