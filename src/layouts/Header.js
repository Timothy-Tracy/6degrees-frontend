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
  Container,
  Input,
  ButtonDropdown,
  InputGroup,
} from "reactstrap";
import user1 from "../assets/images/users/user1.jpg";
import { useUser } from '../components/context/UserContext';
import { useDebug } from "../components/context/DebugContext";
import { useAPI } from '../components/context/APIContext';
import { useLoginModal } from "../components/auth/LoginModalContext";
import HeaderSearchBar from "./HeaderSearchBar";

const Header = () => {
  const { status, logout, isAdmin, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [AccountMenu, setAccountMenu] = useState(<div></div>);
  const { setAPIMode, APIMode } = useAPI();
  const { debug } = useDebug();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { openModal } = useLoginModal()
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
    <Button onClick={() => openModal()}>
      Login
    </Button>
  );



  //If the user login status is false, do not show the account dropdown menu
  //If the login status is true, show the account dropdown menu with logout button
  //Utilizes UserContext

  const [LoginButton, setLoginButton] = useState(LoginButtonObject);

  useEffect(() => {
    if (status) {
      setAccountMenu(
        <div>
          <DropdownToggle color="primary">
            Menu
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>
              <Link to="/settings" className="nav-link">
                Settings
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

    } else {
      setAccountMenu(<div></div>)
      debug("AccountMenu HIDDEN")
      setLoginButton(LoginButtonObject)
      debug("LoginButton SHOWN")

    }
  }, [user, status, isAdmin]); // Include isAdmin in the dependency array

  return (
    <Navbar className='border-bottom' sticky='top' color="black" dark expand="xs">
      <Col lg={4}>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Container className='px-3'>
                <Link to='/welcome'>

                </Link><h1>6°</h1>

              </Container>


            </NavItem>
            <NavItem>
              <Link to="/profile" className="nav-link" >
                Profile
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/posts/create" className="nav-link">
                Create Post
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Col>
      <Col lg={4}>
      <HeaderSearchBar></HeaderSearchBar>
        
        
      </Col>
      <Col>
        <Container className='px-3 text-end'>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            {AccountMenu}
          </Dropdown>

          {LoginButton}
        </Container>
      </Col>





    </Navbar>
  );
};

export default Header;
