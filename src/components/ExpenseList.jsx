export default function ExpenseList({ expenses }) {
  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-item">
          <p>Expense:</p>
          <p>Amount:{expense.amount}</p>
          <p>Catagory:{expense.catagory}</p>
          <p>Description:{expense.description}</p>
        </div>
      ))}
    </div>
  );
}
