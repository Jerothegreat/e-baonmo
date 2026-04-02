const fs = require("fs");
const os = require("os");
const path = require("path");

const INITIAL_DATA = {
  budget: {
    monthly: 5000,
    categories: {
      Food: 1500,
      Transport: 800,
      Bills: 1200,
      Entertainment: 500,
      Other: 1000,
    },
  },
  expenses: [],
};

function createTestDataFile(data = INITIAL_DATA) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "e-baonmo-"));
  const filePath = path.join(directory, "expenses.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return { directory, filePath };
}

function readTestJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getCurrentMonthDate(day = "01") {
  return `${new Date().toISOString().slice(0, 7)}-${day}`;
}

module.exports = {
  INITIAL_DATA,
  createTestDataFile,
  getCurrentMonthDate,
  readTestJson,
};
