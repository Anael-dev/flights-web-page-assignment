import axios from "axios";

const getAllAirports = async () => {
  const response = await axios.get("/api/airports");
  return response.data;
};

const getAirport = async (id) => {
  const response = await axios.get(`/api/airports/${id}`);
  return response.data;
};

const deleteAirport = async (id) => {
  const response = await axios.delete(`/api/airports/${id}`);
  return response.data;
};

const addAirport = async (obj) => {
  const response = await axios.post("/api/airports", obj);
  return response.data;
};

const editAirport = async (id, obj) => {
  const response = await axios.put(`/api/airports/${id}`, obj);
  return response.data;
};

const getAirportByCode = async (code) => {
  const response = await axios.get(`/api/airports/iata/${code}`);
  return response.data;
};

export default {
  getAllAirports,
  getAirportByCode,
  getAirport,
  deleteAirport,
  addAirport,
  editAirport,
};
