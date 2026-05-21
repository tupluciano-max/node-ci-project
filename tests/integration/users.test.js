const request = require("supertest");
const app = require("../../src/app");
const userService = require("../../src/services/userService");

beforeEach(() => {
  userService._reset();
});

describe("GET /api/users", () => {
  test("should return 200 with all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(2);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe("GET /api/users/:id", () => {
  test("should return 200 with user by id", async () => {
    const res = await request(app).get("/api/users/1");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Alice García");
  });

  test("should return 404 for non-existent user", async () => {
    const res = await request(app).get("/api/users/999");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe("POST /api/users", () => {
  test("should create user and return 201", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Carlos López",
      email: "carlos@example.com",
    });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe(3);
    expect(res.body.data.role).toBe("user");
  });

  test("should return 409 for duplicate email", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Dup",
      email: "alice@example.com",
    });
    expect(res.status).toBe(409);
  });

  test("should return 400 when fields are missing", async () => {
    const res = await request(app).post("/api/users").send({ name: "NoEmail" });
    expect(res.status).toBe(400);
  });
});

describe("PUT /api/users/:id", () => {
  test("should update a user", async () => {
    const res = await request(app)
      .put("/api/users/1")
      .send({ name: "Alice Updated" });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Alice Updated");
  });

  test("should return 404 for non-existent user", async () => {
    const res = await request(app).put("/api/users/999").send({ name: "X" });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/users/:id", () => {
  test("should delete a user", async () => {
    const res = await request(app).delete("/api/users/2");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });

  test("should return 404 for non-existent user", async () => {
    const res = await request(app).delete("/api/users/999");
    expect(res.status).toBe(404);
  });
});
