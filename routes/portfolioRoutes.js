const express = require('express');

const multer = require('multer');

const upload = multer({ limits: { fileSize: 2000000 }, dest: './uploads/' });

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

router
  .route('/img/:id')
  .patch(upload.single('img'), portfolioController.updatePortfolioPic);

module.exports = router;
