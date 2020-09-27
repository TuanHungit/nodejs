const express = require("express");
const express_handlebars = require("express-handlebars");
const sequelize = require("sequelize");
const app = express();

app.use(express.static(`${__dirname}/public`));
const hbs = express_handlebars.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: `${__dirname}/views/layouts/`,
  partialsDir: `${__dirname}/views/partials/`
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.use("/", require("./Routes/Indexrouter"));
app.use("/products", require("./Routes/Productrouter"));
app.get("/sync", (req, res) => {
  const models = require("./models");
  models.sequelize
    .sync()
    .then(() => {
      res.send("database sync complete!");
    })
    .catch(err => console.log(err));
});
app.get("/:page", (req, res) => {
  const banners = {
    blog: "Our blog",
    category: "Category",
    cart: "Shopping cart",
    checkout: "Product Checkout",
    confirmation: "Order Confirmation",
    contact: "Contact Us",
    login: "Login / Register"
  };
  const page = req.params.page;
  res.render(page, {
    banner: banners[page]
  });
});

module.exports = app;