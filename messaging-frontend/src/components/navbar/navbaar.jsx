import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";

export default function Navbaar() {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const logout = () => {
    setUserData({ token: undefined, user: undefined, displayname: undefined });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky>
      <Navbar.Brand>MESSAGING</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        {userData.user ? (
          <Nav>
            <Nav.Link onClick={logout}>LogOut</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            {/* <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link> */}
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
