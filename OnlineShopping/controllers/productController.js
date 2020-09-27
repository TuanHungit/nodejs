const models = require("../models/index");
const Product = models.product;
exports.getTrendingProduct = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll({
                order: [
                    ['overallReview', 'DESC']
                ],
                limit: 8,
                include: [{
                    model: models.category
                }],
                attributes: ['id', 'name', 'imagePath', 'price']
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
};