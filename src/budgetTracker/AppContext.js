import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { db, fire } from "../config/Firebase.js";
import { UserContext } from "../components/UserContext";


// 5. The reduceer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  const currentUser = useContext(UserContext);

  const updateVariables = (variables) => {
    if (currentUser != null) {
      db.child("users")
        .child(currentUser.uid)
        .child("budget")
        .child("budgettracker")
        .child("expenseTotal")
        .set(variables);
    }
  };
  let newVariables = [];
  switch (action.type) {
    case "ADD_EXPENSE":
      newVariables = {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
      updateVariables(newVariables);
      return newVariables;

    case "DELETE_EXPENSE":
      newVariables = {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
      updateVariables(newVariables);
      return newVariables;
    case "SET_BUDGET":
      newVariables = {
        ...state,
        budget: action.payload,
      };
      updateVariables(newVariables);
      return newVariables;

    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads

// const [initialState, setState] = useState({
// 	expenses: [],
// });

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  const [initialState, setState] = useState({
    expenses: [],
  });

  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);


  // 5. Returns our context. Pass in the values we want to expose
  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

