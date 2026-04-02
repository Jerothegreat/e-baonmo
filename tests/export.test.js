const fs = require("fs");
const path = require("path");
const { exportExpensesToCsv } = require("../cli/commands/export");
const { createTestDataFile } = require("./helpers");

describe("export", () => {
  test("export command generates a valid, properly formatted csv file", () => {
    const { filePath, directory } = createTestDataFile({
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

    const outputPath = path.join(directory, "expenses.csv");
    exportExpensesToCsv(outputPath, { filePath });
    const csv = fs.readFileSync(outputPath, "utf8");

    expect(csv).toContain("\"id\",\"amount\",\"category\",\"description\",\"date\"");
    expect(csv).toContain("\"expense-1\",150,\"Food\",\"Lunch\",\"2026-04-01\"");
  });
});
