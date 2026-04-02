import { NextResponse } from "next/server";
import storage from "../../../../../cli/utils/storage.js";

const { getCategorySummary, readData } = storage;

export function GET() {
  const data = readData();
  return NextResponse.json({ summary: getCategorySummary(data.expenses) });
}
