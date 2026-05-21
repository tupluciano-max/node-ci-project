let products = [
  { id: 1, name: "Laptop Pro", price: 1299.99, stock: 10, category: "electronics" },
  { id: 2, name: "Mechanical Keyboard", price: 89.99, stock: 50, category: "electronics" },
  { id: 3, name: "Standing Desk", price: 499.00, stock: 5, category: "furniture" },
];
let nextId = 4;

const getAllProducts = (filters = {}) => {
  let result = [...products];
  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  return result;
};

const getProductById = (id) => {
  const product = products.find((p) => p.id === Number(id));
  if (!product) throw new Error("Product not found");
  return product;
};

const createProduct = ({ name, price, stock = 0, category }) => {
  if (!name || price === undefined) throw new Error("Name and price are required");
  if (price < 0) throw new Error("Price cannot be negative");

  const newProduct = { id: nextId++, name, price, stock, category };
  products.push(newProduct);
  return newProduct;
};

const updateStock = (id, quantity) => {
  const product = products.find((p) => p.id === Number(id));
  if (!product) throw new Error("Product not found");

  const newStock = product.stock + quantity;
  if (newStock < 0) throw new Error("Insufficient stock");

  product.stock = newStock;
  return product;
};

const deleteProduct = (id) => {
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) throw new Error("Product not found");
  return products.splice(index, 1)[0];
};

const _reset = () => {
  products = [
    { id: 1, name: "Laptop Pro", price: 1299.99, stock: 10, category: "electronics" },
    { id: 2, name: "Mechanical Keyboard", price: 89.99, stock: 50, category: "electronics" },
    { id: 3, name: "Standing Desk", price: 499.00, stock: 5, category: "furniture" },
  ];
  nextId = 4;
};

module.exports = { getAllProducts, getProductById, createProduct, updateStock, deleteProduct, _reset };
