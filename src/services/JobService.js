import API from "../helpers/Api";

export const getAllJobs = () => {
  return API.get(`rest/job/getAllJobs`);
};

export const setJobEvent = (job) => {
  return API.put(`rest/job/setJobEvent`, job);
};

export const saveJob = (job) => {
  return API.put(`rest/job/saveJob`, job);
};
