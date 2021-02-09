import React, { useState, useEffect } from "react";
import Navbaar from "./components/navbar/navbaar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm/loginForm";
import SignupForm from "./components/SignupForm/signupForm";
import UserContext from "./context/userContext";
import Messaging from "./components/MessagingPage/messaging";
import Home from "./components/Home/home";
import axios from "./axios";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("/tokenisValid", null, {
        headers: { "x-auth-token": token },
      });

      if (tokenRes.data) {
        const userRes = await axios.get("/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);


  return (
    <Router>
      <React.Fragment>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbaar />
          <Switch>
            <Route path="/messaging" component={Messaging} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/" component={Home} />
          </Switch>
        </UserContext.Provider>
      </React.Fragment>
    </Router>
  );
}
