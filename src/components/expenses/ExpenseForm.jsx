import React from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ expenseInput, handleChange, handleFormSubmission, closeForm }) => {
  return (
    <form onSubmit={handleFormSubmission} className="expense-form">
      
      <label htmlFor="price" className="form-label">
        Expense Amount:
      </label>
      <input
        type="number"
        id="price"
        name="price"
        value={expenseInput.price}
        onChange={handleChange}
        placeholder="Expense Amount"
      />

      <label htmlFor="expenseTitle" className="form-label">
        Description:
      </label>
      <input
        type="text"
        id="expenseTitle"
        name="expenseTitle"
        value={expenseInput.expenseTitle}
        onChange={handleChange}
        placeholder="About It"
      />

      <label htmlFor="category" className="form-label">
        Category:
      </label>
      <select
        id="category"
        name="category"
        value={expenseInput.category}
        onChange={handleChange}
        className="form-select"
      >
        <option disabled>Expenses Category</option>
        <option value="Fuel">Fuel</option>
        <option value="Food">Food</option>
        <option value="Electricity">Electricity</option>
        <option value="Movie">Movie</option>
      </select>
      <ul className="btnList">
        <button type="submit" className="btn btn-success">
          {expenseInput.id ? "Update Expense" : "Add Expense"}
        </button>{" "}
        <button type="button" className="btn btn-secondary" onClick={closeForm}>
          Cancel
        </button>
      </ul>
    </form>
  );
};

export default ExpenseForm;