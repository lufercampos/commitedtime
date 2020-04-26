import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAILURE,
  SET_USER_LANGUAGE,
  SET_USER
} from "../constants/AuthConstants";

const isLogin = !!localStorage.getItem("token");
const initialState = isLogin
  ? {
      loggedIn: true,
      user: JSON.parse(localStorage.getItem("user")),
      userLanguage: JSON.parse(localStorage.getItem("userLanguage"))
    }
  : { loggedIn: false };

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true
      };

    case LOGOUT:
      return {
        user: null,
        loggedIn: false,
        loginFailed: false,
        userLanguage: null
      };

    case LOGIN_FAILURE:
      return {
        user: null,
        loggedIn: false,
        loginFailed: true,
        err: action.error,
        userLanguage: null
      };

    case SET_USER:
      return {
        ...state,
        user: action.user
      };

    case SET_USER_LANGUAGE:
      return {
        ...state,
        userLanguage: action.userLanguage
      };

    default:
      return state;
  }
}
