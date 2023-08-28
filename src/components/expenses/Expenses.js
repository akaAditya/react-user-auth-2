import React, { useEffect, useRef, useState } from "react";
import "./Expenses.css";
import axios from "axios";

const Expenses = () => {
  // const [expenses, setExpenses] = useState([]);
  const [select, setSelect] = useState();
  const [selectUpdate, setSelectUpdate] = useState();
  const [data, setData] = useState([]);
  // const [updateData, setUpdateData] = useState([]);
  const [expenseId, setExpenseId] = useState(null);
  const [show, setShow] = useState(false);

  const inputMoney = useRef();
  const inputDescription = useRef();
  // const inputDropDown = useRef();

  const updateMoney = useRef();
  const updateDescription = useRef();
  // const updateDropDown = useRef();

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
  const handleUpdateSelect = (event)=>{
    setSelectUpdate(event.target.value)
  }
  const showEditForm = (id) => {
    setShow(true);
    const elementId = id;
    setExpenseId(elementId);
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
       await axios(
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
      // const data = postResponse.data;
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
  // const dataKey = Object.entries(data);
  // const res = dataKey.map((key) => {
  //   return key[0];
  // });

  const expenseDeleteHandler = async (id) => {
    await axios.delete(
      `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses/${id}.json`
    );
    console.log("successfully expense deleted");
  };

  const expenseUpdateHandler = async () => {
    console.log(expenseId, "from expenseID update handler");

    const enteredInputMoney = updateMoney.current.value;
    const enteredInputDescription = updateDescription.current.value;
    // const enteredInputDropDown = updateDropDown.current.value;
    try {
      const response = await fetch(
        `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
        {
          method: "PUT",
          data: JSON.stringify({
            description: enteredInputDescription,
            money: enteredInputMoney,
            expenseOn: selectUpdate,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(response.json(), 'getting reesponse')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        {!show && (
          <form className="expense-form" onSubmit={submitExpenseFormHandler}>
            <label className="money-label">Spent Money</label>
            <input type="number" id="money" ref={inputMoney} />
            <label>Description</label>
            <input type="text" ref={inputDescription} />
            <select onChange={handleSelect} value={select}>
              {options.map((option) => (
                <option value={option.label} key={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <button>Add Expenses</button>
          </form>
        )}
      </div>
      <div>
        <>
          {Object.entries(data).map((expense) => (
            <ul className="expenses-list" key={Math.random().toString()}>
              <li>
                {expense[1].money} - {expense[1].description} -
                {expense[1].expenseOn} -
                <button onClick={() => expenseDeleteHandler(expense[0])}>
                  Delete
                </button>
                -<button onClick={() => showEditForm(expense[0])}>Edit</button>
              </li>
              {/* <li>{expense.description}</li>
              <li>{expense.expenseOn}</li> */}
            </ul>
          ))}
        </>
      </div>
      {/* <div>{!show && <UpdateExpense id={expenseId} />}</div> */}
      <div>
        {show && (
          <form
            className="expense-form"
            onSubmit={(e) => {
              e.preventDefault();
              expenseUpdateHandler();
            }}
          >
            <label className="money-label">Spent Money</label>
            <input type="number" id="money" ref={updateMoney} />
            <label>Description</label>
            <input type="text" ref={updateDescription} />
            <select onChange={handleUpdateSelect} value={selectUpdate}>
              {/* <option disabled>Select</option> */}
              <option value="Daily needs">Daily Needs</option>
              <option value="Petrol">Petrol</option>
              <option value="Bills">Bills</option>
            </select>
            <input type="submit" value='Update'/>
          </form>
        )}
      </div>
    </div>
  );
};

export default Expenses;
