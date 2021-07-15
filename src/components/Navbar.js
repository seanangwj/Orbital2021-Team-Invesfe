import React,  { useContext } from "react";
import Tools from "./Tools";
import logo from "../images/logo.png";
import Home from "../Home";
import { Link } from "react-router-dom";
import AuthState from "../config/AuthState";
import { UserContext } from "./UserContext";

function NavBar() {
  
  const currentUser = useContext(UserContext);
 
    return (
      <nav>
        <a href={Home}>
          <img src={logo} />
        </a>
        <div class="navbar">
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/aboutus">ABOUT US</Link>
            </li>
            <Tools />
            <li> 
            <AuthState/>
            </li>
           
          </ul>
        </div>
      </nav>
    );
  }


export default NavBar;

