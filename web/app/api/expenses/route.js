import { NextResponse } from "next/server";
import storage from "../../../../cli/utils/storage.js";

const { readData } = storage;

export function GET() {
  const data = readData();
  return NextResponse.json({ expenses: data.expenses });
}
