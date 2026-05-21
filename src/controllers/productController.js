const productService = require("../services/productService");

const getAll = (req, res, next) => {
  try {
    const { category } = req.query;
    const products = productService.getAllProducts({ category });
    res.json({ success: true, data: products, count: products.length });
  } catch (err) {
    next(err);
  }
};

const getById = (req, res, next) => {
  try {
    const product = productService.getProductById(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const create = (req, res, next) => {
  try {
    const product = productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const updateStock = (req, res, next) => {
  try {
    const { quantity } = req.body;
    const product = productService.updateStock(req.params.id, quantity);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

const remove = (req, res, next) => {
  try {
    const product = productService.deleteProduct(req.params.id);
    res.json({ success: true, data: product, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, updateStock, remove };
