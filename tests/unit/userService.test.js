const userService = require("../../src/services/userService");

beforeEach(() => {
  userService._reset();
});

describe("userService - getAllUsers", () => {
  test("should return all users", () => {
    const users = userService.getAllUsers();
    expect(users).toHaveLength(2);
    expect(users[0]).toHaveProperty("email");
  });
});

describe("userService - getUserById", () => {
  test("should return user by id", () => {
    const user = userService.getUserById(1);
    expect(user.name).toBe("Alice García");
  });

  test("should throw if user not found", () => {
    expect(() => userService.getUserById(999)).toThrow("User not found");
  });
});

describe("userService - createUser", () => {
  test("should create a new user", () => {
    const newUser = userService.createUser({
      name: "Carlos López",
      email: "carlos@example.com",
    });
    expect(newUser.id).toBe(3);
    expect(newUser.role).toBe("user"); // default role
  });

  test("should throw if email already exists", () => {
    expect(() =>
      userService.createUser({ name: "Dup", email: "alice@example.com" })
    ).toThrow("Email already exists");
  });

  test("should throw if name or email missing", () => {
    expect(() => userService.createUser({ name: "NoEmail" })).toThrow(
      "Name and email are required"
    );
    expect(() => userService.createUser({ email: "noname@x.com" })).toThrow(
      "Name and email are required"
    );
  });
});

describe("userService - updateUser", () => {
  test("should update an existing user", () => {
    const updated = userService.updateUser(1, { name: "Alice Updated" });
    expect(updated.name).toBe("Alice Updated");
    expect(updated.id).toBe(1);
  });

  test("should throw if user not found", () => {
    expect(() => userService.updateUser(999, { name: "X" })).toThrow(
      "User not found"
    );
  });
});

describe("userService - deleteUser", () => {
  test("should delete a user and return it", () => {
    const deleted = userService.deleteUser(2);
    expect(deleted.id).toBe(2);
    expect(userService.getAllUsers()).toHaveLength(1);
  });

  test("should throw if user not found", () => {
    expect(() => userService.deleteUser(999)).toThrow("User not found");
  });
});
