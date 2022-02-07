import axios from "axios";
import {
  API_URL,
  USERS,
  DOCTORS,
  PATIENTS
} from "./config";

const saveInLocalStorage = userDetails => {
  if (userDetails.data.message.id == null) {
    throw "error";
  }

  localStorage.setItem('userId', userDetails.data.message.id);
  localStorage.setItem('userToken', userDetails.headers.authorization);
  localStorage.setItem('userRol', userDetails.data.message.rol);

}

const apiSettings = {
  
  // User
  createUser: async body => {
    const endpoint = `${USERS}`;
    return await (await axios.post(endpoint, body));
  },
  login: async body => {
    const endpoint = `${USERS}/sign_in`;
    return await (await axios.post(endpoint, body).then((response) => {
      saveInLocalStorage(response);
    }));
  },
  logout: async () => {
    const endpoint = `${USERS}/sign_out`;
    return await (await axios.delete(endpoint, {headers: {'Authorization': localStorage.userToken}}));
  },

  // Doctor
  getDoctors: async () => {
    const endpoint = `${DOCTORS}`;
    return await (await fetch(endpoint)).json();
  },
  getDoctor: async doctorId => {
    const endpoint = `${DOCTORS}/${doctorId}`;
    return await (await fetch(endpoint)).json();
  },
  createDoctor: async body => {
    const endpoint = `${DOCTORS}`;
    return await (await axios.post(endpoint, body));
  },
  updateDoctor: async (doctorId, body) => {
    const endpoint = `${DOCTORS}/${doctorId}`;
    return await (await axios.put(endpoint, body));
  },
  deleteDoctor: async doctorId => {
    const endpoint = `${DOCTORS}/${doctorId}`;
    return await (await axios.delete(endpoint));
  },

  // Patient
  getPatients: async () => {
    const endpoint = `${PATIENTS}`;
    return await (await fetch(endpoint)).json();
  },
  getPatient: async patientId => {
    const endpoint = `${PATIENTS}/${patientId}`;
    return await (await fetch(endpoint)).json();
  },
  createPatient: async body => {
    const endpoint = `${PATIENTS}`;
    return await (await axios.post(endpoint, body));
  },
  updatePatient: async (patientId, body) => {
    const endpoint = `${PATIENTS}/${patientId}`;
    return await (await axios.put(endpoint, body));
  },
  deletePatient: async patientId => {
    const endpoint = `${PATIENTS}/${patientId}`;
    return await (await axios.delete(endpoint));
  }

}

export default apiSettings;
