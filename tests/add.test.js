const { addExpense } = require("../cli/utils/storage");
const { createTestDataFile, readTestJson } = require("./helpers");

describe("add expense", () => {
  test("adding a valid expense saves correctly to expenses.json", () => {
    const { filePath } = createTestDataFile();

    const expense = addExpense(
      {
        amount: 150,
        category: "Food",
        description: "Lunch at Jollibee",
        date: "2026-04-01",
      },
      { filePath, idGenerator: () => "test-id" },
    );

    const data = readTestJson(filePath);

    expect(expense.id).toBe("test-id");
    expect(data.expenses).toHaveLength(1);
    expect(data.expenses[0]).toEqual({
      id: "test-id",
      amount: 150,
      category: "Food",
      description: "Lunch at Jollibee",
      date: "2026-04-01",
    });
  });

  test("adding an expense with a missing amount throws a validation error", () => {
    const { filePath } = createTestDataFile();

    expect(() =>
      addExpense(
        {
          category: "Food",
          description: "Lunch at Jollibee",
          date: "2026-04-01",
        },
        { filePath },
      ),
    ).toThrow("A valid positive amount is required.");
  });
});
