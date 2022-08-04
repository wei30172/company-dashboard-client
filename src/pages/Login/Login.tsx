import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropsFromRedux, authConnector } from "../../store/auth/connector";
import { InputWrapper, ButtonWrapper } from "../../components";
import { AuthPayloadValues } from "../../store/auth/types";
import "./Login.scss";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ErrorIcon from "@material-ui/icons/Error";

const Login = ({ token, isLoading, loginRequest }: PropsFromRedux) => {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState<AuthPayloadValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

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
      errorMessage:
        "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
      name: "password",
      type: "password",
      placeholder: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true,
      value: "",
    },
  ];

  const callback = (res: IAuth) => {
    const auth: IAuth = {
      result: {
        name: res.result.name,
        email: res.result.email,
      },
      token: res.token,
    };
    localStorage.setItem("auth", JSON.stringify(auth));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginRequest({ values: userInputs, callback });
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
          {formInputs.map(
            ({ id, name, label, errorMessage, ...inputProps }) => (
              <div key={id} className="form-input">
                <label>{label}</label>
                <br />
                <InputWrapper
                  {...inputProps}
                  name={name}
                  value={userInputs[name as keyof AuthPayloadValues]}
                  handleChange={handleChange}
                />
                <p data-testid={`error-${name}`}>
                  <ErrorIcon />
                  {errorMessage}
                </p>
              </div>
            ),
          )}
          <ButtonWrapper
            disabled={!userInputs.email || !userInputs.password}
            className="btn"
            type="submit"
            title="LOGIN"
          />
        </form>
        <div className="login_form_link flex">
          <p>Do not have an account?</p>
          <ButtonWrapper
            className="cursor-pointer"
            title="Signup"
            onClick={() => navigate("/signup")}
          />
        </div>
      </div>
    </div>
  );
};

export default authConnector(Login);
