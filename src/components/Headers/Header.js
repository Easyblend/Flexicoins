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
import { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { CurrencyRatesContext } from "../../Utils/CurrencyRatesContext";

const Header = ({ usdPurchase, gpbPurchase, btcPurchase, ethPurchase }) => {
  const {
    dollarRate,
    gbpRate,
    btcRate,
    ethRate,
    usdtotal,
    setUsdTotal,
    ethtotal,
    setEthTotal,
    btctotal,
    setBtcTotal,
    gbptotal,
    setGbpTotal,
    usdDeduction,
    gbpDeduction,
    btcDeduction,
    ethDeduction,
  } = useContext(CurrencyRatesContext);

  const [totalUsdWithdraw, setTotalUsdWithdraw] = useState(0);
  const [totalGbpWithdraw, setTotalGbpWithdraw] = useState(0);

  const [totalBtcWithdraw, setTotalBtcWithdraw] = useState(0);
  const [totalEthWithdraw, setTotalEthWithdraw] = useState(0);

  useEffect(() => {
    let totalUsdRemove = 0;
    usdDeduction?.map((eachWithdraw) => {
      totalUsdRemove += Number(eachWithdraw.withdrawal_Amount);
      setTotalUsdWithdraw(totalUsdRemove);
    });

    let totalGbpRemove = 0;
    gbpDeduction?.map((eachWithdraw) => {
      totalGbpRemove += Number(eachWithdraw.withdrawal_Amount);
      setTotalGbpWithdraw(totalGbpRemove);
    });

    let totalBtcRemove = 0;
    btcDeduction?.map((eachWithdraw) => {
      totalBtcRemove += Number(eachWithdraw.withdrawal_Amount);
      setTotalBtcWithdraw(totalBtcRemove);
    });

    let totalEthRemove = 0;
    ethDeduction?.map((eachWithdraw) => {
      totalEthRemove += Number(eachWithdraw.withdrawal_Amount);
      setTotalEthWithdraw(totalEthRemove);
    });

    let usdTotals = "";
    usdPurchase?.map((price) => {
      usdTotals = (Number(price.Recieved) + Number(usdTotals)).toFixed(2);
    });
    setUsdTotal((usdTotals - totalUsdWithdraw).toFixed(2));

    let gbpTotals = "";
    gpbPurchase?.map((price) => {
      gbpTotals = (Number(price.Recieved) + Number(gbpTotals)).toFixed(2);
    });

    setGbpTotal((gbpTotals - totalGbpWithdraw).toFixed(2));

    let btcTotals = "";
    btcPurchase?.map((price) => {
      btcTotals = (Number(price.Recieved) + Number(btcTotals)).toFixed(4);
    });
    setBtcTotal((btcTotals - totalBtcWithdraw).toFixed(2));

    let ethTotals = "";
    ethPurchase?.map((price) => {
      ethTotals = (Number(price.Recieved) + Number(ethTotals)).toFixed(4);
    });

    setEthTotal((ethTotals - totalEthWithdraw).toFixed(2));
  });

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          USD
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {usdtotal ? (
                            Number(usdtotal).toFixed(2)
                          ) : (
                            <div
                              className="spinner-grow text-danger"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          )}{" "}
                          $
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fa-solid fa-dollar-sign"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> Valued at
                      </span>{" "}
                      <span className="text-nowrap h4 text-muted">
                        {usdtotal ? (usdtotal / dollarRate).toFixed(2) : "0.00"}{" "}
                        EUR
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          GBP
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {gbptotal ? (
                            Number(usdtotal).toFixed(2)
                          ) : (
                            <div
                              className="spinner-grow text-danger"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          )}{" "}
                          $
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape  bg-default text-white rounded-circle shadow">
                          <i className="fa-solid fa-sterling-sign"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> Valued at
                      </span>{" "}
                      <span className="text-nowrap h4 text-muted">
                        {" "}
                        {gbptotal
                          ? Number(gbptotal / gbpRate).toFixed(2)
                          : "0.00"}{" "}
                        EUR
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Bitcoin
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {" "}
                          {btctotal ? (
                            Number(btctotal).toFixed(4)
                          ) : (
                            <div
                              class="spinner-grow text-warning"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}{" "}
                          <span className="h3">BTC</span>
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning  text-white rounded-circle shadow">
                          <i className="fa-brands fa-bitcoin"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> Valued at
                      </span>{" "}
                      <span className="text-nowrap text-muted h4">
                        {" "}
                        {btctotal
                          ? ((btctotal * btcRate) / dollarRate).toFixed(2)
                          : "0.00"}{" "}
                        EUR
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Ethereum
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {" "}
                          {ethtotal ? (
                            Number(ethtotal).toFixed(4)
                          ) : (
                            <div class="spinner-grow text-dark" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}{" "}
                          <span className="h3">ETH</span>
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
                        <i className="fas fa-arrow-up" /> Valued at
                      </span>{" "}
                      <span className="text-nowrap text-muted h4">
                        {ethtotal
                          ? ((ethRate * ethtotal) / dollarRate).toFixed(2)
                          : "0.00"}{" "}
                        EUR
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
