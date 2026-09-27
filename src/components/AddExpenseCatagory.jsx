import { useRef, useEffect, useState } from "react";

export default function AddExpenseCatagory({
  addExpense,
  addCatagory,
  catagories,
}) {
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [addCatagoryOpen, setAddCatagoryOpen] = useState(false);
  const [showCatagoryWarning, setShowCatagoryWarning] = useState(false);
  const [submittedCatagory, setSubmittedCatagory] = useState(false);
  const [submittedExpense, setSubmittedExpense] = useState(false);
  const [requiredForm, setRequiredForm] = useState(false);

  const catagoryInputRef = useRef(null);
  const amountInputRef = useRef(null);

  useEffect(() => {
    if (addCatagoryOpen) {
      catagoryInputRef.current?.focus();
    }
  }, [addCatagoryOpen]);
  useEffect(() => {
    if (addExpenseOpen) {
      amountInputRef.current?.focus();
    }
  }, [addExpenseOpen]);

  function handleAddExpense(event) {
    event.preventDefault();

    const form = event.target;
    const amount = parseFloat(form.amount.value);
    const catagory = form.catagory.value;
    const description = form.description.value;

    if (!isNaN(amount) && catagory) {
      setRequiredForm(false);

      const newExpense = {
        id: Date.now(),
        amount,
        catagory,
        description,
      };
      addExpense(newExpense);
      setSubmittedExpense(true);
      form.reset();
    } else {
      setRequiredForm(true);
      form.reset();
    }
  }

  function handleAddCatagory(event) {
    event.preventDefault();

    const form = event.target;
    const catagory = form.catagory.value;

    if (catagory) {
      setRequiredForm(false);

      const newCatagory = catagory;
      addCatagory(newCatagory);
      setShowCatagoryWarning(false);
      setSubmittedCatagory(true);
      form.reset();
    } else {
      setRequiredForm(true);
      form.reset();
    }
  }

  return (
    <div className="add-expense-catagory">
      <button
        className="add-expense-button"
        onClick={() => {
          if (catagories.length === 0) {
            setShowCatagoryWarning(true);
          } else {
            setAddExpenseOpen(true);
          }
        }}
        aria-disabled={catagories.length === 0}
      >
        Add expense
      </button>

      {addExpenseOpen && (
        <div
          className="add-expense-form"
          onClick={() => setAddExpenseOpen(false)}
        >
          <form
            className="expense-form"
            onSubmit={handleAddExpense}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add expense</h2>
            {requiredForm && (
              <p className="form-warning">Please fill in the required filds.</p>
            )}

            <label>
              {" "}
              Amount spent:
              <input
                type="number"
                placeholder="100"
                name="amount"
                ref={amountInputRef}
              />
            </label>

            <label>
              {" "}
              Catagory:
              <select defaultValue="" name="catagory">
                <option value="" disabled>
                  Select a category
                </option>
                {catagories.map((catagory) => (
                  <option key={catagory} value={catagory}>
                    {catagory}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Description:
              <input type="text" placeholder="Description" name="description" />
            </label>
            <button type="submit" className="save-expense-button">
              Save expense
            </button>
            {submittedExpense && (
              <p className="saved-expense">Sucessfully saved!</p>
            )}
            <button
              type="button"
              className="close-expense-button"
              onClick={() => setAddExpenseOpen(false)}
            >
              Close
            </button>
          </form>
        </div>
      )}
      <button
        className="add-catagory-button"
        onClick={() => setAddCatagoryOpen(true)}
      >
        Add category
      </button>
      {addCatagoryOpen && (
        <div
          className="add-catagory-open"
          onClick={() => setAddCatagoryOpen(false)}
        >
          <form
            className="catagory-form"
            onSubmit={handleAddCatagory}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add category</h2>
            {requiredForm && (
              <p className="form-warning">Please fill in the required filds.</p>
            )}

            <label>
              Catagory name:
              <input
                type="text"
                placeholder="Catagory name"
                name="catagory"
                ref={catagoryInputRef}
              />
            </label>
            <button type="submit" className="save-catagory-button">
              save catagory
            </button>
            {submittedCatagory && (
              <p className="saved-catagory">Sucessfully saved!</p>
            )}
            <button
              type="button"
              className="close-catagory-button"
              onClick={() => setAddCatagoryOpen(false)}
            >
              Close
            </button>
          </form>
        </div>
      )}
      {showCatagoryWarning && (
        <p className="catagory-warning">create a catagory first</p>
      )}
    </div>
  );
}
