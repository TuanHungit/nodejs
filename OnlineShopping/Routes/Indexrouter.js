const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const categoryController = require("../controllers/categoryController");
  categoryController
    .getAll()
    .then(data => {
      res.locals.categories = data;
      const productController = require("../controllers/productController");
      return productController.getTrendingProduct();
    })
    .then(data => {
      res.locals.trendingProduct = data;
      res.render("index");
    })
    .catch(err => next(err));
});

module.exports = router;
