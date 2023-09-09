import React, { useContext, useEffect, useRef, useState } from "react";
import "./Expenses.css";
import axios from "axios";
import exportFromJSON from "export-from-json";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import DarkMode from "../UI/DarkMode";
import { themeActions } from "../../store/theme-slice";
import AuthContext from "../../authStore/auth-context";

const Expenses = () => {
  const authContext = useContext(AuthContext);
  // const [expenses, setExpenses] = useState([]);
  const [select, setSelect] = useState();
  const [data, setData] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [tempId, setTempId] = useState("");
  const [showPremiumButton, setShowPremiumButton] = useState(false);
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.darkMode.isDark);

  const email = authContext.email;
  const removeAt = email.replace("@", "");
  const removeDot = removeAt.replace(".", "");
  const finalEmail = removeDot;

  const ChangeThemeColor = () => {
    dispatch(themeActions.toggleTheme());
  };

  const inputMoney = useRef();
  const inputDescription = useRef();

  // const addExpenseHandler = (expense) => {
    // return setExpenses((prev) => [...prev, expense]);
  // };

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
    // addExpenseHandler(expenseData);
    dispatch(expenseActions.addExpenses(expenseData));
    try {
      await axios(
        `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses${finalEmail}.json`,
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
      ).then((res) => setData(res.data));
      let errorMessage = "Response is not working";
      throw new Error(errorMessage);
    } catch (err) {
      console.log(err);
    }
    try {
      window.onload = axios(
        `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses${finalEmail}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => setData(res.data));
    } catch {}

    inputMoney.current.value = "";
    inputDescription.current.value = "";
    setSelect("");
    // dispatch(
    //   expenseActions.replaceCart({
    //     items: data.items || [],
    //   }))
  };
  useEffect(() => {
    // if(data.length>0){

    try {
      window.onload = axios(
        `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses${finalEmail}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => 
      // console.log(res.data)
      // setData(res.data)
      {
        if (!res.ok && res.data !== null) {
          return setData(res.data);
        } 
        else {
          return setData([]);
        }
      }
      );
    } catch {}
    // }
  }, [finalEmail]);

  // Download Data
  const downloadData = [];
  Object.entries(data).map((exp) => {
    dispatch(
      expenseActions.addExpenses({
        id: exp[0],
        description: exp[1].description,
        money: exp[1].money,
        expenseOn: exp[1].expenseOn,
      })
    );
    // console.log(expenseActions.addExpenses(), 'expenses from exp')

    return downloadData.push({
      description: exp[1].description,
      money: exp[1].money,
      expenseOn: exp[1].expenseOn,
    });
  });
  const downloadExpensesHandler = (data) => {
    const fileName = "myExpenses";
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
    let sumOfMoney = 0;
    Object.entries(data).map((exp) => {
      sumOfMoney += Number(exp[1].money);
      return sumOfMoney;
    });
    if (sumOfMoney >= 10000) {
      return setShowPremiumButton(true);
    }
  }, [data]);

  const expenseDeleteHandler = async (id) => {
    // dispatch(expenseActions.removeExpenses(id))
    // console.log(expenseActions.removeExpenses(id))
    try {
      await axios.delete(
        `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses${finalEmail}/${id}.json`
      );
    } catch {}

    console.log("successfully expense deleted");
    try {
      window.onload = await axios(
        `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses${finalEmail}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok && res.data !== null) {
          return setData(res.data);
        } 
        else {
          return setData([]);
        }
      });
    } catch {}
    // dispatch(
    //   expenseActions.replaceCart({
    //     items: [] || data,
    //   }))
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
        `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses${finalEmail}/${tempId}.json`,
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
    try {
      window.onload = axios(
        `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses${finalEmail}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => setData(res.data));
    } catch {}
    // dispatch(
    //   expenseActions.replaceCart({
    //     items: data || [],
    //   }))
  };

  return (
    <div
      className="form-data"
      style={{
        backgroundColor: dark ? "rgb(44, 40, 40)" : "white",
        color: dark ? "rgb(150, 131, 131)" : "black",
        height: "100vh",
      }}
    >
      <div>
        <button className="mode" onClick={ChangeThemeColor}>
          Mode
        </button>
      </div>
      <div className="form-data1">
        <div className="form-data2">
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
              <button
                onClick={() => setShowUpdate(false)}
                style={{ marginTop: "5px", backgroundColor: "red" }}
              >
                X
              </button>
            </>
          ) : (
            <button onClick={postExpenseHandler}>Add Expenses</button>
          )}
        </div>
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
                -<button onClick={() => handleUpdate(expense[0])}>Edit</button>
              </li>
            </ul>
          ))}
        </>
      </div>
      <div>
        <button
          style={{
            marginTop: "20px",
            marginLeft: "20%",
            width: "120px",
            height: "30px",
            backgroundColor: "rgb(161, 56, 37)",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            color: "white",
          }}
          onClick={() => downloadExpensesHandler(downloadData)}
        >
          Download
        </button>
      </div>
      <div>{showPremiumButton && <DarkMode />}</div>
    </div>
  );
};

export default Expenses;
