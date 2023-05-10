import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import { Route, Routes, useLocation } from "react-router-dom";

import "../assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/scss/argon-dashboard-react.scss";

import AdminLayout from "../layouts/Admin.js";

import WidthrawPage from "../views/WidthrawPage";

//Toast imports
import { ToastContainer } from "react-toastify";
import PasswordReset from "../views/examples/ResetPassword";

import { CurrencyRatesContext } from "../Utils/CurrencyRatesContext";

import { toast } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../variables/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../variables/FirebaseConfig";
import AuthRegister from "../layouts/AuthRegister";
import AuthLogin from "../layouts/AuthLogin";

import { useFetchRates } from "../Utils/useFetchData";

function App() {
  //Get current user logged in
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserID(currentUser.uid);

        setName(currentUser.displayName);
      }
    });
  };

  //Get All Currency Rates

  const { gbpRate, setGbpRate } = useFetchRates();
  const { dollarRate, setDollarRate } = useFetchRates();
  const { ethRate, setEthRate } = useFetchRates();
  const { btcRate, setBtcRate } = useFetchRates();

  //Getting deposits in arrays for the table
  const [usdPurchase, setUsdPurchase] = useState([]);
  const [gbpPurchase, setGbpPurchase] = useState([]);
  const [btcPurchase, setBtcPurchase] = useState([]);
  const [ethPurchase, setEthPurchase] = useState([]);

  const [graphUsd, setGraphUsd] = useState([]);
  const [graphUsdDate, setGraphUsdDate] = useState([]);

  const [graphGbp, setGraphGbp] = useState([]);
  const [graphGbpDate, setGraphGbpDate] = useState([]);

  const [graphBtc, setGraphBtc] = useState([]);
  const [graphBtcDate, setGraphBtcDate] = useState([]);

  const [graphEth, setGraphEth] = useState([]);
  const [graphEthDate, setGraphEthDate] = useState([]);

  const getUSDData = async () => {
    try {
      if (userID) {
        const usdArray = [];
        const graphUsDArray = [];
        const graphUsdDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "USD")
        );
        querySnapshot.forEach((doc) => {
          usdArray.push(doc.data());
          graphUsDArray.push(doc.data().Amount);
          graphUsdDateArray.push(doc.data().date);
        });
        setUsdPurchase(usdArray);
        setGraphUsdDate(graphUsdDateArray);
        setGraphUsd(graphUsDArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGBPdata = async () => {
    if (userID)
      try {
        const gbpArray = [];
        const graphGbpArray = [];
        const graphGbpDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "GBP")
        );
        querySnapshot.forEach((doc) => {
          gbpArray.push(doc.data());
          graphGbpArray.push(doc.data().Amount);
          graphGbpDateArray.push(doc.data().date);
        });
        setGbpPurchase(gbpArray);
        setGraphGbpDate(graphGbpDateArray);
        setGraphGbp(graphGbpArray);
      } catch (error) {
        console.log(error);
      }
  };

  const getBTCdata = async () => {
    if (userID)
      try {
        const btcArray = [];
        const graphBtcArray = [];
        const graphBtcDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "BTC")
        );

        querySnapshot.forEach((doc) => {
          btcArray.push(doc.data());
          graphBtcArray.push(doc.data().Amount);
          graphBtcDateArray.push(doc.data().date);
        });
        setBtcPurchase(btcArray);
        setGraphBtcDate(graphBtcDateArray);
        setGraphBtc(graphBtcArray);
      } catch (error) {
        console.log(error);
      }
  };

  const getETHdata = async () => {
    if (userID)
      try {
        const ethArray = [];
        const graphEthArray = [];
        const graphEthDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Transactions", userID, "ETH")
        );

        querySnapshot.forEach((doc) => {
          ethArray.push(doc.data());
          graphEthArray.push(doc.data().Amount);
          graphEthDateArray.push(doc.data().date);
        });
        setEthPurchase(ethArray);
        setGraphEthDate(graphEthDateArray);
        setGraphEth(graphEthArray);
      } catch (error) {
        throw error;
      }
  };

  //Get all withdrawals made
  const [usdDeduction, setUsdDeduction] = useState([]);
  const getDollarWithdrawal = async () => {
    try {
      if (userID) {
        const usdArray = [];
        const graphUsDArray = [];
        const graphUsdDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Withdrawals", `${name + " " + userID}`, "USD")
        );
        querySnapshot.forEach((doc) => {
          usdArray.push(doc.data());
          graphUsDArray.push(doc.data());
          graphUsdDateArray.push(doc.data().date);
        });

        return graphUsDArray;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [gbpDeduction, setGbpDeduction] = useState([]);
  const getPoundWithdrawal = async () => {
    try {
      if (userID) {
        const usdArray = [];
        const graphUsDArray = [];
        const graphUsdDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Withdrawals", `${name + " " + userID}`, "GBP")
        );
        querySnapshot.forEach((doc) => {
          usdArray.push(doc.data());
          graphUsDArray.push(doc.data());
          graphUsdDateArray.push(doc.data().date);
        });

        return graphUsDArray;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [btcDeduction, setBtcDeduction] = useState([]);
  const getBitcoinWithdrawal = async () => {
    try {
      if (userID) {
        const usdArray = [];
        const graphUsDArray = [];
        const graphUsdDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Withdrawals", `${name + " " + userID}`, "BTC")
        );
        querySnapshot.forEach((doc) => {
          usdArray.push(doc.data());
          graphUsDArray.push(doc.data());
          graphUsdDateArray.push(doc.data().date);
        });

        return graphUsDArray;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [ethDeduction, setEthDeduction] = useState([]);
  const getEthereumWithdrawal = async () => {
    try {
      if (userID) {
        const usdArray = [];
        const graphUsDArray = [];
        const graphUsdDateArray = [];
        const querySnapshot = await getDocs(
          collection(database, "Withdrawals", `${name + " " + userID}`, "ETH")
        );
        querySnapshot.forEach((doc) => {
          usdArray.push(doc.data());
          graphUsDArray.push(doc.data());
          graphUsdDateArray.push(doc.data().date);
        });

        return graphUsDArray;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUSDData();
    getGBPdata();
    getBTCdata();
    getETHdata();
  }, [userID]);

  //calling the winthdrawal total for each Account type
  useEffect(() => {
    getUser();
    const fetchUsdData = async () => {
      try {
        const result = await getDollarWithdrawal();
        setUsdDeduction(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsdData();
    const fetchGbpData = async () => {
      try {
        const result = await getPoundWithdrawal();
        setGbpDeduction(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGbpData();
    const fetchBtcData = async () => {
      try {
        const result = await getBitcoinWithdrawal();
        setBtcDeduction(result);
      } catch (error) {
        toast.error("An array occured Refresh the page!");
      }
    };
    fetchBtcData();
    const fetchEthData = async () => {
      try {
        const result = await getEthereumWithdrawal();
        setEthDeduction(result);
      } catch (error) {
        throw error;
      }
    };
    fetchEthData();
  }, [userID]);

  const [usdtotal, setUsdTotal] = useState(0);
  const [btctotal, setBtcTotal] = useState(0);
  const [ethtotal, setEthTotal] = useState(0);
  const [gbptotal, setGbpTotal] = useState(0);

  const [debit, setDebit] = useState();
  const location = useLocation();

  return (
    <>
      <CurrencyRatesContext.Provider
        value={{
          dollarRate: dollarRate,
          gbpRate: gbpRate,
          btcRate: btcRate,
          ethRate: ethRate,
          setBtcRate: setBtcRate,
          setEthRate: setEthRate,
          setGbpRate: setGbpRate,
          setDollarRate: setDollarRate,
          usdtotal: usdtotal,
          setUsdTotal: setUsdTotal,
          btctotal: btctotal,
          setBtcTotal: setBtcTotal,
          ethtotal: ethtotal,
          setEthTotal: setEthTotal,
          gbptotal: gbptotal,
          setGbpTotal: setGbpTotal,
          debit: debit,
          setDebit: setDebit,
          usdDeduction: usdDeduction,
          gbpDeduction: gbpDeduction,
          ethDeduction: ethDeduction,
          btcDeduction: btcDeduction,
          usdPurchase: usdPurchase,
          gbpPurchase: gbpPurchase,
          btcPurchase: btcPurchase,
          ethPurchase: ethPurchase,
          graphBtc: graphBtc,
          graphEth: graphEth,
          graphUsd: graphUsd,
          graphGbp: graphGbp,
          graphBtcDate: graphBtcDate,
          graphEthDate: graphEthDate,
          graphUsdDate: graphUsdDate,
          graphGbpDate: graphGbpDate,
        }}
      >
        <Routes>
          <Route path="/:view" element={<AdminLayout props={location} />} />

          <Route path="/withdraw" element={<WidthrawPage />} />
          <Route path="/auth/resetpassword" element={<PasswordReset />} />

          <Route path="/auth/Register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="*" element={<AdminLayout props={location} />} />
        </Routes>
      </CurrencyRatesContext.Provider>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        limit={2}
        draggable
        theme="dark"
      />
      {/* Same as */}
    </>
  );
}

export default App;
