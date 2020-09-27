const models = require("../models/index");
const Category = models.category;
exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Category
            .findAll({
                attributes: ["id", "name", "sumary", "imagepath"],
                include: [{
                    model: models.product
                }],
                limit: 7
            })
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
};