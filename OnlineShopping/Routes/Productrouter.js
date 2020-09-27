 const express = require('express');
 const router = express.Router();
 const categoryController = require("../controllers/categoryController");
 const productController = require("../controllers/productController");
 router.get('/', (req, res) => {
     categoryController
         .getAll()
         .then(data => {
             res.locals.categories = data;
             console.log(data);
             return productController.getTrendingProduct()
         })
         .then(data => {
             res.locals.productsTrending = data;
             console.log(data);
             res.render('category');
         })
 })

 router.get('/:id', (req, res) => {
     res.render('single-product');
 })

 module.exports = router;