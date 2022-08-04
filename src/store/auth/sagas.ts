import { login, signup } from "../../api/authAPI";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
} from "./actions";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "./actionTypes";
import { AuthPayloadValues } from "./types";
import { toast } from "react-hot-toast";

const userLogin = async (payload: {
  values: AuthPayloadValues;
  callback: () => void;
}) => {
  const res = await login(payload.values);
  return res;
};

const userSignup = async (payload: {
  values: AuthPayloadValues;
  callback: () => void;
}) => {
  const res = await signup(payload.values);
  return res;
};

function* loginSaga(action: any) {
  try {
    const res: IAuth = yield call(userLogin, action.payload);
    yield all([
      toast.success("Login Successfully!"),
      put(
        loginSuccess({
          user: res.result.email,
          token: res.token,
        }),
      ),
    ]);

    action.payload.callback(res);
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield all([
        toast.error("Login Failure."),
        put(
          loginFailure({
            error: err.message,
          }),
        ),
      ]);
    }
  }
}

function* signupSaga(action: any) {
  try {
    const res: IAuth = yield call(userSignup, action.payload);

    yield all([
      toast.success("Signup Successfully!"),
      put(
        signupSuccess({
          user: res.result.email,
          token: res.token,
        }),
      ),
    ]);

    action.payload.callback(res);
  } catch (err: unknown) {
    if (err instanceof Error) {
      yield all([
        toast.error("Signup Failure."),
        signupFailure({
          error: err.message,
        }),
      ]);
    }
  }
}

function* authSaga() {
  yield all([takeLatest(LOGIN_REQUEST, loginSaga)]);
  yield all([takeLatest(SIGNUP_REQUEST, signupSaga)]);
}

export default authSaga;
