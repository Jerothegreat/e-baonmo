const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");
const { listExpenses } = require("../utils/storage");

function exportExpensesToCsv(outputPath, options = {}) {
  if (!outputPath || !String(outputPath).trim()) {
    throw new Error("Output path is required.");
  }

  const parser = new Parser({
    fields: ["id", "amount", "category", "description", "date"],
  });
  const csv = parser.parse(listExpenses(options));
  const resolvedOutput = path.resolve(outputPath);
  fs.writeFileSync(resolvedOutput, csv);
  return resolvedOutput;
}

function runExportCommand(options = {}) {
  const outputPath = exportExpensesToCsv(options.output, { filePath: options.filePath });
  return `Exported expenses to ${outputPath}`;
}

function registerExportCommand(program) {
  program
    .command("export")
    .description("Export all expenses to CSV")
    .requiredOption("--output <output>", "Output CSV file path")
    .action((options) => {
      console.log(runExportCommand(options));
    });
}

module.exports = {
  exportExpensesToCsv,
  registerExportCommand,
  runExportCommand,
};
