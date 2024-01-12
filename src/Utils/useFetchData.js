import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useFetchRates = () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '839ea37f2fmsh798b9b58e610d05p1de960jsn98c1f5d0d4d9',
      'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
    }
  };

  const [dollarRate, setDollarRate] = useState(0);
  const [gbpRate, setGbpRate] = useState(0);
  const [btcRate, setBtcRate] = useState(0);
  const [ethRate, setEthRate] = useState(0);

  const getDollarRate = async () => {
    try {
      const response = await fetch(
        "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=EUR&want=USD&amount=1",
        options
      );
      const data = await response.json();

      setDollarRate(data.new_amount);

      const responseGbp = await fetch(
        "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=EUR&want=GBP&amount=1",
        options
      );
      const dataGbp = await responseGbp.json();
      setGbpRate(dataGbp.new_amount);

      const responseBtc = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );
      const dataBtc = await responseBtc.json();
      setBtcRate(dataBtc.market_data.current_price.usd); //btc price in dollars

      const responseEth = await fetch(
        "https://api.coingecko.com/api/v3/coins/ethereum"
      );
      const dataEth = await responseEth.json();
      setEthRate(dataEth.market_data.current_price.usd); //eth price in dollars
    } catch (error) {
      toast.warn("Poor Connection...Refrech Page");
    }
  };

  useEffect(() => {
    getDollarRate();
  }, []);

  return {
    gbpRate,
    setGbpRate,
    btcRate,
    setBtcRate,
    dollarRate,
    setDollarRate,
    ethRate,
    setEthRate,
  };
};
