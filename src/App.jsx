import { useState } from "react";
import "./App.css";
import Dashboard from "./components/DashBoard";
import SpendingOverview from "./components/SpendingOverview";
import AddExpenseCatagory from "./components/AddExpenseCatagory";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [search, setSearch] = useState("");

  const filteredExpenses = expenses.filter((expense) => {
    return (
      expense.catagory.toLowerCase().includes(search.toLowerCase()) ||
      expense.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  function addExpense(expense) {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  }

  function addCatatgory(catagory) {
    setCatagories((prevCatagory) => [...prevCatagory, catagory]);
  }

  return (
    <>
      <Dashboard
        catagories={catagories}
        search={search}
        expenses={expenses}
        setSearch={setSearch}
      />
      <SpendingOverview expenses={expenses} />
      <AddExpenseCatagory
        addExpense={addExpense}
        addCatagory={addCatatgory}
        catagories={catagories}
      />
      <ExpenseList expenses={filteredExpenses} />
    </>
  );
}
