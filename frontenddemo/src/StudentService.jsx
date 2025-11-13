import axios from "axios";

import API_BASE_URL from "./config";
// change port if needed

const StudentService = {
  getAll: () => axios.get(API_BASE_URL),
  create: (data) => axios.post(API_BASE_URL, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/${id}`, data),
  remove: (id) => axios.delete(`${API_BASE_URL}/${id}`)
};

export default StudentService;
