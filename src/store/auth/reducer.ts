import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
} from "./actionTypes";

import { AuthActions } from "./types";

const auth = localStorage.getItem("auth");

const initialState: AuthState = {
  user: "",
  token: auth ? JSON.parse(auth).token : "",
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
        token: action.payload.token,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: "",
        token: "",
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
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        token: "",
        error: action.payload.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: false,
        user: "",
        token: "",
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
