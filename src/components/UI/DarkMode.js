import { useDispatch } from "react-redux";
import { themeActions } from "../../store/theme-slice";

const DarkMode = () => {
  const dispatch = useDispatch();

  const themeChangeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };
  return (
    <div>
      <button
        style={{
          marginTop: "20px",
          marginLeft:'20%',
          width: "120px",
          height: "30px",
          backgroundColor: "green",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          color: 'white'
        }}
        onClick={() => themeChangeHandler()}
      >
        Premium
      </button>
    </div>
  );
};

export default DarkMode;
