import {Link} from "react-router-dom";

function Tools() {

    return(
        <div class="dropdown">
        <button class="dropbtn">TOOLS</button>
        <div class="dropdown-content">
        <Link to="/budget">
              Budget Planner
              </Link>
              <Link to="/intrinsicvalue">
              Valuation Model
              </Link>
              <Link to="/compoundinterest">
              Compound Growth Calculator
              </Link>
              <Link to="/portfolio">
              Portfolio Allocator
              </Link>
        </div>
        </div>
    )
}

export default Tools;