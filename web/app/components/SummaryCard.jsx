export default function SummaryCard({ category, total, limit }) {
  const overBudget = typeof limit === "number" && total > limit;

  return (
    <article className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-panel">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{category}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">
        PHP {Number(total).toFixed(2)}
      </p>
      <p className={`mt-2 text-sm ${overBudget ? "text-berry" : "text-slate-500"}`}>
        {typeof limit === "number"
          ? `Budget: PHP ${Number(limit).toFixed(2)}`
          : "No budget set"}
      </p>
    </article>
  );
}
