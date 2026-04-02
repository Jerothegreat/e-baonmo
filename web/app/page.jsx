import BudgetAlert from "./components/BudgetAlert";
import ExpenseTable from "./components/ExpenseTable";
import SummaryCard from "./components/SummaryCard";
import storage from "../../cli/utils/storage.js";
import budgetUtils from "../../cli/utils/budget.js";

const { getCategorySummary, readData } = storage;
const { getBudgetWarnings, getCurrentMonthKey } = budgetUtils;

export default function Page({ searchParams }) {
  const data = readData();
  const categoryFilter = searchParams?.category?.trim() || "";
  const expenses = categoryFilter
    ? data.expenses.filter(
        (expense) => expense.category.toLowerCase() === categoryFilter.toLowerCase(),
      )
    : data.expenses;
  const summary = getCategorySummary(expenses);
  const warnings = getBudgetWarnings(data, getCurrentMonthKey());

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-white/80 bg-white/70 p-8 shadow-panel backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-clay">E-baonmo</p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
              Track expenses without leaving your machine.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Shared local storage powers both the CLI and this dashboard. Filter by category
              using the query string, for example <code>?category=Food</code>.
            </p>
          </div>
          <div className="rounded-[2rem] bg-slate-900 px-5 py-4 text-sm text-slate-100">
            Viewing {expenses.length} expense{expenses.length === 1 ? "" : "s"}
            {categoryFilter ? ` in ${categoryFilter}` : ""}
          </div>
        </div>
      </section>

      <BudgetAlert warnings={warnings} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Object.keys(summary).length === 0 ? (
          <SummaryCard category="No data" total={0} />
        ) : (
          Object.entries(summary).map(([category, total]) => (
            <SummaryCard
              key={category}
              category={category}
              total={total}
              limit={data.budget.categories[category]}
            />
          ))
        )}
      </section>

      <ExpenseTable expenses={expenses} />
    </main>
  );
}
