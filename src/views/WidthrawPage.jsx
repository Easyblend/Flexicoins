import {
  Container,
  Col,
  Row,
  CardTitle,
  CardBody,
  Card,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  Table,
  Button,
  DropdownToggle,
  Media,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  NavbarBrand,
} from "reactstrap";
import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../variables/FirebaseConfig";

import { toast } from "react-toastify";
import Logo from "../assets/img/brand/fotor_2023-1-25_16_1_8.png";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { database } from "../variables/FirebaseConfig";
import { CurrencyRatesContext } from "../Utils/CurrencyRatesContext";

const WidthrawPage = () => {
  const [usdWithdrawal, setUsdWithdrawal] = useState(false);
  const [gbpWithdrawal, setGbpWithdrawal] = useState(false);
  const [btcWithdrawal, setBtcWithdrawal] = useState(false);
  const [ethWithdrawal, setEthWithdrawal] = useState(false);

  //decuting funds from database here

  const [selectedUI, setSelectedUI] = useState("shadow-lg bg-secondary");

  const [photoUrl, setPhotoUrl] = useState(
    "https://www.grovenetworks.com/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg"
  );

  //Getting the current Dollar price in USD
  const {
    dollarRate,
    ethRate,
    gbpRate,
    btcRate,
    usdtotal,
    gbptotal,
    btctotal,
    ethtotal,
    usdDeduction,
    gbpDeduction,
    btcDeduction,
    ethDeduction,
  } = useContext(CurrencyRatesContext);

  const [usdBalance, setUsdBalance] = useState(usdtotal);
  const [gbpBalance, setGbpBalance] = useState(gbptotal);
  const [ethBalance, setEthBalance] = useState(ethtotal);
  const [btcBalance, setBtcBalance] = useState(btctotal);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userID, setUserID] = useState();

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserID(currentUser.uid);
        setEmail(currentUser.email);
        setName(currentUser.displayName);
        if (currentUser.photoURL) {
          setPhotoUrl(currentUser.photoURL);
        }
      }
    });
  };

  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());

  const navigate = useNavigate();

  useEffect(getUser, []);

  const [phone, setPhone] = useState("");

  const DeductFunds = async (
    withdrawAmount,
    balance,
    phone,
    name,
    currencyType
  ) => {
    try {
      await toast.promise(
        addDoc(
          collection(
            database,
            `Withdrawals/${name + " " + userID}/${currencyType}/`
          ),
          {
            withdrawal_Amount:
              currencyType == "BTC" || currencyType == "ETH"
                ? (currencyType == "BTC"
                  ? Number(
                    (Number(withdrawAmount) * Number(dollarRate)) /
                    Number(btcRate)
                  )
                  : Number(
                    (Number(withdrawAmount) * Number(dollarRate)) /
                    Number(ethRate)
                  )
                ).toFixed(4)
                : Number(withdrawAmount * dollarRate),
            Withdrawal_Amount_in_Ghc:
              currencyType == "BTC" || currencyType == "ETH"
                ? Number(withdrawAmount)
                : Number(withdrawAmount),
            Current_Balance: Number(balance),
            Availble_Balance:
              currencyType == "BTC" || currencyType == "ETH"
                ? Number(
                  Number(balance) -
                  Number((withdrawAmount * dollarRate) / btcRate)
                ).toFixed(4)
                : Number(balance) - Number(withdrawAmount * dollarRate),
            currency: currencyType,
            name: name,
            phone: phone,
            date: date,
          }
        ),
        {
          pending: "Pending",
          success: "Success",
          error: "Something went sideways!!",
        }
      );
      navigate("/admin/index");
      window.location.reload();
    } catch (error) {
      toast.error(error.code);
    }
  };

  const allWithdrawal =
    usdDeduction &&
    usdDeduction
      .concat(gbpDeduction && gbpDeduction)
      .concat(btcDeduction && btcDeduction)
      .concat(ethDeduction && ethDeduction);

  return (
    <div className="pb-3">
      <UncontrolledDropdown
        nav
        className=" py-2 px-3 px-md-5 justify-content-between d-flex shadow-lg"
      >
        <NavbarBrand className="pt-0" tag={Link} to="/index">
          {/* <img src="" alt="logo" /> */}
          <img src={Logo} alt="Missing" width="40px" height="auto" />{" "}
          <span className="ml-2 text-dark h2 d-none d-md-inline">
            FlexiCoins
          </span>
        </NavbarBrand>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img alt="..." src={photoUrl} />
            </span>
            <Media className="ml-2 ">
              <span className="mb-0 text-sm font-weight-bold">{name}</span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Menu</h6>
          </DropdownItem>
          <DropdownItem to="/admin" tag={Link}>
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>Return to Home</span>
          </DropdownItem>
          <DropdownItem
            onClick={async () => {
              try {
                alert("Loging out");
                await signOut(auth);
                navigate("/auth/login");
              } catch (error) {
                toast.error("this error occured: " + error.code);
              }
            }}
          >
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <div className="mt-3">
        <h1 className="text-center display-3 fw-bold">Withdraw Funds</h1>
        <div className="header pb-8 pt-3 pt-md-5">
          <h3 className="text-center text-dark mb-3">
            Pick an account to withdraw from
          </h3>
          <Container
            fluid
            className="px-4 px-sm-6"
            onClick={() => {
              document.getElementById("withdraw").scrollIntoView();
            }}
          >
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col
                  href="#withdraw"
                  lg="6"
                  xl="3"
                  onClick={() => {
                    setUsdWithdrawal(true);
                    setBtcWithdrawal(false);
                    setEthWithdrawal(false);
                    setGbpWithdrawal(false);
                  }}
                >
                  <Card className="card-stats mb-4 mb-xl-0" type="button">
                    <CardBody className={usdWithdrawal ? selectedUI : null}>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className={`text-uppercase  mb-0`}
                          >
                            USD
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {Number(usdBalance).toFixed(2)} $
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fa-solid fa-dollar-sign"></i>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0  text-sm">
                        <span className="text-danger fw-bold h4 mr-2">
                          GH&#8373;{" "}
                          {(
                            (usdBalance - (20 / 100) * usdBalance) /
                            dollarRate
                          ).toFixed(2)}
                        </span>{" "}
                        <span className="text-nowrap">Withdrawable</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col
                  lg="6"
                  xl="3"
                  onClick={() => {
                    setUsdWithdrawal(false);
                    setBtcWithdrawal(false);
                    setEthWithdrawal(false);
                    setGbpWithdrawal(true);
                  }}
                >
                  <Card className="card-stats mb-4 mb-xl-0" type="button">
                    <CardBody className={gbpWithdrawal ? selectedUI : null}>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Pound sterling
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {Number(gbpBalance).toFixed(2)} £
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape  bg-default text-white rounded-circle shadow">
                            <i className="fa-solid fa-sterling-sign"></i>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col
                  lg="6"
                  xl="3"
                  onClick={() => {
                    setUsdWithdrawal(false);
                    setBtcWithdrawal(true);
                    setEthWithdrawal(false);
                    setGbpWithdrawal(false);
                  }}
                >
                  <Card className="card-stats mb-4 mb-xl-0" type="button">
                    <CardBody className={btcWithdrawal ? selectedUI : null}>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            BTC
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {btcBalance}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning  text-white rounded-circle shadow">
                            <i className="fa-brands fa-bitcoin"></i>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col
                  lg="6"
                  xl="3"
                  onClick={() => {
                    setUsdWithdrawal(false);
                    setBtcWithdrawal(false);
                    setEthWithdrawal(true);
                    setGbpWithdrawal(false);
                  }}
                >
                  <Card className="card-stats mb-4 mb-xl-0" type="button">
                    <CardBody className={ethWithdrawal ? selectedUI : null}>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            ETH
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {ethBalance}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-dark text-white rounded-circle shadow">
                            <i className="fa-brands fa-ethereum"></i>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            <Container fluid id="withdraw">
              <p className="text-center">
                All withdrawals will take between 24 - 48 hours to be processed.
                please be patient while we process your requests
              </p>
              {usdWithdrawal ? (
                <UsdwithdrawForm
                  usdBalance={usdBalance}
                  dollarRate={dollarRate}
                  phone={phone}
                  setPhone={setPhone}
                  DeductFunds={DeductFunds}
                  name={name}
                  usdtotal={usdtotal}
                  navigate={navigate}
                />
              ) : gbpWithdrawal ? (
                <GbpwithdrawForm
                  gbpBalance={gbpBalance}
                  gbpRate={gbpRate}
                  phone={phone}
                  setPhone={setPhone}
                  DeductFunds={DeductFunds}
                  name={name}
                  gbptotal={gbptotal}
                  navigate={navigate}
                />
              ) : btcWithdrawal ? (
                <BtcwithdrawForm
                  btcBalance={btcBalance}
                  btcRate={btcRate}
                  usdRate={dollarRate}
                  phone={phone}
                  setPhone={setPhone}
                  DeductFunds={DeductFunds}
                  name={name}
                  btctotal={btctotal}
                  navigate={navigate}
                />
              ) : ethWithdrawal ? (
                <EthwithdrawForm
                  ethBalance={ethBalance}
                  ethRate={ethRate}
                  usdRate={dollarRate}
                  phone={phone}
                  setPhone={setPhone}
                  DeductFunds={DeductFunds}
                  name={name}
                  ethtotal={ethtotal}
                  navigate={navigate}
                />
              ) : (
                ""
              )}
            </Container>
            <Container fluid className="mt-5">
              <h2>Recent Widthrawals</h2>
              <Table className="shadow-lg border " responsive>
                <tr className="bg-success text-dark">
                  <th>Transactions ID</th>
                  <th>Currency Type</th>
                  <th>Amount &#8373;</th>
                  <th>Date</th>
                </tr>

                <tbody>
                  {allWithdrawal
                    ? allWithdrawal.map((withdraw) => {
                      return (
                        <tr className="border-1" key={new Date().getTime()}>
                          <td>{new Date().getTime()}</td>
                          <td>{withdraw.currency}</td>
                          <td>{withdraw.Withdrawal_Amount_in_Ghc}</td>
                          <td>{withdraw.date}</td>
                        </tr>
                      );
                    })
                    : null}
                </tbody>
              </Table>
            </Container>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default WidthrawPage;

const UsdwithdrawForm = ({
  usdBalance,
  dollarRate,
  phone,
  setPhone,
  DeductFunds,
  navigate,
  usdtotal,
  name,
}) => {
  const [usdGhcBalance, setUsdGhcBalance] = useState(0);

  const dollar_to_cedis = (
    (usdBalance - (20 / 100) * usdBalance) /
    dollarRate
  ).toFixed(2);

  useEffect(() => setUsdGhcBalance(dollar_to_cedis), [usdBalance]);

  const [widthrawAmount, setWithdrawAmount] = useState("");

  return (
    <Container fluid className="mt-7 flex-wrap-reverse" id="widthdraw">
      <h4 className="text-center">USD Withdrawal</h4>
      <Row className="flex-wrap-reverse">
        <Col sm="7">
          <Form>
            <FormGroup>
              <Label htmlFor="phone">Phone number</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-phone"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="+233"
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Amount in &#8373;</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa-solid fa-money-check-dollar"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="GHS 0.00"
                  type="number"
                  value={widthrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button
              className="btn-success mx-auto text-center  justify-content-center d-sm-inline d-flex"
              onClick={(e) => {
                e.preventDefault();
                DeductFunds(widthrawAmount, usdtotal, phone, name, "USD");
              }}
            >
              Widthdraw
            </Button>
          </Form>
        </Col>
        <Col className=" my-4   shadow-lg px-3">
          <div className="d-flex justify-content-between">
            <h1 className="display-1">
              $ {(usdBalance - widthrawAmount * dollarRate).toFixed(2)}
            </h1>
            <h1 className="display-1">USD</h1>
          </div>

          <div className="d-flex justify-content-between">
            {" "}
            <h4 className="text-left">Balance Widthdrawable</h4>
            <h4 className="text-danger">
              {" "}
              GH&#8373; {(usdGhcBalance - widthrawAmount).toFixed(2)}
            </h4>
          </div>
        </Col>
      </Row>
      <p className="text-center mt-5">
        Please take note of the 3% widthrawal charges with an extra 1.5% e-levy
        tax deductions. <br />
        If you have questions do ask us{" "}
        <a
          href="mailto:support@flexicoins.com"
          className="fw-bold bg-dark p-1 rounded px-2 text-light mx-2 fw-bold"
        >
          Here
        </a>
      </p>
    </Container>
  );
};

const GbpwithdrawForm = ({
  gbpBalance,
  gbpRate,
  gbptotal,
  name,
  phone,
  setPhone,
  navigate,
  DeductFunds,
}) => {
  const [gbpGhcBalance, setGbpGhcBalance] = useState(0);

  const gbp_to_cedis = (
    (gbpBalance - (20 / 100) * gbpBalance) /
    gbpRate
  ).toFixed(2);

  useEffect(() => setGbpGhcBalance(gbp_to_cedis), [gbpBalance]);

  const [widthrawAmount, setWithdrawAmount] = useState("");

  return (
    <Container fluid className="mt-7 flex-wrap-reverse" id="widthdraw">
      <h4 className="text-center">GBP Withdrawal</h4>
      <Row className="flex-wrap-reverse">
        <Col sm="7">
          <Form>
            <FormGroup>
              <Label htmlFor="phone">Phone number</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-phone"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="+233"
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Amount in &#8373;</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-money-check-dollar"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="GHS 0.00"
                  type="number"
                  value={widthrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button
              className="btn-success mx-auto text-center  justify-content-center d-sm-inline d-flex"
              onClick={(e) => {
                e.preventDefault();
                DeductFunds(widthrawAmount, gbptotal, phone, name, "GBP");
              }}
            >
              Widthdraw
            </Button>
          </Form>
        </Col>
        <Col className=" my-4   shadow-lg px-3">
          <div className="d-flex justify-content-between">
            <h1 className="display-1">
              $ {(gbpBalance.toFixed(2) - widthrawAmount * gbpRate).toFixed(2)}
            </h1>
            <h1 className="display-1">GPB</h1>
          </div>

          <div className="d-flex justify-content-between">
            {" "}
            <h4 className="text-left">Balance Widthdrawable</h4>
            <h4 className="text-danger">
              {" "}
              GH&#8373; {(gbpGhcBalance - widthrawAmount).toFixed(2)}
            </h4>
          </div>
        </Col>
      </Row>
      <p className="text-center mt-5">
        Please take note of the 3% widthrawal charges with an extra 1.5% e-levy
        tax deductions. <br />
        If you have questions do ask us{" "}
        <a
          href="mailto:support@flexicoins.com"
          className="fw-bold bg-dark p-1 rounded px-2 text-light mx-2 fw-bold"
        >
          Here
        </a>
      </p>
    </Container>
  );
};

const BtcwithdrawForm = ({
  btcBalance,
  btcRate,
  usdRate,
  phone,
  setPhone,
  name,
  btctotal,
  navigate,
  DeductFunds,
}) => {
  const [btcGhcBalance, setBtcGhcBalance] = useState(0);

  const btc_to_cedis = (
    ((btcBalance - (10 / 100) * btcBalance) * btcRate) /
    usdRate
  ).toFixed(2);

  useEffect(() => setBtcGhcBalance(btc_to_cedis), [btcBalance]);

  const [widthrawAmount, setWithdrawAmount] = useState("");

  return (
    <Container fluid className="mt-7 flex-wrap-reverse" id="widthdraw">
      <h4 className="text-center">BTC Withdrawal</h4>
      <Row className="flex-wrap-reverse">
        <Col sm="7">
          <Form>
            <FormGroup>
              <Label htmlFor="phone">Phone number</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-phone"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="+233"
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Amount in &#8373;</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-money-check-dollar"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="GHS 0.00"
                  type="number"
                  value={widthrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button
              className="btn-success mx-auto text-center  justify-content-center d-sm-inline d-flex"
              onClick={(e) => {
                e.preventDefault();

                DeductFunds(widthrawAmount, btctotal, phone, name, "BTC");
              }}
            >
              Widthdraw
            </Button>
          </Form>
        </Col>
        <Col className=" my-4   shadow-lg px-3 h-auto">
          <div className="d-flex justify-content-between">
            <h1 className="display-1 d-flex my-auto align-items-center">
              {(btcBalance - (widthrawAmount * usdRate) / btcRate).toFixed(4)}
            </h1>
            <h1 className="display-1">BTC</h1>
          </div>

          <div className="d-flex justify-content-between">
            {" "}
            <h4 className="text-left">Balance Widthdrawable</h4>
            <h4 className="text-danger">
              {" "}
              GH&#8373; {(btcGhcBalance - widthrawAmount).toFixed(2)}
            </h4>
          </div>
        </Col>
      </Row>
      <p className="text-center mt-5">
        Please take note of the 3% widthrawal charges with an extra 1.5% e-levy
        tax deductions. <br />
        If you have questions do ask us{" "}
        <a
          href="mailto:support@flexicoins.com"
          className="fw-bold bg-dark p-1 rounded px-2 text-light mx-2 fw-bold"
        >
          Here
        </a>
      </p>
    </Container>
  );
};
const EthwithdrawForm = ({
  navigate,
  ethBalance,
  name,
  usdRate,
  ethtotal,
  phone,
  setPhone,
  DeductFunds,
  ethRate,
}) => {
  const [ethGhcBalance, setEthGhcBalance] = useState(0);

  const eth_to_cedis = (
    ((ethBalance - (10 / 100) * ethBalance) * ethRate) /
    usdRate
  ).toFixed(2);

  useEffect(() => setEthGhcBalance(eth_to_cedis), [ethBalance]);

  const [widthrawAmount, setWithdrawAmount] = useState("");

  return (
    <Container fluid className="mt-7 flex-wrap-reverse" id="widthdraw">
      <h4 className="text-center">Ethereum Withdrawal</h4>
      <Row className="flex-wrap-reverse">
        <Col sm="7">
          <Form>
            <FormGroup>
              <Label htmlFor="phone">Phone number</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-phone"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="+233"
                  id="phone"
                  type="text"
                  phone={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Amount in &#8373;</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa-solid fa-money-check-dollar"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="GHS 0.00"
                  type="number"
                  value={widthrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button
              className="btn-success mx-auto text-center  justify-content-center d-sm-inline d-flex"
              onClick={(e) => {
                e.preventDefault();
                try {
                  DeductFunds(widthrawAmount, ethtotal, phone, name, "ETH");
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Widthdraw
            </Button>
          </Form>
        </Col>
        <Col className=" my-4   shadow-lg px-3 h-auto">
          <div className="d-flex justify-content-between">
            <h1 className="display-1">
              {(ethBalance - (widthrawAmount * usdRate) / ethRate).toFixed(4)}
            </h1>
            <h1 className="display-1">ETH</h1>
          </div>

          <div className="d-flex justify-content-between">
            {" "}
            <h3 className="text-left">Balance Widthdrawable</h3>
            <h3 className="text-danger">
              {" "}
              GH&#8373; {(ethGhcBalance - widthrawAmount).toFixed(2)}
            </h3>
          </div>
        </Col>
      </Row>
      <p className="text-center mt-5">
        Please take note of the 3% widthrawal charges with an extra 1.5% e-levy
        tax deductions. <br />
        If you have questions do ask us{" "}
        <a
          href="mailto:support@flexicoins.com"
          className="fw-bold bg-dark p-1 rounded px-2 text-light mx-2 fw-bold"
        >
          Here
        </a>
      </p>
    </Container>
  );
};
