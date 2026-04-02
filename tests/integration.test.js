const { runAddCommand } = require("../cli/commands/add");
const { runBudgetCommand } = require("../cli/commands/budget");
const { runDeleteCommand } = require("../cli/commands/delete");
const { runListCommand } = require("../cli/commands/list");
const { runSummaryCommand } = require("../cli/commands/summary");
const { createTestDataFile, getCurrentMonthDate, readTestJson } = require("./helpers");

describe("integration flows", () => {
  test("full flow: add, list, summary, delete, verify JSON state", () => {
    const { filePath } = createTestDataFile();

    const addOutput = runAddCommand({
      amount: 150,
      category: "Food",
      desc: "Lunch",
      date: "2026-04-01",
      filePath,
    });
    expect(addOutput).toContain("Added expense");

    const listOutput = runListCommand({ filePath });
    expect(listOutput).toContain("Lunch");

    const summaryOutput = runSummaryCommand({ filePath });
    expect(summaryOutput).toContain("Food: PHP 150.00");

    const dataBeforeDelete = readTestJson(filePath);
    const deleteOutput = runDeleteCommand({
      id: dataBeforeDelete.expenses[0].id,
      filePath,
    });
    expect(deleteOutput).toContain("Deleted expense");

    const dataAfterDelete = readTestJson(filePath);
    expect(dataAfterDelete.expenses).toHaveLength(0);
  });

  test("budget flow: budget --monthly, add expenses, verify warning output", () => {
    const { filePath } = createTestDataFile();

    const budgetOutput = runBudgetCommand({
      monthly: 100,
      filePath,
    });
    expect(budgetOutput).toContain("Monthly budget: PHP 100.00");

    const addOutput = runAddCommand({
      amount: 150,
      category: "Food",
      desc: "Lunch",
      date: getCurrentMonthDate("03"),
      filePath,
    });

    expect(addOutput).toContain("Monthly budget exceeded");
  });
});
