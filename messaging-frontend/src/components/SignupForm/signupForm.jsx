import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import ErrorNotice from "../misc/ErrorNotice";
import axios from "../../axios";

export default function SignupForm() {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userGender, setUserGender] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/signup", {
        name: userName,
        gender: userGender,
        email: userEmail,
        password: userPassword,
      });
      history.push("/login");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <Container
      style={{ display: "flex", justifyContent: "center", paddingTop: "2rem", paddingBottom: "8%" }}
    >
      <Form style={{ width: "50rem" }} onSubmit={handleSubmit}>
        <Form.Label style={{ fontSize: "3rem" }}>Signup</Form.Label>
        {error && <ErrorNotice message={error} />}
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Male"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                onChange={(e) => setUserGender("Male")}
              />
              <Form.Check
                type="radio"
                label="Female"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                onChange={(e) => setUserGender("Female")}
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
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
          Signup
        </Button>{" "}
        <Button variant="secondary" type="submit" as={Link} to="/login">
          Already have an account?
        </Button>
      </Form>
    </Container>
  );
}
