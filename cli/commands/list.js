const { listExpenses } = require("../utils/storage");

function formatExpenseList(expenses) {
  if (expenses.length === 0) {
    return "No expenses found.";
  }

  return expenses
    .map(
      (expense) =>
        `${expense.id} | ${expense.date} | ${expense.category} | PHP ${Number(
          expense.amount,
        ).toFixed(2)} | ${expense.description}`,
    )
    .join("\n");
}

function runListCommand(options = {}) {
  return formatExpenseList(listExpenses({ filePath: options.filePath }));
}

function registerListCommand(program) {
  program
    .command("list")
    .description("List all expenses")
    .action(() => {
      console.log(runListCommand());
    });
}

module.exports = {
  formatExpenseList,
  registerListCommand,
  runListCommand,
};
