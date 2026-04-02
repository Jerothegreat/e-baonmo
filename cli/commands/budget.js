const budgetUtils = require("../utils/budget");
const { readData } = require("../utils/storage");

const {
  getBudgetWarnings,
  getCurrentMonthKey,
  setCategoryBudget,
  setMonthlyBudget,
} = budgetUtils;

function runBudgetCommand(options = {}) {
  if (options.monthly == null && (options.category == null || options.limit == null)) {
    throw new Error("Provide --monthly or --category with --limit.");
  }

  let budget;

  if (options.monthly != null) {
    budget = setMonthlyBudget(options.monthly, { filePath: options.filePath });
  }

  if (options.category != null || options.limit != null) {
    if (options.category == null || options.limit == null) {
      throw new Error("Both --category and --limit are required together.");
    }

    budget = setCategoryBudget(options.category, options.limit, { filePath: options.filePath });
  }

  const warnings = getBudgetWarnings(readData(options.filePath), getCurrentMonthKey());
  const lines = [
    `Monthly budget: PHP ${Number(budget.monthly).toFixed(2)}`,
    ...Object.entries(budget.categories).map(
      ([category, limit]) => `${category}: PHP ${Number(limit).toFixed(2)}`,
    ),
  ];

  if (warnings.length > 0) {
    lines.push("Warnings:");
    warnings.forEach((warning) => lines.push(`- ${warning.message}`));
  }

  return lines.join("\n");
}

function registerBudgetCommand(program) {
  program
    .command("budget")
    .description("Set overall or per-category budgets")
    .option("--monthly <monthly>", "Overall monthly budget")
    .option("--category <category>", "Category name")
    .option("--limit <limit>", "Budget limit for the category")
    .action((options) => {
      console.log(runBudgetCommand(options));
    });
}

module.exports = {
  registerBudgetCommand,
  runBudgetCommand,
};
