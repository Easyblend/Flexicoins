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
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../variables/FirebaseConfig";
import { toast } from "react-toastify";

const Profile = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoUrl] = useState(
    "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg"
  );

  const [code, setCode] = useState("");

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fullName = user.displayName;

        setCode(user.uid);
        setName(user.displayName);
        setEmail(user.email);

        if (fullName) {
          const separateName = fullName.split(" ");
          setFirstName(separateName[0]);
          if (separateName.length > 1) {
            setSecondName(separateName[1]);
          }
        } else {
          setFirstName("enter first name");
          setSecondName("enter second name");
        }

        if (user.photoURL) {
          setPhotoUrl(user.photoURL);
        }
      }
    });
  };

  //Share on twitter

  function shareOnTwitter() {
    const navUrl =
      "https://twitter.com/intent/tweet?text=" +
      `https://flexicoins.com
     Flexicoins is here, Buy USD, GBP, Bitcoin and ethereum with mobile money wallet
     Simple, Secure and Fast, also Earn 5GHC buy sharing`;
    window.open(navUrl, "_blank");
  }

  //share on facebook
  function shareOnFacebook() {
    const navUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      "https://flexicoins.com";
    window.open(navUrl, "_blank");
  }

  useEffect(getUser, []);
  const [edit, setEdit] = useState(false);
  return (
    <>
      <UserHeader
        edit={edit}
        setEdit={setEdit}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        photoURL={photoURL}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img alt="" className="rounded-circle" src={photoURL} />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      shareOnTwitter();
                    }}
                    size="sm"
                  >
                    Share on twitter
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      shareOnFacebook();
                    }}
                    size="sm"
                  >
                    Share on Facebook
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="mt-4 pt-md-4 ">
                <div className="text-center">
                  <h2>{name}</h2>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {email}
                  </div>
                  <div className="h4 mt-4 text-info">
                    <i className="ni business_briefcase-24 mr-2" />
                    You earn 5GHC Bonus when you share our Page.
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <Button
                    color="danger"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      shareOnFacebook();
                    }}
                    size="sm"
                  >
                    Share on Whatsapp
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Full Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={name}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            disabled={!edit}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="email"
                            type="email"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!edit}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={firstName}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={secondName}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h4 className=" mb-4 text-info">Referal Code</h4>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="10">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Earn point anytime a user deposits with your code
                          </label>
                          <div className="d-flex ">
                            <Input
                              className="form-control-alternative"
                              defaultValue={code}
                              id="input-city"
                              placeholder="City"
                              type="text"
                              disabled
                            />
                            <Button
                              className="ml-3"
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(code);
                                toast.success("Text copied");
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Send us a message</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Tell us what you'd love to be done for you ..."
                        rows="4"
                        defaultValue="How do I make a deposit and earn my first profit..."
                        type="textarea"
                      />
                    </FormGroup>
                    <Button
                      type="button"
                      className="btn-info"
                      href="mailto:somewhere"
                    >
                      Send
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
