import React, { useState, useContext, createContext, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, refreshToken, logout } from "../api/auth";
import { SignupPayloadValues, LoginPayloadValues } from "../types/Auth.type";
import { toast } from "react-hot-toast";

interface AuthContextProps {
  authLoading: boolean;
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
  // persist: boolean;
  // setPersist: Dispatch<SetStateAction<boolean>>;
  userLogin: (values: LoginPayloadValues) => Promise<void>;
  userRegister: (values: SignupPayloadValues) => Promise<void>;
  refresUserhToken: () => Promise<string | undefined>;
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
  // const persistStorage = localStorage.getItem("persist");
  // const [persist, setPersist] = useState<boolean>(persistStorage ? JSON.parse(persistStorage) : false);

  const userLogout = async () => {
    setAuth({ user: {} as IUser, accessToken: "" });
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const userRegister = async (values: SignupPayloadValues) => {
    setAuthLoading(true);
    try {
      await register(values);
      toast.success("Register Successfully!");
    } catch (error) {
      toast.error("Register Failure.");
    } finally {
      setAuthLoading(false);
    }
  };

  const userLogin = async (values: LoginPayloadValues) => {
    setAuthLoading(true);
    try {
      const res: IAuth = await login(values);
      const { role, name, email } = res?.user;
      const accessToken = res?.accessToken;
      const newAuth = {
        user: { role, name, email },
        accessToken,
      };
      setAuth(newAuth);
      toast.success("Login Successfully!");
    } catch (error) {
      toast.error("Login Failure.");
    } finally {
      setAuthLoading(false);
    }
  };

  const refresUserhToken = async () => {
    try {
      const res: { user: IUser; accessToken: string } = await refreshToken();
      setAuth({
        ...auth,
        user: res.user,
        accessToken: res.accessToken,
      });
      return res.accessToken;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authLoading,
        auth,
        setAuth,
        // persist,
        // setPersist,
        userLogin,
        userRegister,
        refresUserhToken,
        userLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
