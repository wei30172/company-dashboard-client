import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  REFRESHTOKEN_REQUEST,
  REFRESHTOKEN_SUCCESS,
  REFRESHTOKEN_FAILURE,
} from "./actionTypes";

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
    case REFRESHTOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REFRESHTOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accessToken: action.payload.accessToken,
        error: null,
      };
    case REFRESHTOKEN_FAILURE:
      return {
        ...state,
        isLoading: false,
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
