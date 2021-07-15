import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { db, fire } from "../config/Firebase.js";
import { UserContext} from "../components/UserContext";


const AddExpenseForm = (props) => {
  const { dispatch } = useContext(AppContext);
  const currentUser = useContext(UserContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState(1);

  const onSubmit = (event) => {
    event.preventDefault();
    const expense = {
      id: uuidv4(),
      name,
      cost: parseInt(cost),
      category: category,
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });

    setName("");
    setCost("");
    setCategory(1);
  };

  
  
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div class="row">
        <div class="col-sm col-lg-4">
          <label for="name">Item</label>
          <input
            required="required"
            type="text"
            class="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div class="col-sm col-lg-4">
          <label for="cost">Cost</label>
          <input
            required="required"
            type="number"
            class="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
        </div>
        <div class="col-sm col-lg-4">
          <label for="category">Category</label>
          <DropdownButton
            id="dropdownMenuButton"
            title={
              // category == 0
              //   ? "Select"
                category == 1
                ? "Needs"
                : category == 2
                ? "Wants"
                : "Financial Goals"
            }
          >
            <Dropdown.Item onClick={() => setCategory(1)}>Needs</Dropdown.Item>
            <Dropdown.Item onClick={() => setCategory(2)}>Wants</Dropdown.Item>
            <Dropdown.Item onClick={() => setCategory(3)}>
              Financial Goals
            </Dropdown.Item>
          </DropdownButton>
          </div>
      </div>
      <div class="row mt-3">
        <div class="col-sm">
          <button type="submit" class="btn btn-primary">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
