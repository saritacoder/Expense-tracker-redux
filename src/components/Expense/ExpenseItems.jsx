/* eslint-disable react/prop-types */
import { useState } from 'react';

import trash from '../../assets/trash.svg';
import { EditIcon } from '../../assets/Icons';

import ExpenseForm from './ExpenseForm';

export default function ExpenseItems(props) {
  const [editExpense, setEditExpense] = useState(false);

  async function handleDelete() {
    const response = await fetch(
      `https://expense-tracker-826be-default-rtdb.firebaseio.com/expenses/${props.id}.json`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      props.onDeleteExpense(props.id, props.amount);
    }
  }

  function handleEdit(editedExpense) {
    props.onEditExpense(editedExpense);
    setEditExpense(false);
  }

  return (
    <>
      <li className="w-full flex justify-between items-center border-b-4 border-b-stone-500 p-2">
        <div className="w-24">
          <span className="font-semibold text-xl">{props.category}</span>
          <p className="ml-2 italic">{props.description}</p>
        </div>
        <span className="w-24 text-end">₹ {props.amount}.00</span>
        <div className=" text-end">
          <button className="p-2" onClick={() => setEditExpense(true)}>
            <EditIcon />
          </button>
          <button className="p-2" onClick={handleDelete}>
            <img src={trash} alt="delete icon" />
          </button>
        </div>
      </li>
      {editExpense && (
        <ExpenseForm
          editExpense={editExpense}
          id={props.id}
          category={props.category}
          description={props.description}
          amount={props.amount}
          onEdit={handleEdit}
          onCloseForm={() => setEditExpense(false)}
        />                         
      )}
    </>
  );
}





// if (response.ok) {
//   props.onDeleteExpense(props.id, props.amount);
// }

// Purpose:
// Checks if the DELETE request was successful (response.ok is true).
// Usage:
// Calls the onDeleteExpense function (passed as a prop) with the expense's id and amount. This function typically updates the parent component's state to remove the deleted expense.


