import React, { useEffect, useRef, useState } from "react";
import "./Expenses.css";
import axios from "axios";

const Expenses = () => {
  // const [expenses, setExpenses] = useState([]);
  const [select, setSelect] = useState();
  const [data, setData] = useState([]);
  const inputMoney = useRef();
  const inputDescription = useRef();

  // const addExpenseHandler = (expense) => {
  //   return setExpenses((prev) => [expense, ...prev]);
  // };

  const options = [
    { label: "Daily needs", id: 1 },
    { label: "Petrol", id: 2 },
    { label: "Bills", id: 3 },
  ];
  const handleSelect = (event) => {
    setSelect(event.target.value);
  };

  const submitExpenseFormHandler = async (event) => {
    event.preventDefault();
    const enteredInputMoney = inputMoney.current.value;
    const enteredInputDescription = inputDescription.current.value;
    // const enteredInputDropDown = inputDropDown.current.value;

    // const expenseData = {
    //   money: enteredInputMoney,
    //   description: enteredInputDescription,
    //   expenseOn: select,
    // };
    // addExpenseHandler(expenseData);
    try {
      const postResponse = await axios(
        "https://react-authentication-part2-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          data: JSON.stringify({
            description: enteredInputDescription,
            money: enteredInputMoney,
            expenseOn: select,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = postResponse.data;
      console.log(data);
      let errorMessage = "Response is not working";
      throw new Error(errorMessage);
    } catch (err) {
      console.log(err);
    }

    inputMoney.current.value = "";
    inputDescription.current.value = "";
    setSelect("");
  };
  useEffect(() => {
    try {
      window.onload = axios(
        "https://react-authentication-part2-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => setData(res.data));
    } catch {}
  }, []);
  console.log(data);

  return (
    <div>
      <div>
        <form className="expense-form" onSubmit={submitExpenseFormHandler}>
          <label className="money-label">Spent Money</label>
          <input type="number" id="money" ref={inputMoney} />
          <label>Description</label>
          <input type="text" ref={inputDescription} />
          <select onChange={handleSelect}>
            {options.map((option) => (
              <option value={option.label} key={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <button>Add Expenses</button>
        </form>
      </div>
      <div>
        <>
          {Object.values(data).map((expense) => (
            <ul className="expenses-list" key={Math.random().toString()}>
              <li>
                {expense.money} - {expense.description} - {expense.expenseOn}
              </li>
              {/* <li>{expense.description}</li>
              <li>{expense.expenseOn}</li> */}
            </ul>
          ))}
        </>
      </div>
    </div>
  );
};

export default Expenses;
