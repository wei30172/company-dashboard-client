import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { useUserRegisterMutation } from "../../services/authApiSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";

import { InputWrapper, ButtonWrapper } from "../../components";
import { SignupPayloadValues } from "../../types/Auth.type";
import "../Login/Login.scss";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ErrorIcon from "@material-ui/icons/Error";
import { toast } from "react-hot-toast";

const Signup = () => {
  // const { auth, authLoading, userRegister } = useAuthContext();
  const [userRegister, { isLoading }] = useUserRegisterMutation();
  const token: string = useSelector(selectCurrentToken);

  const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState<SignupPayloadValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formInputs = [
    {
      id: 1,
      label: "first Name",
      errorMessage: "FirstName should be 2-16 characters and shouldn't include any special character!",
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      pattern: "^[A-Za-z0-9]{2,16}$",
      required: true,
    },
    {
      id: 2,
      label: "last Name",
      errorMessage: "LastName should be 2-16 characters and shouldn't include any special character!",
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      pattern: "^[A-Za-z0-9]{2,16}$",
      required: true,
    },
    {
      id: 3,
      label: "Email",
      errorMessage: "Email should be a valid email address!",
      name: "email",
      type: "email",
      placeholder: "Email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      required: true,
    },
    {
      id: 4,
      label: "Password",
      errorMessage: "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
      name: "password",
      type: "password",
      placeholder: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true,
      value: "",
    },
    {
      id: 5,
      label: "Confirm Password",
      errorMessage: "Passwords don't match!",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      pattern: userInputs.password,
      required: true,
    },
  ];

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // userRegister(userInputs);

    try {
      await userRegister(userInputs).unwrap();
      setUserInputs({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
      toast.success("Register Successfully, please Login.");
    } catch (error) {
      toast.error("Register Failure.");
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
  ) : token ? (
    <div className="page-flex">
      <h1>You are logged in.</h1>
    </div>
  ) : (
    <div className="signup">
      <div className="signup_form">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          {formInputs.map(({ id, name, label, errorMessage, ...inputProps }) => (
            <div key={id} className="form-input">
              <label>{label}</label>
              <br />
              <InputWrapper {...inputProps} name={name} value={userInputs[name as keyof SignupPayloadValues]} handleChange={handleChange} />
              <p data-testid={`error-${name}`}>
                <ErrorIcon />
                {errorMessage}
              </p>
            </div>
          ))}
          <ButtonWrapper
            disabled={!userInputs.firstName || !userInputs.lastName || !userInputs.email || !userInputs.password || !userInputs.confirmPassword}
            className="btn"
            type="submit"
            title="REGISTER"
          />
        </form>
        <div className="signup_form_link flex">
          <p>Already have an account?</p>
          <ButtonWrapper className="cursor-pointer" title="Login" onClick={() => navigate("/login")} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
