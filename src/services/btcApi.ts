import axios from "axios";

const baseUrl = "https://api.coinbase.com/v2";

const btcApi = axios.create({
  baseURL: baseUrl,
});

export const onGetCurrentBTCValue = () =>
  btcApi.get(`/prices/spot?currency=USD`);
