import { useContext, useState } from "react";
import { Button } from "reactstrap";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../variables/FirebaseConfig";
import { toast } from "react-toastify";

//importing paystack
import PaystackPop from "@paystack/inline-js";
import { useNavigate } from "react-router-dom";
import { CurrencyRatesContext } from "../../Utils/CurrencyRatesContext";

const Modal2 = ({
  setModal2,
  dollarRate,
  purchasingAmount,
  setPurchasingAmount,
  btcRate,
  ethRate,
  userId,
  name,
  email,
}) => {
  // const sendData = async () => {
  //   const response = await getDocs(collection(database, "Users"));
  //   const data = response.forEach((doc) => console.log(doc.data()));
  // };

  const navigate = useNavigate();

  const CurrencyRate = useContext(CurrencyRatesContext);

  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());
  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
  }).format(new Date());

  const [referal, setReferal] = useState("");
  const [phone, setPhone] = useState("");
  const [recieve, setRecieve] = useState(0);

  const [currencyType, setCurrencyType] = useState("BTC");

  const [rate, setRate] = useState();

  const SendData = async (e) => {
    e.preventDefault();

    if (currencyType === "BTC") {
      const price = Number((purchasingAmount / btcRate) * dollarRate).toFixed(
        5
      );
      setRecieve(price);
      setRate(CurrencyRate.btcRate);
    } else {
      const price = Number((purchasingAmount / ethRate) * dollarRate).toFixed(
        5
      );
      setRecieve(price);
      setRate(CurrencyRate.ethRate);
    }

    if (recieve) {
      try {
        const paystack = new PaystackPop();

        paystack.newTransaction({
          key: process.env.REACT_APP_PAYSTACK_KEY,
          email: email,
          amount: purchasingAmount * 100,

          onSuccess: async () => {
            try {
              await toast.promise(
                addDoc(
                  collection(
                    database,
                    `Transactions/${userId}/${currencyType}`
                  ),
                  {
                    Name: name,
                    Amount: purchasingAmount,
                    Recieved: recieve,
                    what_Purchased: currencyType,
                    Exchange_Rate: rate,
                    date: date,
                    dateInitial: day + " " + date.slice(0, 3),
                    phone: phone,
                  }
                ),

                {
                  pending: "Verifying Payment",
                  success: "Payment Successful",
                }
              );
              navigate("/admin/index");
              setModal2(false);
            } catch (error) {
              toast.error("Something's not right. Contact Us for help");
            }
          },
          onCancel: () => {
            alert("Aborting payment");
          },
          onClose: () => {
            toast.info("Payment Aborted");
          },
        });
      } catch (error) {
        toast.error(error.code);
      }
    } else {
      toast.warning("try again, Something went wrong!");
    }
  };

  return (
    <div className="container-fluid mt-2">
      <Button
        className="btn-danger text-center mb-4 mx-auto d-flex"
        onClick={() => {
          setModal2(false);
        }}
      >
        Abort and Close
      </Button>
      <div className="mb-4">
        <h2>Confirm Crypto purchase</h2>
        <span>
          Payments are secured. Purchasing Crypto will reflect in your account
          after the paymenr has been confirmed.
          <br />
          Having issues with your payment,{" "}
          <a href="mailto:support@flexicoins.com">Contact US</a>
        </span>
      </div>

      <form className="row" onSubmit={SendData}>
        <div className="col-md-8">
          <div className="card p-3">
            <h6 className="text-uppercase">Payment details</h6>
            <div className="inputbox mt-3">
              {" "}
              <input
                type="text"
                name="name"
                className="form-control"
                disabled
                value={name}
              />{" "}
              <span>
                Full Name <span className="text-danger">*</span>
              </span>{" "}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="inputbox mt-3 mr-2">
                  {" "}
                  <select
                    name="currency"
                    id="currency"
                    className="form-control"
                    onChange={(e) => setCurrencyType(e.target.value)}
                  >
                    <option value="BTC">Bitcoin BTC</option>
                    <option value="ETH">Ethereum ETH</option>
                  </select>
                  <div>
                    <label htmlFor="currency">
                      <i className="fa-solid fa-wallet"></i>{" "}
                      <span>
                        Crypto type <span className="text-danger">*</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="inputbox mt-3 mr-2">
                  {" "}
                  <input
                    type="tel"
                    name="name"
                    className="form-control"
                    required="required"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />{" "}
                  <span>
                    <i className="fa-solid fa-phone"></i> Phone Number{" "}
                    <span className="text-danger">*</span>
                  </span>{" "}
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <h6 className="text-uppercase">Purchasing Amount</h6>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="optional"
                      value={referal}
                      onChange={(e) => setReferal(e.target.value)}
                    />{" "}
                    <span>Referal Code</span>{" "}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="number"
                      name="name"
                      className="form-control"
                      required="required"
                      value={purchasingAmount}
                      onChange={(e) => setPurchasingAmount(e.target.value)}
                    />{" "}
                    <span>
                      Purchasing amount in GHC{" "}
                      <span className="text-danger">*</span>
                    </span>{" "}
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    <span>What you'll get in {currencyType}</span> <span></span>
                    <div className="d-flex ">
                      {currencyType === "BTC" ? (
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          disabled
                          value={
                            " BTC " +
                            Number(
                              (purchasingAmount / btcRate) * dollarRate
                            ).toFixed(5)
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          disabled
                          value={
                            " ETH " +
                            Number(
                              (purchasingAmount / ethRate) * dollarRate
                            ).toFixed(5)
                          }
                          on
                        />
                      )}
                      <Button
                        className="btn-secondary ml-3"
                        onClick={() => setPurchasingAmount(0)}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 mb-4 d-flex justify-content-between">
            <Button onClick={() => setModal2(false)}>Cancel</Button>
            <button className="btn btn-success px-3" type="submit">
              Pay &#8373;{purchasingAmount}
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-default p-3 text-white mb-3">
            <h2 className=" text-info">Conversion Rates</h2>
            <div className="d-flex flex-row align-items-end mb-3">
              <h4 className="mb-0 text-secondary">
                1 BTC is equal to &#8373;{" "}
                {(btcRate / dollarRate).toLocaleString("en-US")}
              </h4>
            </div>
            <div className="d-flex flex-row align-items-end mb-3">
              <h4 className="mb-0 text-secondary">
                1 ETH is equal to &#8373;{" "}
                {(ethRate / dollarRate).toLocaleString("en-US")}{" "}
              </h4>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal2;
