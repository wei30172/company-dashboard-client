import { connect, ConnectedProps } from "react-redux";
import { loginRequest, signupRequest, logoutRequest, refreshTokenRequest } from "./actions";

interface StateProps {
  auth: AuthState;
}
const mapState = (state: StateProps) => ({
  user: state.auth.user,
  accessToken: state.auth.accessToken,
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

const mapDispatch = {
  loginRequest,
  signupRequest,
  logoutRequest,
  refreshTokenRequest,
};

export const authConnector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof authConnector>;
