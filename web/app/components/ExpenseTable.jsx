export default function ExpenseTable({ expenses }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-panel">
        <p className="text-sm text-slate-600">No expenses recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-panel">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-900 text-left text-xs uppercase tracking-[0.25em] text-slate-100">
          <tr>
            <th className="px-4 py-4">Date</th>
            <th className="px-4 py-4">Category</th>
            <th className="px-4 py-4">Description</th>
            <th className="px-4 py-4 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200/70">
          {expenses.map((expense) => (
            <tr key={expense.id} className="text-slate-700">
              <td className="px-4 py-4">{expense.date}</td>
              <td className="px-4 py-4">{expense.category}</td>
              <td className="px-4 py-4">{expense.description}</td>
              <td className="px-4 py-4 text-right font-semibold">
                PHP {Number(expense.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
