export default function SpendingOverview({ expenses }) {
  return (
    <>
      <div className="spending-overview">
        <h2>Spending overview</h2>
        <p>
          Total spent:
          {expenses.reduce((sum, expense) => sum + expense.amount, 0)}
        </p>
        <p>Number of expenses: {expenses.length}</p>
      </div>
    </>
  );
}
