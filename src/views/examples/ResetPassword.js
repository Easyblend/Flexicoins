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

// reactstrap components
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  Container,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../variables/FirebaseConfig";

import { toast } from "react-toastify";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(sendPasswordResetEmail(auth, email), {
        pending: "sending Reset Link",
        success: "Reset Link sent",
      });
    } catch (error) {
      toast.error("This error occured: " + error.code);
    }
  };

  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark bg-dark "
        expand="md"
      >
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <h2 className="fw-bold h-1 text-secondary">Flexicoins</h2>
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <h2>Flexicoins</h2>
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Dashboard</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/register"
                  tag={Link}
                >
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Register</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Login</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
      <div className="main-content">
        <h1 className="text-center pt-7 pb-5">Password Reset</h1>
      </div>

      {/*Login and register page created here*/}
      <Container className="d-flex justify-content-center">
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Reset link will be sent to this E-mail</small>
              </div>
              <Form role="form" onSubmit={resetPassword}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Send link
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default PasswordReset;
