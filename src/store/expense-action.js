// import { useSelector } from "react-redux";
// import { expenseActions } from "./expense-slice";

// export const FetchExpData = () => {
//     const email = useSelector((state)=>state.email)
//     console.log(email,'from actions')
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(
//         `https://react-authentication-part2-default-rtdb.firebaseio.com/expenses${email}.json`
//       );

//       if (!response.ok) {
//         throw new Error("Could not fetch cart data!");
//       }

//       const data = await response.json();
//       return data;
//     };

//     try {
//       const expData = await fetchData();
//       console.log(expData);
//       dispatch(
//         expenseActions.replaceExpenses({
//           items: expData.items || [],
//           totalQuantity: expData.totalQuantity,
//         })
//       );
//     } catch (error) {}
//   };
// };
