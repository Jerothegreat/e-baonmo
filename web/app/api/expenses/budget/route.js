import { NextResponse } from "next/server";
import budgetUtils from "../../../../../cli/utils/budget.js";
import storage from "../../../../../cli/utils/storage.js";

const { getBudgetWarnings, getCurrentMonthKey } = budgetUtils;
const { readData } = storage;

export function GET() {
  const data = readData();

  return NextResponse.json({
    budget: data.budget,
    warnings: getBudgetWarnings(data, getCurrentMonthKey()),
  });
}
