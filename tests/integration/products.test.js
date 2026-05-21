const request = require("supertest");
const app = require("../../src/app");
const productService = require("../../src/services/productService");

beforeEach(() => {
  productService._reset();
});

describe("GET /api/products", () => {
  test("should return all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(3);
  });

  test("should filter products by category", async () => {
    const res = await request(app).get("/api/products?category=electronics");
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(2);
    res.body.data.forEach((p) => expect(p.category).toBe("electronics"));
  });
});

describe("GET /api/products/:id", () => {
  test("should return product by id", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Laptop Pro");
  });

  test("should return 404 for non-existent product", async () => {
    const res = await request(app).get("/api/products/999");
    expect(res.status).toBe(404);
  });
});

describe("POST /api/products", () => {
  test("should create a new product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Monitor 4K",
      price: 599.99,
      stock: 20,
      category: "electronics",
    });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe(4);
  });

  test("should return 400 when price is missing", async () => {
    const res = await request(app).post("/api/products").send({ name: "X" });
    expect(res.status).toBe(400);
  });

  test("should return 400 for negative price", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "Bad", price: -1 });
    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/products/:id/stock", () => {
  test("should increase stock", async () => {
    const res = await request(app)
      .patch("/api/products/1/stock")
      .send({ quantity: 5 });
    expect(res.status).toBe(200);
    expect(res.body.data.stock).toBe(15);
  });

  test("should return 422 for insufficient stock", async () => {
    const res = await request(app)
      .patch("/api/products/1/stock")
      .send({ quantity: -9999 });
    expect(res.status).toBe(422);
  });
});

describe("DELETE /api/products/:id", () => {
  test("should delete a product", async () => {
    const res = await request(app).delete("/api/products/3");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Product deleted");
  });

  test("should return 404 for non-existent product", async () => {
    const res = await request(app).delete("/api/products/999");
    expect(res.status).toBe(404);
  });
});

describe("GET /health", () => {
  test("should return health status", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
  });
});
