import { React, useState, useContext } from "react";
import UserContext from "../../context/userContext";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import ErrorNotice from "../misc/ErrorNotice";
import axios from "../../axios";

export default function LoginForm() {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const { setUserData } = useContext(UserContext);
  const [error, setError] = useState();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post("/login", {
        email: userEmail,
        password: userPassword,
      });
      setUserData({ token: loginRes.data.token, user: loginRes.data.user });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/messaging");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <Container
      style={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}
    >
      <Form style={{ width: "50rem" }} onSubmit={handleSubmit}>
        <Form.Label style={{ fontSize: "3rem" }}>Login</Form.Label>
        {error && <ErrorNotice message={error} />}
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>{" "}
        <Button variant="secondary" type="submit" as={Link} to="/signup">
          Create an account
        </Button>
      </Form>
    </Container>
  );
}
