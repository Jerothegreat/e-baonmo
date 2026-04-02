const { deleteExpenseById } = require("../utils/storage");

function runDeleteCommand(options = {}) {
  const expense = deleteExpenseById(options.id, { filePath: options.filePath });
  return `Deleted expense ${expense.id} (${expense.description})`;
}

function registerDeleteCommand(program) {
  program
    .command("delete")
    .description("Delete an expense by ID")
    .requiredOption("--id <id>", "Expense UUID")
    .action((options) => {
      console.log(runDeleteCommand(options));
    });
}

module.exports = {
  registerDeleteCommand,
  runDeleteCommand,
};
