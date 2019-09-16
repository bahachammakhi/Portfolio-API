const express = require('express');
const portfolioController = require('./../controllers/portfolioController');
// const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/')
  .get(portfolioController.getAllPortfolios)
  .post(portfolioController.createPortfolio);

router
  .route('/:id')
  .patch(portfolioController.updatePortfolio)
  .delete(portfolioController.deletePortfolio);

module.exports = router;
