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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../variables/FirebaseConfig";
import { toast } from "react-toastify";

import { database } from "../../variables/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const googleSignUp = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        setName(result.user.displayName);
        setEmail(result.user.email);
        toast.success("Welcome " + result.user.displayName);
        navigate("/admin");
        sendData(result.user.uid, result.user.displayName, result.user.email);
      })
      .catch((error) => console.log(error));
  };

  const [view, setView] = useState(false);

  const sendData = async (user, name, email) => {
    await setDoc(doc(database, "Users", user), {
      name: name,
      email: email,
      signIn: "Google",
    });
  };

  const sendDataWithDetails = async (user, name, email) => {
    await setDoc(doc(database, "Users", user), {
      name: name,
      email: email,
      signIn: "Username and Password",
    });
  };

  const [agree, setAgree] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();
    if (agree) {
      try {
        await toast.promise(
          createUserWithEmailAndPassword(auth, email, password).then(
            (credential) => {
              const user = credential.user;
              updateProfile(user, { displayName: name });
              navigate("/admin");
              toast.success(`Welcome ${name}`);
              sendDataWithDetails(user.uid, name, user.email);
            }
          ),
          {
            pending: "Signing you Up",
          }
        );
      } catch (error) {
        toast.error("error code: " + error.code);
      }
    } else {
      toast.warn("agree to terms to proceed");
    }
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon w-75"
                color="default"
                onClick={googleSignUp}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={createAccount}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Full Name"
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={(view && "text") || "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <Button onClick={() => setView(!view)}>
                    {" "}
                    {(view && <i class="fa-solid fa-eye"></i>) || (
                      <i class="fa-solid fa-eye-slash"></i>
                    )}
                  </Button>
                </InputGroup>
              </FormGroup>

              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      onChange={() => setAgree(!agree)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="https://crypto-policy.tech/">Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
              <div className="text-muted mt-4 text-center">
                Already have an account?{" "}
                <Link className="text-danger font-weight-700" to="/auth/login">
                  Login
                </Link>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
