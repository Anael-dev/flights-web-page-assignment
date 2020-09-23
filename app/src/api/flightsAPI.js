import axios from "axios";

const getAllFlights = async () => {
  const response = await axios.get("/api/flights");
  return response.data;
};

const getFlight = async (id) => {
  const response = await axios.get(`/api/flights/${id}`);
  return response.data;
};

const deleteFlight = async (id) => {
  const response = await axios.delete(`/api/flights/${id}`);
  return response.data;
};

const addFlight = async (obj) => {
  const response = await axios.post("/api/flights", obj);
  return response.data;
};

const editFlight = async (id, obj) => {
  const response = await axios.put(`/api/flights/${id}`, obj);
  return response.data;
};

export default {
  getAllFlights,
  getFlight,
  deleteFlight,
  addFlight,
  editFlight,
};
