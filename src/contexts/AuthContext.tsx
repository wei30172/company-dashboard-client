import React, { useState, useContext, createContext, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, refreshToken } from "../api/auth";
import { SignupPayloadValues, LoginPayloadValues } from "../types/Auth.type";
import { toast } from "react-hot-toast";

interface AuthContextProps {
  authLoading: boolean;
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
  userLogin: (values: LoginPayloadValues) => Promise<void>;
  userRegister: (values: SignupPayloadValues) => Promise<void>;
  userRefreshToken: () => Promise<string | undefined>;
  userLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authLoading: false,
  auth: {
    user: {} as IUser,
    accessToken: "",
  },
} as AuthContextProps);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [authLoading, setAuthLoading] = useState(false);
  const [auth, setAuth] = useState<IAuth>({ user: {} as IUser, accessToken: "" });

  const userLogout = () => {
    setAuth({ user: {} as IUser, accessToken: "" });
    navigate("/");
  };

  const userRegister = async (values: SignupPayloadValues) => {
    try {
      setAuthLoading(true);
      await register(values);
      setAuthLoading(false);
      toast.success("Register Successfully!");
    } catch (error) {
      setAuthLoading(false);
      toast.error("Register Failure.");
    }
  };

  const userLogin = async (values: LoginPayloadValues) => {
    try {
      setAuthLoading(true);
      const res: IAuth = await login(values);
      const { role, name, email } = res?.user;
      const accessToken = res?.accessToken;
      const newAuth = {
        user: { role, name, email },
        accessToken,
      };
      setAuth(newAuth);
      setAuthLoading(false);
      toast.success("Login Successfully!");
    } catch (error) {
      setAuthLoading(false);
      toast.error("Login Failure.");
    }
  };

  const userRefreshToken = async () => {
    try {
      setAuthLoading(true);
      const res: { accessToken: string } = await refreshToken();
      setAuth({
        ...auth,
        accessToken: res.accessToken,
      });
      setAuthLoading(false);
      return res.accessToken;
    } catch (error) {
      setAuthLoading(false);
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authLoading,
        auth,
        setAuth,
        userLogin,
        userRegister,
        userRefreshToken,
        userLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
