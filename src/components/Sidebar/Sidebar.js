/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink as NavLinkRRD, Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Logo from "../../assets/fotor_2023-1-25_16_1_8.png";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { auth } from "../../variables/FirebaseConfig";

const Sidebar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [collapseOpen, setCollapseOpen] = useState();

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setName(user.displayName);
        if (user.photoURL) {
          setPhotoUrl(user.photoURL);
        }
      } else {
        setLoggedIn(false);
      }
    });
  };

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photoURL, setPhotoUrl] = useState(
    "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg"
  );

  useEffect(getUser, []);

  return loggedIn ? (
    <Navbar
      className="navbar-vertical fixed-left navbar-dark bg-dark"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            {/* <img src="" alt="logo" /> */}
            <img src={Logo} alt="" width="auto" height="auto" />{" "}
            <span className="ml-2">FlexiCoins</span>
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="" src={photoURL} />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">{name}</h6>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem
                onClick={async () => {
                  alert("You're logging Out");
                  try {
                    await signOut(auth);
                    navigate("/auth/login");
                  } catch (error) {
                    toast.error("Error: " + error.code);
                  }
                }}
              >
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>Flexicoins</Link>
                  ) : (
                    <a href={logo.outterLink}>Flexicoins</a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          <h6 className="navbar-heading text-muted">Transactions</h6>
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem
              onClick={() => {
                props.setModal(true);
                props.setModal2(false);
                closeCollapse();
              }}
              type="button"
            >
              <NavLink>
                <i className="fa-solid fa-money-bill-1"></i>
                Buy Currency
              </NavLink>
            </NavItem>

            <NavItem
              onClick={() => {
                props.setModal2(true);
                props.setModal(false);
                closeCollapse();
              }}
              type="button"
            >
              <NavLink>
                <i className="fa-brands fa-bitcoin "></i>
                Buy Crypto
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/withdraw">
                <Button className="w-100 btn-success">
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                  Withdraw
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
          <h6 className="navbar-heading text-muted mt-3">Account</h6>
          <Button
            className="btn-secondary"
            onClick={async () => {
              alert("You're about to log out");
              try {
                await signOut(auth);

                navigate("/auth/login");
              } catch (error) {
                toast.error(error.code);
              }
            }}
          >
            Logout
          </Button>
        </Collapse>
      </Container>
    </Navbar>
  ) : (
    <Navbar
      className="navbar-vertical fixed-left navbar-dark bg-dark"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            {/* <img src="" alt="logo" /> */}
            FlexiCoins
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Button>Join Us</Button>
            </DropdownToggle>

            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem to="/auth/register" tag={Link}>
                <i className="ni ni-single-02" />
                <span>Register</span>
              </DropdownItem>
              <DropdownItem to="/auth/login" tag={Link}>
                <i className="ni ni-user-run" />
                <span>Log in</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink} className="text-dark fw-bolder">
                      FlexiCoins
                    </Link>
                  ) : (
                    <a href={logo.outterLink} className="fw-bolder">
                      FlexiCoins
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          {/* Navigation */}
          <h4 className="fw-light text-danger">You're Not signed in</h4>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          <h6 className="navbar-heading text-muted">Want to Earn?</h6>
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink to="/auth/register" tag={Link}>
                <i className="ni ni-spaceship" />
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/auth/login" tag={Link}>
                <i className="ni ni-palette" />
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
