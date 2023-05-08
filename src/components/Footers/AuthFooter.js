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

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a className="font-weight-bold ml-1" href="" target="_blank">
                  FlexiCoins
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink href="" target="_blank">
                    FlexiCoins.com
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="" target="_blank">
                    BTC
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="" target="_blank">
                    USD
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="" target="_blank">
                    ETH
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="" target="_blank">
                    EURO
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
