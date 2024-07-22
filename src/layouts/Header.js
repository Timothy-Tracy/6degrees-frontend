import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Col,
} from "reactstrap";
import user1 from "../assets/images/users/user1.jpg";
import { useUser } from '../context/UserContext';
import { useDebug } from "../context/DebugContext";
import { useAPI } from '../context/APIContext';

const Header = () => {
  const { status, logout, isAdmin, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [AccountMenu, setAccountMenu] = useState(<div></div>);
  const { setAPIMode, APIMode } = useAPI();
  const { debug } = useDebug();
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const AdminTest = () => {
    if (isAdmin) {
      return (
        <div onClick={() => { debug(`Admin Status: ${isAdmin}`); debug(`Login Status: ${status}`); debug(`User Obj Status: ${JSON.stringify(user)}`) }}>Welcome Admin!</div>
      )
    } else {
      console.log("Not Admin")
      return <div onClick={() => { debug(`Admin Status: ${isAdmin}`); debug(`Login Status: ${status}`); debug(`User Obj Status: ${JSON.stringify(user)}`) }}>Welcome Customer!</div>

    }
  }

  const LoginButtonObject = (
      <Button>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </Button>
  );

  const ShoppingCartButtonObject = (
      <Button className="btn-success">
        <Link to="/shoppingcart" className="nav-link ">
          Shopping Cart
        </Link>
      </Button>
  );

  //If the user login status is false, do not show the account dropdown menu
  //If the login status is true, show the account dropdown menu with logout button
  //Utilizes UserContext

  const [LoginButton, setLoginButton] = useState(LoginButtonObject);
  const [ShoppingCartButton, setShoppingCartButton] = useState(ShoppingCartButtonObject);

  useEffect(() => {
    if (status) {
      setAccountMenu(
          <div>
            <DropdownToggle color="primary">
              <img
                  src={user1}
                  alt="profile"
                  className="rounded-circle"
                  width="30"
              ></img>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem>
                <Link to="/settings" className="nav-link">
                  Settings
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
              </DropdownItem>
              {isAdmin && (
                  <DropdownItem>
                    <Link to="/admin" className="nav-link">
                      Admin Page
                    </Link>
                  </DropdownItem>
              )}
              <DropdownItem divider />
              <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
            </DropdownMenu>
          </div>
      );
      debug("AccountMenu SHOWN")
      setLoginButton(<div></div>)
      debug("LoginButton HIDDEN")
      setShoppingCartButton(ShoppingCartButtonObject)
      debug("ShoppingCartButton SHOWN")
    } else {
      setAccountMenu(<div></div>)
      debug("AccountMenu HIDDEN")
      setLoginButton(LoginButtonObject)
      debug("LoginButton SHOWN")
      setShoppingCartButton(<div></div>)
      debug("ShoppingCartButton HIDDEN")
    }
  }, [user, status, isAdmin]); // Include isAdmin in the dependency array

  return (
      <Navbar color="primary" dark expand="xs">
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link to="/store" className="nav-link">
                Store
              </Link>
            </NavItem>
            {/*<NavItem className="me-auto" navbar>*/}
            {/*  <Button onClick={() => { setAPIMode(!APIMode); logout(); }}>*/}
            {/*    API Mode:{APIMode.toString()}*/}
            {/*  </Button>*/}
            {/*</NavItem>*/}
        {/*  <NavItem>*/}
        {/*      <Link className="nav-link">*/}
        {/*        <AdminTest>*/}

        {/*        </AdminTest>*/}
        {/*      </Link>*/}
        {/*</NavItem>*/}

          </Nav>
          <div>
            {ShoppingCartButton}
          </div>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            {AccountMenu}
          </Dropdown>
          <div> {LoginButton} </div>
        </Collapse>
      </Navbar>
  );
};

export default Header;
