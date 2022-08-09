import { login, register } from "../../api/auth";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { loginSuccess, loginFailure, signupSuccess, signupFailure } from "./actions";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "./actionTypes";
import { SignupPayloadValues, LoginPayloadValues } from "./types";
import { toast } from "react-hot-toast";

const userLogin = async (payload: { values: LoginPayloadValues; callback: () => void }) => {
  const res = await login(payload.values);
  return res;
};

const userSignup = async (payload: { values: SignupPayloadValues; callback: () => void }) => {
  const res = await register(payload.values);
  return res;
};

function* loginSaga(action: any) {
  try {
    const res: IAuth = yield call(userLogin, action.payload);
    yield all([
      toast.success("Login Successfully!"),
      put(
        loginSuccess({
          user: {
            name: res.user.name,
            email: res.user.email,
            role: res.user.role,
          },
          accessToken: res.accessToken,
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
    const res: IUser = yield call(userSignup, action.payload);

    yield all([toast.success("Signup Successfully! Please Login."), put(signupSuccess())]);

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
