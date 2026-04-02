const { filterExpenses } = require("../utils/storage");
const { formatExpenseList } = require("./list");

function runFilterCommand(options = {}) {
  return formatExpenseList(filterExpenses(options.category, { filePath: options.filePath }));
}

function registerFilterCommand(program) {
  program
    .command("filter")
    .description("Filter expenses by category")
    .requiredOption("--category <category>", "Category to filter")
    .action((options) => {
      console.log(runFilterCommand(options));
    });
}

module.exports = {
  registerFilterCommand,
  runFilterCommand,
};
