const { addExpense, readData } = require("../cli/utils/storage");
const { getBudgetWarnings, setCategoryBudget, setMonthlyBudget } = require("../cli/utils/budget");
const { createTestDataFile, getCurrentMonthDate, readTestJson } = require("./helpers");

describe("budget", () => {
  test("budget warning triggers when a category exceeds its set limit", () => {
    const { filePath } = createTestDataFile();
    setCategoryBudget("Food", 100, { filePath });
    addExpense(
      {
        amount: 150,
        category: "Food",
        description: "Lunch",
        date: getCurrentMonthDate("01"),
      },
      { filePath, idGenerator: () => "expense-1" },
    );

    const warnings = getBudgetWarnings(readData(filePath));

    expect(warnings.some((warning) => warning.type === "category" && warning.category === "Food")).toBe(
      true,
    );
  });

  test("budget warning triggers when monthly total exceeds the monthly limit", () => {
    const { filePath } = createTestDataFile();
    setMonthlyBudget(100, { filePath });
    addExpense(
      {
        amount: 120,
        category: "Transport",
        description: "Commute",
        date: getCurrentMonthDate("02"),
      },
      { filePath, idGenerator: () => "expense-2" },
    );

    const warnings = getBudgetWarnings(readData(filePath));

    expect(warnings.some((warning) => warning.type === "monthly")).toBe(true);
  });

  test("setting budgets persists updated limits", () => {
    const { filePath } = createTestDataFile();
    setMonthlyBudget(6200, { filePath });
    setCategoryBudget("Bills", 2100, { filePath });

    const data = readTestJson(filePath);

    expect(data.budget.monthly).toBe(6200);
    expect(data.budget.categories.Bills).toBe(2100);
  });
});
