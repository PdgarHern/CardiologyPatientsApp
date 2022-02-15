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

  // Doctor
  getDoctors: async doctorId => {
    const endpoint = `${DOCTORS}?id=${doctorId}`;
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
  getPatients: async patientId => {
    const endpoint = patientId == null
      ? `${PATIENTS}`
      : `${PATIENTS}?id=${patientId}`;
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
  },

  // Hospital
  getHospitals: async () => {
    const endpoint = `${HOSPITALS}`;
    return await (await fetch(endpoint)).json();
  },
  getHospital: async hospitalId => {
    const endpoint = `${HOSPITALS}/${hospitalId}`;
    return await (await fetch(endpoint)).json();
  },
  createHospital: async body => {
    const endpoint = `${HOSPITALS}`;
    return await (await axios.post(endpoint, body));
  },
  updateHospital: async (hospitalId, body) => {
    const endpoint = `${HOSPITALS}/${hospitalId}`;
    return await (await axios.put(endpoint, body));
  },
  deleteHospital: async hospitalId => {
    const endpoint = `${HOSPITALS}/${hospitalId}`;
    return await (await axios.delete(endpoint));
  },

  // Followup
  getFollowUps: async patientId => {
    const endpoint = patientId == null
      ? `${FOLLOWUPS}`
      : `${FOLLOWUPS}?id=${patientId}`
    return await (await fetch(endpoint)).json();
  },
  getFollowUp: async followUpId => {
    const endpoint = `${FOLLOWUPS}/${followUpId}`;
    return await (await fetch(endpoint)).json();
  },
  createFollowUp: async body => {
    const endpoint = `${FOLLOWUPS}`;
    return await (await axios.post(endpoint, body));
  },
  updateFollowUp: async (followUpId, body) => {
    const endpoint = `${FOLLOWUPS}/${followUpId}`;
    return await (await axios.put(endpoint, body));
  },
  deleteFollowUp: async followUpId => {
    const endpoint = `${FOLLOWUPS}/${followUpId}`;
    return await (await axios.delete(endpoint));
  },

  // Parameter
  getParameters: async () => {
    const endpoint = `${PARAMETERS}`;
    return await (await fetch(endpoint)).json();
  },
  getParameter: async parameterId => {
    const endpoint = `${PARAMETERS}/${parameterId}`;
    return await (await fetch(endpoint)).json();
  },
  createParameter: async body => {
    const endpoint = `${PARAMETERS}`;
    return await (await axios.post(endpoint, body));
  },
  updateParameter: async (parameterId, body) => {
    const endpoint = `${PARAMETERS}/${parameterId}`;
    return await (await axios.put(endpoint, body));
  },
  deleteParameter: async parameterId => {
    const endpoint = `${PARAMETERS}/${parameterId}`;
    return await (await axios.delete(endpoint));
  },

  // Followuptemplate
  getTemplates: async () => {
    const endpoint = `${TEMPLATES}`;
    return await (await fetch(endpoint)).json();
  },
  getTemplate: async templateId => {
    const endpoint = `${TEMPLATES}/${templateId}`;
    return await (await fetch(endpoint)).json();
  },
  createTemplate: async body => {
    const endpoint = `${TEMPLATES}`;
    return await (await axios.post(endpoint, body));
  },
  updateTemplate: async (templateId, body) => {
    const endpoint = `${TEMPLATES}/${templateId}`;
    return await (await axios.put(endpoint, body));
  },
  deleteTemplate: async templateId => {
    const endpoint = `${TEMPLATES}/${templateId}`;
    return await (await axios.delete(endpoint));
  },

  // Followuptemplate-Parameter
  getTemplatesParams: async templateId => {
    const endpoint = templateId == null
      ? `${TEMPLATES_PARAMS}`
      : `${TEMPLATES_PARAMS}?id=${templateId}`;
    return await (await fetch(endpoint)).json();
  },
  getTemplateParam: async templateParamId => {
    const endpoint = `${TEMPLATES_PARAMS}/${templateParamId}`;
    return await (await fetch(endpoint)).json();
  },
  createTemplateParam: async body => {
    const endpoint = `${TEMPLATES_PARAMS}`;
    return await (await axios.post(endpoint, body));
  },
  updateTemplateParam: async (templateParamId, body) => {
    const endpoint = `${TEMPLATES_PARAMS}/${templateParamId}`;
    return await (await axios.put(endpoint, body));
  },
  deleteTemplateParam: async templateParamId => {
    const endpoint = `${TEMPLATES_PARAMS}/${templateParamId}`;
    return await (await axios.delete(endpoint));
  },

  // Answer
  getAnswers: async followupId => {
    const endpoint = followupId == null
      ? `${ANSWERS}`
      : `${ANSWERS}?id=${followupId}`;
    return await (await fetch(endpoint)).json();
  },
  getAnswer: async answerId => {
    const endpoint = `${ANSWERS}/${answerId}`;
    return await (await fetch(endpoint)).json();
  },
  createAnswer: async body => {
    const endpoint = `${ANSWERS}`;
    return await (await axios.post(endpoint, body));
  },
  updateAnswer: async (answerId, body) => {
    const endpoint = `${ANSWERS}/${answerId}`;
    return await (await axios.put(endpoint, body));
  },
  deleteAnswer: async answerId => {
    const endpoint = `${ANSWERS}/${answerId}`;
    return await (await axios.delete(endpoint));
  }

}

export default apiSettings;
