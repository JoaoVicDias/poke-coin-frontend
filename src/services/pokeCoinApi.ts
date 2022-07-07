import axios from "axios";

let baseUrl = "http://localhost:5000";

const pokeCoinApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    (data, headers: any) => {
      const token = localStorage.getItem("poke-coin");

      if (token) {
        headers.common.Authorization = `Bearer ${token}`;
      }

      return JSON.stringify(data);
    },
  ],
});

export const onLogin = (email: string, password: string) => {
  return pokeCoinApi.post("/user/sign-in", { email, password });
};

export const onCreateAccount = (
  name: string,
  email: string,
  password: string
) => {
  return pokeCoinApi.post("/user/sign-up", { name, email, password });
};

export const onGetWallet = () => {
  return pokeCoinApi.get("/wallet");
};

export const onGetMyPokemons = () => {
  return pokeCoinApi.get("/pokemon/my-pokemons");
};

export const onGetMyHistoric = () => {
  return pokeCoinApi.get("historic/my-historic");
};

export const onSalePokemon = (name: string, amount: number) => {
  return pokeCoinApi.post("/pokemon/sale", { name, amount });
};

export const onPurchasePokemon = (name: string, amount: number) => {
  return pokeCoinApi.post("/pokemon/purchase", { name, amount });
};
