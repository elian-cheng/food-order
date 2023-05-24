const express = require("express");
const router = express.Router();
const path = require("path");
const { readFileSync } = require("fs");

router.use(logger);

const PRODUCTS_DB = process.env.PRODUCTS_DB || path.resolve(__dirname, "products.json");

router.get("/", (req, res) => {
  const queryParams = {};
  const [uri, query] = req.url.split("?");

  if (query) {
    for (const piece of query.split("&")) {
      const [key, value] = piece.split("=");
      queryParams[key] = value ? decodeURIComponent(value) : "";
    }
  }
  res.send(getProductsList(queryParams));
});

router.get("/:id", (req, res) => {
  res.send(getProducts(`${req.params.id}`));
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

function getProductsList(params = {}) {
  const products = JSON.parse(readFileSync(PRODUCTS_DB) || "[]");

  let data = products;

  if (params.shop) {
    const shop = params.shop.trim().toLowerCase();
    const regExp = new RegExp(`^${shop}$`);
    data = data.filter(item => regExp.test(item.shop.toLowerCase()));
  }

  if (params.list) {
    const list = params.list.split(",");
    data = data.filter(item => list.includes(item.id));
  }

  return data;
}

function getProducts(itemId) {
  const products = JSON.parse(readFileSync(PRODUCTS_DB) || "[]");
  const item = products.find(({ id }) => id === itemId);
  if (!item) throw new ApiError(404, { message: "Item Not Found" });
  return item;
}

module.exports = router;
