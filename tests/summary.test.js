const { getSummary } = require("../cli/utils/storage");
const { createTestDataFile } = require("./helpers");

describe("summary", () => {
  test("summary correctly totals amounts grouped by category", () => {
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
          id: "1",
          amount: 150,
          category: "Food",
          description: "Lunch",
          date: "2026-04-01",
        },
        {
          id: "2",
          amount: 75,
          category: "Food",
          description: "Snack",
          date: "2026-04-02",
        },
        {
          id: "3",
          amount: 120,
          category: "Transport",
          description: "Taxi",
          date: "2026-04-02",
        },
      ],
    });

    expect(getSummary({ filePath })).toEqual({
      Food: 225,
      Transport: 120,
    });
  });
});
