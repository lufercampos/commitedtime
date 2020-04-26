import axios from "axios";
import history from "../helpers/History";
import { logout } from "../store/actions/AuthAction";
import { showAlert, toogleLoading } from "../store/actions/AppAction";

import store from "../store";

import t from "./Translation";

const api_time = axios.create({
  //baseURL: process.env.NODE_ENV !== 'production' ? 'http://0.0.0.0:3000/api/' : '',
  baseURL: "http://127.0.0.1:8080/api-time/",
  headers: {
    token: `${localStorage.getItem("token")}`
  }
});

let loadFunction = config => {
  if (localStorage.getItem("token")) {
    config.headers["token"] = localStorage.getItem("token");
  } else {
    config.headers["token"] = null;
  }
  store.dispatch(toogleLoading());

  return config;
};

let finishFunction = response => {
  store.dispatch(toogleLoading());
  let result = {
    data: null,
    message: ""
  };
  try {
    if (response) {
      result.data = response.data;
      result.message = "Requisição finalizada com sucesso!";
      return Promise.resolve(result);
    } else {
      result.data = null;
      result.message = "Erro desconhecido";
      return Promise.reject(result);
    }
  } catch (error) {
    result.message = error.message;
    return Promise.reject(result);
  }
};

let errorFunction = error => {
  store.dispatch(toogleLoading());
  let result = {
    data: null,
    message: ""
  };

  try {
    if (error.message && error.message === "Network Error") {
      if (history.location.pathname !== "/login") {
        store.dispatch(logout());
      }
      result.message = t("c.login.networkerror");
    } else {
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        if (history.location.pathname !== "/login") {
          store.dispatch(logout()).then(() => {
            store.dispatch(
              showAlert({
                message: error.response.data.erro,
                options: {
                  variant: "warning",
                  anchorOrigin: { vertical: "top", horizontal: "center" }
                }
              })
            );
          });
        } else {
          result.message = error.response.data.message;
        }
      } else if (error.response.status === 403) {
        if (history.location.pathname !== "/login") {
          store.dispatch(logout()).then(() => {
            store.dispatch(
              showAlert({
                message: error.response.data.erro,
                options: {
                  variant: "warning",
                  anchorOrigin: { vertical: "top", horizontal: "center" }
                }
              })
            );
          });
        } else {
          result.message = error.response.data.erro;
        }
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        //Array de error será retornado quando a API faz o tratamento.
        for (var idx in error.response.data.errors) {
          if (error.response.data.errors[idx].message) {
            if (error.response.data.errors[idx].field) {
              result.message +=
                t(
                  error.response.data.errors[idx].message,
                  t(error.response.data.errors[idx].field)
                ) + "\n";
            } else {
              result.message +=
                t(error.response.data.errors[idx].message) + "\n";
            }
          } else if (error.message) {
            result.message += t(error.message) + "\n";
          }
        }
      } else if (error.response && error.response.data) {
        result.message = error.response.data;
      } else if (error.message) {
        result.message = error.message;
      }
    }

    return Promise.reject(result);
  } catch (error) {
    result.message = error.message;
    return Promise.reject(result);
  }
};

api_time.interceptors.request.use(loadFunction);
api_time.interceptors.response.use(finishFunction, errorFunction);

export default api_time;
