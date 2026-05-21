/**
 * Validates an email format
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Paginates an array
 * @param {Array} array
 * @param {number} page - 1-indexed
 * @param {number} limit
 * @returns {{ data: Array, total: number, page: number, totalPages: number }}
 */
const paginate = (array, page = 1, limit = 10) => {
  const total = array.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = array.slice(start, start + limit);
  return { data, total, page, totalPages };
};

/**
 * Sanitizes a string (trim + lowercase)
 * @param {string} str
 * @returns {string}
 */
const sanitizeString = (str) => {
  if (typeof str !== "string") return "";
  return str.trim().toLowerCase();
};

module.exports = { isValidEmail, paginate, sanitizeString };
