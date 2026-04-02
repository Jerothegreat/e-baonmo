const { deleteExpenseById } = require("../cli/utils/storage");
const { createTestDataFile, readTestJson } = require("./helpers");

describe("delete expense", () => {
  test("deleting an expense by a valid ID removes it from the JSON", () => {
    const { filePath } = createTestDataFile({
      budget: {
        monthly: 5000,
        categories: {
          Food: 1500,
          Transport: 800,
          Bills: 1200,
          Entertainment: 500,
          Other: 1000,
        },
      },
      expenses: [
        {
          id: "expense-1",
          amount: 150,
          category: "Food",
          description: "Lunch",
          date: "2026-04-01",
        },
      ],
    });

    deleteExpenseById("expense-1", { filePath });
    const data = readTestJson(filePath);

    expect(data.expenses).toHaveLength(0);
  });

  test("deleting with an invalid or non-existent ID returns a not-found error", () => {
    const { filePath } = createTestDataFile();

    expect(() => deleteExpenseById("missing-id", { filePath })).toThrow(
      "Expense with ID missing-id was not found.",
    );
  });
});
