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
import { onAuthStateChanged, updateEmail, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Container, Row, Col } from "reactstrap";
import { auth } from "../../variables/FirebaseConfig";

const UserHeader = ({ edit, setEdit, name, email }) => {
  const [currenUser, setCurrentUser] = useState();
  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  };

  useEffect(getUser, []);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-3 text-white">Hello {name}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can make changes to your details
                and view them right here. Dont Hesistate to share your referal
                code. You earn anytime a user makes purchase with it
              </p>
              {edit ? (
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    setEdit(false);
                    if (name && name !== currenUser.displayName) {
                      try {
                        toast.promise(
                          updateProfile(auth.currentUser, {
                            displayName: name,
                          }),
                          {
                            pending: "updating changes",
                            success: "Name changed successfully",
                          }
                        );
                      } catch (error) {
                        toast.warn(error.code);
                      }
                    }
                    if (email && email !== currenUser.email) {
                      try {
                        await updateEmail(auth.currentUser, email);
                        toast.success("Email successfully updated");
                      } catch (error) {
                        toast.error(error.code);
                      }
                    }
                  }}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  color="info"
                  onClick={(e) => {
                    e.preventDefault();
                    setEdit(true);
                  }}
                >
                  Edit profile
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
