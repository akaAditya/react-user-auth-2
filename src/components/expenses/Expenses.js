import React, { useEffect, useRef, useState } from "react";
import "./Expenses.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import { themeActions } from "../../store/theme-slice";
import DownloadLink from "react-download-link";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [select, setSelect] = useState();
  const [data, setData] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [tempId, setTempId] = useState("");
  const [showPremiumButton, setShowPremiumButton] = useState(false);

  // Theme light/dark
  const dispatch = useDispatch();
  // const darkMode = useSelector((state) => state.theme.darkMode);
  const themeChangeHandler = () => {
    dispatch(themeActions());
  };

  const inputMoney = useRef();
  const inputDescription = useRef();

  const addExpenseHandler = (expense) => {
    return setExpenses((prev) => [...prev, expense]);
  };

  const options = [
    { label: "Select", id: 0 },
    { label: "Daily needs", id: 1 },
    { label: "Petrol", id: 2 },
    { label: "Bills", id: 3 },
  ];
  const handleSelect = (event) => {
    setSelect(event.target.value);
  };

  const postExpenseHandler = async (event) => {
    event.preventDefault();
    const enteredInputMoney = inputMoney.current.value;
    const enteredInputDescription = inputDescription.current.value;

    const expenseData = {
      money: enteredInputMoney,
      description: enteredInputDescription,
      expenseOn: select,
    };
    addExpenseHandler(expenseData);
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

  let downloadData;
  Object.entries(data).map((exp) => {
    dispatch(expenseActions.expenses(exp[1].description));
    dispatch(expenseActions.expenses(exp[1].money));
    dispatch(expenseActions.expenses(exp[1].expenseOn));

    downloadData = {
      description: exp[1].description,
      money: exp[1].money,
      expenseOn: exp[1].expenseOn
    }
  });
  console.log(downloadData)

  useEffect(() => {
    let sumOfMoney = 0;
    window.onload = Object.entries(data).map((exp) => {
      sumOfMoney += Number(exp[1].money);
    });
    if (sumOfMoney >= 10000) {
      setShowPremiumButton(true);
    }
  }, [data]);

  const expenseDeleteHandler = async (id) => {
    await axios.delete(
      `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses/${id}.json`
    );
    console.log("successfully expense deleted");
  };

  const handleUpdate = (id) => {
    setShowUpdate(true);
    setTempId(id);
  };

  const expenseUpdateHandler = async () => {
    const enteredInputMoney = inputMoney.current.value;
    const enteredInputDescription = inputDescription.current.value;

    try {
      await fetch(
        `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses/${tempId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: enteredInputDescription,
            money: enteredInputMoney,
            expenseOn: select,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
    setShowUpdate(false);
    inputMoney.current.value = "";
    inputDescription.current.value = "";
    setSelect("");
  };

  return (
    <div>
      <div>
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
        {showUpdate ? (
          <>
            <button onClick={expenseUpdateHandler}>Update Expense</button>
            <button onClick={() => setShowUpdate(false)}>X</button>
          </>
        ) : (
          <button onClick={postExpenseHandler}>Add Expenses</button>
        )}
      </div>
      <div>
        <>
          {expenses.map((expense) => (
            <ul>
              <li key={Math.random().toString()}>
                {expense.money} - {expense.description} - {expense.expenseOn} -
                <button>Delete</button>-<button>Edit</button>
              </li>
            </ul>
          ))}
          {Object.entries(data).map((expense) => (
            <ul className="expenses-list" key={Math.random().toString()}>
              <li>
                {expense[1].money} - {expense[1].description} -
                {expense[1].expenseOn} -
                <button onClick={() => expenseDeleteHandler(expense[0])}>
                  Delete
                </button>
                -<button onClick={() => handleUpdate(expense[0])}>Edit</button>
              </li>
            </ul>
          ))}
        </>
      </div>
            <DownloadLink label='Save Expenses' filename="myExpenses.csv" exportFile={()=> downloadData} />
      <div>
        
      </div>
      <div>
        {showPremiumButton && (
          <button onClick={themeChangeHandler}>Premium</button>
        )}
      </div>
    </div>
  );
};

export default Expenses;
