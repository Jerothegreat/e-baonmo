const { readData, writeData } = require("./storage");

function getMonthKey(dateString) {
  return String(dateString).slice(0, 7);
}

function getCurrentMonthKey() {
  return new Date().toISOString().slice(0, 7);
}

function getExpensesForMonth(expenses, monthKey = getCurrentMonthKey()) {
  return expenses.filter((expense) => getMonthKey(expense.date) === monthKey);
}

function getMonthlyTotal(expenses, monthKey = getCurrentMonthKey()) {
  return Number(
    getExpensesForMonth(expenses, monthKey)
      .reduce((total, expense) => total + Number(expense.amount), 0)
      .toFixed(2),
  );
}

function setMonthlyBudget(monthly, options = {}) {
  const limit = Number(monthly);

  if (!Number.isFinite(limit) || limit < 0) {
    throw new Error("Monthly budget must be a valid non-negative number.");
  }

  const data = readData(options.filePath);
  data.budget.monthly = Number(limit.toFixed(2));
  writeData(data, options.filePath);
  return data.budget;
}

function setCategoryBudget(category, limit, options = {}) {
  if (!category || !String(category).trim()) {
    throw new Error("Category is required when setting a category budget.");
  }

  const normalizedLimit = Number(limit);

  if (!Number.isFinite(normalizedLimit) || normalizedLimit < 0) {
    throw new Error("Category budget limit must be a valid non-negative number.");
  }

  const data = readData(options.filePath);
  data.budget.categories[String(category).trim()] = Number(normalizedLimit.toFixed(2));
  writeData(data, options.filePath);
  return data.budget;
}

function getBudgetWarnings(data, monthKey = getCurrentMonthKey()) {
  const expenses = getExpensesForMonth(data.expenses, monthKey);
  const warnings = [];
  const monthlyTotal = getMonthlyTotal(data.expenses, monthKey);

  if (monthlyTotal > data.budget.monthly) {
    warnings.push({
      type: "monthly",
      month: monthKey,
      spent: monthlyTotal,
      limit: data.budget.monthly,
      message: `Monthly budget exceeded for ${monthKey}: spent PHP ${monthlyTotal.toFixed(
        2,
      )} of PHP ${data.budget.monthly.toFixed(2)}.`,
    });
  }

  const totalsByCategory = expenses.reduce((summary, expense) => {
    const current = summary[expense.category] || 0;
    summary[expense.category] = Number((current + Number(expense.amount)).toFixed(2));
    return summary;
  }, {});

  Object.entries(data.budget.categories).forEach(([category, limit]) => {
    const spent = totalsByCategory[category] || 0;

    if (spent > limit) {
      warnings.push({
        type: "category",
        category,
        month: monthKey,
        spent,
        limit,
        message: `${category} budget exceeded for ${monthKey}: spent PHP ${spent.toFixed(
          2,
        )} of PHP ${Number(limit).toFixed(2)}.`,
      });
    }
  });

  return warnings;
}

module.exports = {
  getBudgetWarnings,
  getCurrentMonthKey,
  getExpensesForMonth,
  getMonthlyTotal,
  getMonthKey,
  setCategoryBudget,
  setMonthlyBudget,
};
