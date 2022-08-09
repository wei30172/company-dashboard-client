import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT_REQUEST } from "./actionTypes";

import { AuthActions } from "./types";

const auth = localStorage.getItem("auth");

const initialState: AuthState = {
  user: auth ? JSON.parse(auth).user : {},
  accessToken: auth ? JSON.parse(auth).accessToken : "",
  isLoading: false,
  error: "",
};

const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: {},
        accessToken: "",
        error: action.payload.error,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: {},
        accessToken: "",
        error: action.payload.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: false,
        user: {},
        accessToken: "",
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
