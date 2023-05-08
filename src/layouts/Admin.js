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
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, Routes, useParams } from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

import routes from "../routes.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../variables/FirebaseConfig.js";

import Modal2 from "../views/examples/Modal2";
import Modal from "../views/examples/Modal";

import video from "../assets/video.mp4";
import { CurrencyRatesContext } from "../Utils/CurrencyRatesContext";
import Tables from "../views/examples/Tables.js";
import Profile from "../views/examples/Profile.js";
import Index from "../views/Index.js";

const Admin = () => {
  const mainContent = React.useRef(null);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const {
    gbpRate,
    btcRate,
    ethRate,
    dollarRate,
    setDollarRate,
    setBtcRate,
    setEthRate,
    setGbpRate,
  } = useContext(CurrencyRatesContext);

  const [purchasingAmount, setPurchasingAmount] = useState(0);

  const [userId, setUserId] = useState();

  const [email, setEmail] = useState();
  const [name, setName] = useState();

  const checkUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
        setName(currentUser.displayName);
        setEmail(currentUser.email);
      } else {
        navigate("/auth/login");
      }
    });
  };

  useEffect(checkUser, []);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const getTransactions = async () => {
    // try {
    //   const response = await getDocs(collection(database, "Transactions"));
    //   if (response) {
    //     console.log(response.size);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => getTransactions);

  console.log(params);
  return (
    <>
      {/* <video
        className="p-0 p-sm-5"
        controls
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: "100",
        }}
      >
        <source src={video} type="video/mp4" />
      </video> */}
      <Sidebar
        routes={routes}
        logo={{
          innerLink: "/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
        setModal={setModal}
        setModal2={setModal2}
      />

      <div className="main-content" ref={mainContent}>
        {modal || modal2 ? (
          <div className="modal-header">
            {modal ? (
              <Modal
                setModal={setModal}
                dollarRate={dollarRate}
                purchasingAmount={purchasingAmount}
                setPurchasingAmount={setPurchasingAmount}
                poundRate={gbpRate}
                userId={userId}
                name={name}
                email={email}
              />
            ) : null}
            {modal2 ? (
              <Modal2
                setModal2={setModal2}
                btcRate={btcRate}
                ethRate={ethRate}
                dollarRate={dollarRate}
                purchasingAmount={purchasingAmount}
                setPurchasingAmount={setPurchasingAmount}
                userId={userId}
                name={name}
                email={email}
              />
            ) : null}
          </div>
        ) : (
          <>
            <AdminNavbar brandText={"hello"} />
            {params.view === "tables" ? (
              <Tables />
            ) : params.view === "user-profile" ? (
              <Profile />
            ) : (
              <Index />
            )}
          </>
        )}

        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
