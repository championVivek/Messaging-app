import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import LoginForm from "../LoginForm/loginForm";
import Messaging from "../MessagingPage/messaging";

export default function Home() {
  const { userData } = useContext(UserContext);

  return <div>{userData.user ? <Messaging /> : <LoginForm />}</div>;
}
