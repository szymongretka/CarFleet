import axios from "axios";
import authHeader from "../components/Auth/header";

const baseUrl = "http://localhost:5000/";
const baseCarUrl = "http://localhost:5000/car/";

export default {
  car(url = baseCarUrl) {
    return {
      fetchAll: () => axios.get(baseUrl + "cars", { headers: authHeader() }),
      fetchById: (id) => axios.get(url + id, { headers: authHeader() }),
      create: (newRecord) =>
        axios.post(url, newRecord, { headers: authHeader() }),
      update: (id, updateRecord) =>
        axios.put(url + id, updateRecord, { headers: authHeader() }),
      delete: (id) => axios.delete(url + id, { headers: authHeader() }),
    };
  },
};
