import Tools from "./Tools";
import logo from "../images/logo.png";
import Home from "../Home";
import { FirebaseAuthConsumer, IfFirebaseUnAuthed, IfFirebaseAuthed } from "@react-firebase/auth";
import { Button } from "@material-ui/core";
import {Link} from "react-router-dom";

function NavBar(props) {

  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  
  const handleLogout = (firebase) => {
    firebase.auth().signOut();
  };

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
            <IfFirebaseUnAuthed>
            <FirebaseAuthConsumer>
              {({ firebase }) => (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleGoogleSignIn(firebase)}
                >
                  Sign in with Google
                </Button>
              )}
            </FirebaseAuthConsumer>
            </IfFirebaseUnAuthed>
            <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <Button color="inherit" onClick={() => handleLogout(firebase)}>
              Logout
            </Button>
          )}
        </IfFirebaseAuthed> 
           
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

{/* <IfFirebaseUnAuthed>
            <FirebaseAuthConsumer>
              {({ firebase }) => (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleGoogleSignIn(firebase)}
                >
                  Sign in with Google
                </Button>
              )}
            </FirebaseAuthConsumer>
            </IfFirebaseUnAuthed>
            <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <Button color="inherit" onClick={() => handleLogout(firebase)}>
              Logout
            </Button>
          )}
        </IfFirebaseAuthed> */}