import API from "../helpers/Api";

export const login = (params) => {
  return API.post(
    `LoginService?email=${params.email}&password=${params.password}`
  );
};

export const logout = () => {
  return API.post(`LogoutService`);
};

export const getUserByToken = () => {
  return API.get(`rest/user/getUserByToken`);
};

export const saveUser = (user) => {
  return API.put(`rest/user/saveUser`, user);
};
