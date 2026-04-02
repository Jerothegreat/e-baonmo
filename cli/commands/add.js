const budgetUtils = require("../utils/budget");
const storage = require("../utils/storage");

const { getBudgetWarnings, getCurrentMonthKey } = budgetUtils;
const { addExpense, readData } = storage;

function formatAddResult(expense, warnings) {
  const lines = [
    `Added expense ${expense.id}`,
    `Amount: PHP ${expense.amount.toFixed(2)}`,
    `Category: ${expense.category}`,
    `Description: ${expense.description}`,
    `Date: ${expense.date}`,
  ];

  if (warnings.length > 0) {
    lines.push("Warnings:");
    warnings.forEach((warning) => lines.push(`- ${warning.message}`));
  }

  return lines.join("\n");
}

function runAddCommand(options = {}) {
  const expense = addExpense({
    amount: options.amount,
    category: options.category,
    description: options.desc,
    date: options.date,
  }, { filePath: options.filePath });
  const warnings = getBudgetWarnings(readData(options.filePath), getCurrentMonthKey());
  return formatAddResult(expense, warnings);
}

function registerAddCommand(program) {
  program
    .command("add")
    .description("Add a new expense")
    .requiredOption("--amount <amount>", "Expense amount")
    .requiredOption("--category <category>", "Expense category")
    .requiredOption("--desc <description>", "Expense description")
    .option("--date <date>", "Expense date in ISO 8601 format")
    .action((options) => {
      console.log(runAddCommand(options));
    });
}

module.exports = {
  formatAddResult,
  registerAddCommand,
  runAddCommand,
};
