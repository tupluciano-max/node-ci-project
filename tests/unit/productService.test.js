const productService = require("../../src/services/productService");

beforeEach(() => {
  productService._reset();
});

describe("productService - getAllProducts", () => {
  test("should return all products", () => {
    const products = productService.getAllProducts();
    expect(products).toHaveLength(3);
  });

  test("should filter by category", () => {
    const electronics = productService.getAllProducts({ category: "electronics" });
    expect(electronics).toHaveLength(2);
    electronics.forEach((p) => expect(p.category).toBe("electronics"));
  });
});

describe("productService - getProductById", () => {
  test("should return product by id", () => {
    const product = productService.getProductById(1);
    expect(product.name).toBe("Laptop Pro");
  });

  test("should throw if product not found", () => {
    expect(() => productService.getProductById(999)).toThrow("Product not found");
  });
});

describe("productService - createProduct", () => {
  test("should create a product with default stock 0", () => {
    const p = productService.createProduct({
      name: "Mouse",
      price: 29.99,
      category: "electronics",
    });
    expect(p.id).toBe(4);
    expect(p.stock).toBe(0);
  });

  test("should throw if name or price missing", () => {
    expect(() => productService.createProduct({ price: 10 })).toThrow(
      "Name and price are required"
    );
  });

  test("should throw if price is negative", () => {
    expect(() =>
      productService.createProduct({ name: "Bad", price: -5 })
    ).toThrow("Price cannot be negative");
  });
});

describe("productService - updateStock", () => {
  test("should increase stock", () => {
    const p = productService.updateStock(1, 5);
    expect(p.stock).toBe(15);
  });

  test("should decrease stock", () => {
    const p = productService.updateStock(1, -3);
    expect(p.stock).toBe(7);
  });

  test("should throw if insufficient stock", () => {
    expect(() => productService.updateStock(1, -999)).toThrow("Insufficient stock");
  });

  test("should throw if product not found", () => {
    expect(() => productService.updateStock(999, 1)).toThrow("Product not found");
  });
});

describe("productService - deleteProduct", () => {
  test("should delete and return product", () => {
    const deleted = productService.deleteProduct(3);
    expect(deleted.name).toBe("Standing Desk");
    expect(productService.getAllProducts()).toHaveLength(2);
  });

  test("should throw if product not found", () => {
    expect(() => productService.deleteProduct(999)).toThrow("Product not found");
  });
});
