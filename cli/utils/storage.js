const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DEFAULT_BUDGET = {
  monthly: 5000,
  categories: {
    Food: 1500,
    Transport: 800,
    Bills: 1200,
    Entertainment: 500,
    Other: 1000,
  },
};

const DEFAULT_DATA = {
  budget: DEFAULT_BUDGET,
  expenses: [],
};

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function getDataFilePath(overridePath) {
  if (overridePath) {
    return path.resolve(overridePath);
  }

  if (process.env.EXPENSES_FILE) {
    return path.resolve(process.env.EXPENSES_FILE);
  }

  return path.resolve(__dirname, "../../data/expenses.json");
}

function ensureDataFile(filePath) {
  const resolvedPath = getDataFilePath(filePath);
  const directory = path.dirname(resolvedPath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  if (!fs.existsSync(resolvedPath)) {
    fs.writeFileSync(resolvedPath, JSON.stringify(DEFAULT_DATA, null, 2));
  }

  return resolvedPath;
}

function normalizeData(data) {
  return {
    budget: {
      monthly:
        typeof data?.budget?.monthly === "number"
          ? data.budget.monthly
          : DEFAULT_BUDGET.monthly,
      categories: {
        ...DEFAULT_BUDGET.categories,
        ...(data?.budget?.categories || {}),
      },
    },
    expenses: Array.isArray(data?.expenses) ? data.expenses : [],
  };
}

function readData(filePath) {
  const resolvedPath = ensureDataFile(filePath);
  const content = fs.readFileSync(resolvedPath, "utf8");
  return normalizeData(JSON.parse(content));
}

function writeData(data, filePath) {
  const resolvedPath = ensureDataFile(filePath);
  fs.writeFileSync(resolvedPath, JSON.stringify(normalizeData(data), null, 2));
}

function validateExpenseInput(input) {
  const amount = Number(input?.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("A valid positive amount is required.");
  }

  if (!input?.category || !String(input.category).trim()) {
    throw new Error("Category is required.");
  }

  if (!input?.description || !String(input.description).trim()) {
    throw new Error("Description is required.");
  }

  if (input.date && Number.isNaN(Date.parse(input.date))) {
    throw new Error("Date must be a valid ISO 8601 date.");
  }

  return {
    amount: Number(amount.toFixed(2)),
    category: String(input.category).trim(),
    description: String(input.description).trim(),
    date: input.date ? String(input.date) : getTodayIsoDate(),
  };
}

function createExpense(input, options = {}) {
  const normalized = validateExpenseInput(input);
  const generateId = options.idGenerator || uuidv4;

  return {
    id: generateId(),
    ...normalized,
  };
}

function addExpense(input, options = {}) {
  const data = readData(options.filePath);
  const expense = createExpense(input, options);
  data.expenses.push(expense);
  writeData(data, options.filePath);
  return expense;
}

function listExpenses(options = {}) {
  return readData(options.filePath).expenses;
}

function filterExpenses(category, options = {}) {
  return listExpenses(options).filter(
    (expense) =>
      expense.category.toLowerCase() === String(category || "").trim().toLowerCase(),
  );
}

function deleteExpenseById(id, options = {}) {
  if (!id) {
    throw new Error("Expense ID is required.");
  }

  const data = readData(options.filePath);
  const index = data.expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    throw new Error(`Expense with ID ${id} was not found.`);
  }

  const [removedExpense] = data.expenses.splice(index, 1);
  writeData(data, options.filePath);
  return removedExpense;
}

function getCategorySummary(expenses) {
  return expenses.reduce((summary, expense) => {
    const current = summary[expense.category] || 0;
    summary[expense.category] = Number((current + Number(expense.amount)).toFixed(2));
    return summary;
  }, {});
}

function getSummary(options = {}) {
  return getCategorySummary(listExpenses(options));
}

module.exports = {
  DEFAULT_BUDGET,
  DEFAULT_DATA,
  addExpense,
  createExpense,
  deleteExpenseById,
  ensureDataFile,
  filterExpenses,
  getCategorySummary,
  getDataFilePath,
  getSummary,
  getTodayIsoDate,
  listExpenses,
  readData,
  validateExpenseInput,
  writeData,
};
