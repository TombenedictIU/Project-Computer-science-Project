import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api/visa';

export const fetchVisaSteps = async (country, studyType) => {
  const response = await axios.get(`${API_BASE_URL}/steps`, {
    params: { country, study_type: studyType }
  });
  return response.data;
};

export const fetchVisaChecklist = async (country, studyType, fundingMode) => {
  const response = await axios.get(`${API_BASE_URL}/checklist`, {
    params: { country, study_type: studyType, funding_mode: fundingMode }
  });
  return response.data;
};

export const fetchVisaLocations = async (country) => {
  const response = await axios.get(`${API_BASE_URL}/locations`, {
    params: { country }
  });
  return response.data;
};

export const fetchVisaFinance = async () => {
  const response = await axios.get(`${API_BASE_URL}/finance`);
  return response.data;
};

export const fetchVisaInsurance = async () => {
  const response = await axios.get(`${API_BASE_URL}/insurance`);
  return response.data;
};
