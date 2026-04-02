export default function BudgetAlert({ warnings }) {
  if (warnings.length === 0) {
    return (
      <div className="rounded-[2rem] border border-moss/20 bg-moss/10 p-5 text-sm text-moss">
        All budgets are currently within limits.
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-berry/20 bg-berry/10 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-berry">
        Budget Warnings
      </h2>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {warnings.map((warning) => (
          <li key={`${warning.type}-${warning.category || warning.month}`}>{warning.message}</li>
        ))}
      </ul>
    </div>
  );
}
