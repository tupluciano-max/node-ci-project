const { isValidEmail, paginate, sanitizeString } = require("../../src/utils/helpers");

describe("isValidEmail", () => {
  test("should return true for valid emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("name.last+tag@domain.co")).toBe(true);
  });

  test("should return false for invalid emails", () => {
    expect(isValidEmail("notanemail")).toBe(false);
    expect(isValidEmail("@nodomain.com")).toBe(false);
    expect(isValidEmail("missing@")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

  test("should return correct slice for page 1", () => {
    const result = paginate(items, 1, 10);
    expect(result.data).toHaveLength(10);
    expect(result.data[0].id).toBe(1);
    expect(result.total).toBe(25);
    expect(result.totalPages).toBe(3);
  });

  test("should return correct slice for last page", () => {
    const result = paginate(items, 3, 10);
    expect(result.data).toHaveLength(5);
    expect(result.data[0].id).toBe(21);
  });

  test("should default to page 1 and limit 10", () => {
    const result = paginate(items);
    expect(result.page).toBe(1);
    expect(result.data).toHaveLength(10);
  });

  test("should return empty data for out-of-range page", () => {
    const result = paginate(items, 100, 10);
    expect(result.data).toHaveLength(0);
  });
});

describe("sanitizeString", () => {
  test("should trim and lowercase", () => {
    expect(sanitizeString("  Hello World  ")).toBe("hello world");
  });

  test("should return empty string for non-string input", () => {
    expect(sanitizeString(null)).toBe("");
    expect(sanitizeString(undefined)).toBe("");
    expect(sanitizeString(123)).toBe("");
  });
});
