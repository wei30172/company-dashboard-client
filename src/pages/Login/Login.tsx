import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useUserLoginMutation } from "../../services/authApiSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";

import { InputWrapper, ButtonWrapper } from "../../components";
import useToggle from "../../hooks/useToggle";
import { LoginPayloadValues } from "../../types/Auth.type";
import "./Login.scss";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ErrorIcon from "@material-ui/icons/Error";
import { toast } from "react-hot-toast";

interface LocationState {
  from: {
    pathname: string;
  };
}

const Login = () => {
  // const { auth, authLoading, userLogin } = useAuthContext();
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const token: string = useSelector(selectCurrentToken);

  const navigate = useNavigate();

  const location = useLocation();
  const { from } = (location.state as LocationState) || {};
  const pathname = from?.pathname ? from.pathname : "/";

  const [userInputs, setUserInputs] = useState<LoginPayloadValues>({
    email: "",
    password: "",
  });

  const [check, toggleCheck] = useToggle<boolean>("persist", false);

  const formInputs = [
    {
      id: 1,
      label: "Email",
      errorMessage: "Email should be a valid email address!",
      name: "email",
      type: "email",
      placeholder: "Email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      required: true,
      value: "",
    },
    {
      id: 2,
      label: "Password",
      errorMessage: "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
      name: "password",
      type: "password",
      placeholder: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true,
      value: "",
    },
  ];

  useEffect(() => {
    if (token) navigate(`${pathname}`, { replace: true });
  }, [token, pathname, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // userLogin(userInputs);
    try {
      const userData = await userLogin(userInputs).unwrap();
      dispatch(setCredentials({ ...userData }));
      setUserInputs({
        email: "",
        password: "",
      });
      navigate(`${pathname}`, { replace: true });
      toast.success("Login Successfully!");
    } catch (error) {
      toast.error("Login Failure.");
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setUserInputs({ ...userInputs, [target.name]: target.value });
  };

  return isLoading ? (
    <div className="page-flex">
      <HourglassEmptyIcon />
    </div>
  ) : (
    <div className="login">
      <div className="login_form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {formInputs.map(({ id, name, label, errorMessage, ...inputProps }) => (
            <div key={id} className="form-input">
              <label>{label}</label>
              <br />
              <InputWrapper {...inputProps} name={name} value={userInputs[name as keyof LoginPayloadValues]} handleChange={handleChange} />
              <p data-testid={`error-${name}`}>
                <ErrorIcon />
                {errorMessage}
              </p>
            </div>
          ))}
          <ButtonWrapper disabled={!userInputs.email || !userInputs.password} className="btn" type="submit" title="LOGIN" />
          <div className="login_form_persist-check">
            <input type="checkbox" id="persist" onChange={toggleCheck} checked={check} />
            <label htmlFor="persist">Trust This Device</label>
          </div>
        </form>
        <div className="login_form_link flex">
          <p>Do not have an account?</p>
          <ButtonWrapper className="cursor-pointer" title="Signup" onClick={() => navigate("/signup")} />
        </div>
      </div>
    </div>
  );
};

export default Login;
