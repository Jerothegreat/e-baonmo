const { getSummary } = require("../utils/storage");

function formatSummary(summary) {
  const entries = Object.entries(summary);

  if (entries.length === 0) {
    return "No expenses available for summary.";
  }

  return entries
    .map(([category, total]) => `${category}: PHP ${Number(total).toFixed(2)}`)
    .join("\n");
}

function runSummaryCommand(options = {}) {
  return formatSummary(getSummary({ filePath: options.filePath }));
}

function registerSummaryCommand(program) {
  program
    .command("summary")
    .description("View spending summary by category")
    .action(() => {
      console.log(runSummaryCommand());
    });
}

module.exports = {
  formatSummary,
  registerSummaryCommand,
  runSummaryCommand,
};
