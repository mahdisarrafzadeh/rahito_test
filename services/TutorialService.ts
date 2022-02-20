import axios from "axios";
import { allCountry, Country } from "../types/Country";
const apiClient = axios.create({
  baseURL: "https://restcountries.com/",
  headers: {
    "Content-type": "application/json",
  },
});
const findAllCountry = async () => {
  const response = await apiClient.get<allCountry[]>("v2/all?fields=name,cioc");
  return response.data;
};
const findByCioc = async (cioc: string) => {
  const response = await apiClient.get<Country[]>(`v3.1/alpha/${cioc}`);
  return response.data;
};

const CountryService = {
  findAllCountry,
  findByCioc,
};

export default CountryService;
