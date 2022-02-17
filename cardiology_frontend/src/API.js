import axios from "axios";
import {
  API_URL,
  USERS,
  DOCTORS,
  PATIENTS,
  HOSPITALS,
  FOLLOWUPS,
  PARAMETERS,
  TEMPLATES,
  TEMPLATES_PARAMS,
  ANSWERS
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
  chechToken: async token => {
    const endpoint = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`;
    return await (await fetch(endpoint)).json();
  },

  // Doctor
  getDoctors: async doctorId => {
    const endpoint = `${DOCTORS}?id=${doctorId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  getDoctor: async doctorId => {
    const endpoint = `${DOCTORS}/${doctorId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  createDoctor: async body => {
    const endpoint = `${DOCTORS}`;
    return await (await axios.post(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  updateDoctor: async (doctorId, body) => {
    const endpoint = `${DOCTORS}/${doctorId}`;
    return await (await axios.put(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  deleteDoctor: async doctorId => {
    const endpoint = `${DOCTORS}/${doctorId}`;
    return await (await axios.delete(endpoint, {headers: {'Authorization': localStorage.userToken}}));
  },

  // Patient
  getPatients: async patientId => {
    const endpoint = patientId == null
      ? `${PATIENTS}`
      : `${PATIENTS}?id=${patientId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  getPatient: async patientId => {
    const endpoint = `${PATIENTS}/${patientId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  createPatient: async body => {
    const endpoint = `${PATIENTS}`;
    return await (await axios.post(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  updatePatient: async (patientId, body) => {
    const endpoint = `${PATIENTS}/${patientId}`;
    return await (await axios.put(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  deletePatient: async patientId => {
    const endpoint = `${PATIENTS}/${patientId}`;
    return await (await axios.delete(endpoint, {headers: {'Authorization': localStorage.userToken}}));
  },

  // Hospital
  getHospitals: async () => {
    const endpoint = `${HOSPITALS}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  getHospital: async hospitalId => {
    const endpoint = `${HOSPITALS}/${hospitalId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  createHospital: async body => {
    const endpoint = `${HOSPITALS}`;
    return await (await axios.post(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  updateHospital: async (hospitalId, body) => {
    const endpoint = `${HOSPITALS}/${hospitalId}`;
    return await (await axios.put(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  deleteHospital: async hospitalId => {
    const endpoint = `${HOSPITALS}/${hospitalId}`;
    return await (await axios.delete(endpoint, {headers: {'Authorization': localStorage.userToken}}));
  },

  // Followup
  getFollowUps: async patientId => {
    const endpoint = patientId == null
      ? `${FOLLOWUPS}`
      : `${FOLLOWUPS}?id=${patientId}`
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  getFollowUp: async followUpId => {
    const endpoint = `${FOLLOWUPS}/${followUpId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  createFollowUp: async body => {
    const endpoint = `${FOLLOWUPS}`;
    return await (await axios.post(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  updateFollowUp: async (followUpId, body) => {
    const endpoint = `${FOLLOWUPS}/${followUpId}`;
    return await (await axios.put(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  deleteFollowUp: async followUpId => {
    const endpoint = `${FOLLOWUPS}/${followUpId}`;
    return await (await axios.delete(endpoint, {headers: {'Authorization': localStorage.userToken}}));
  },

  // Parameter
  getParameters: async () => {
    const endpoint = `${PARAMETERS}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  getParameter: async parameterId => {
    const endpoint = `${PARAMETERS}/${parameterId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  createParameter: async body => {
    const endpoint = `${PARAMETERS}`;
    return await (await axios.post(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  updateParameter: async (parameterId, body) => {
    const endpoint = `${PARAMETERS}/${parameterId}`;
    return await (await axios.put(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  deleteParameter: async parameterId => {
    const endpoint = `${PARAMETERS}/${parameterId}`;
    return await (await axios.delete(endpoint, {headers: {'Authorization': localStorage.userToken}}));
  },

  // Followuptemplate
  getTemplates: async () => {
    const endpoint = `${TEMPLATES}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  getTemplate: async templateId => {
    const endpoint = `${TEMPLATES}/${templateId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  createTemplate: async body => {
    const endpoint = `${TEMPLATES}`;
    return await (await axios.post(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  updateTemplate: async (templateId, body) => {
    const endpoint = `${TEMPLATES}/${templateId}`;
    return await (await axios.put(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  deleteTemplate: async templateId => {
    const endpoint = `${TEMPLATES}/${templateId}`;
    return await (await axios.delete(endpoint, {headers: {'Authorization': localStorage.userToken}}));
  },

  // Followuptemplate-Parameter
  getTemplatesParams: async templateId => {
    const endpoint = templateId == null
      ? `${TEMPLATES_PARAMS}`
      : `${TEMPLATES_PARAMS}?id=${templateId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  getTemplateParam: async templateParamId => {
    const endpoint = `${TEMPLATES_PARAMS}/${templateParamId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  createTemplateParam: async body => {
    const endpoint = `${TEMPLATES_PARAMS}`;
    return await (await axios.post(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  updateTemplateParam: async (templateParamId, body) => {
    const endpoint = `${TEMPLATES_PARAMS}/${templateParamId}`;
    return await (await axios.put(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  deleteTemplateParam: async templateParamId => {
    const endpoint = `${TEMPLATES_PARAMS}/${templateParamId}`;
    return await (await axios.delete(endpoint, {headers: {'Authorization': localStorage.userToken}}));
  },

  // Answer
  getAnswers: async followupId => {
    const endpoint = followupId == null
      ? `${ANSWERS}`
      : `${ANSWERS}?id=${followupId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  getAnswer: async answerId => {
    const endpoint = `${ANSWERS}/${answerId}`;
    return await (await fetch(endpoint, {headers: {'Authorization': localStorage.userToken}})).json();
  },
  createAnswer: async body => {
    const endpoint = `${ANSWERS}`;
    return await (await axios.post(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  updateAnswer: async (answerId, body) => {
    const endpoint = `${ANSWERS}/${answerId}`;
    return await (await axios.put(endpoint, body, {headers: {'Authorization': localStorage.userToken}}));
  },
  deleteAnswer: async answerId => {
    const endpoint = `${ANSWERS}/${answerId}`;
    return await (await axios.delete(endpoint, {headers: {'Authorization': localStorage.userToken}}));
  }

}

export default apiSettings;
