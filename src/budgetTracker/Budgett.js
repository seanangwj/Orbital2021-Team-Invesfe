import React, { useState, useContext } from "react";
import ViewBudget from "./ViewBudget";
import EditBudget from "./EditBudget";
import { AppContext } from "./AppContext";

const Budgett = (props) => {
  const { dispatch } = useContext(AppContext);
  const { budget, needs, wants, financialGoals } = props;
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (value) => {
    dispatch({
      type: "SET_BUDGET",
      payload: value,
    });
    setIsEditing(false);
  };

  return (
    <div class="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <EditBudget handleSaveClick={handleSaveClick} budget={budget} />
      ) : (
        // For part 1 render component inline rather than create a seperate one
        <ViewBudget
          handleEditClick={handleEditClick}
          budget={budget}
          needs={needs}
          wants={wants}
          financialGoals={financialGoals}
        />
      )}
    </div>
  );
};

export default Budgett;
