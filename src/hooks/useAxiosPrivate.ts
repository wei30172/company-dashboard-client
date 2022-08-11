import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuthContext } from "../contexts/AuthContext";

const useAxiosPrivate = () => {
  const { auth, userRefreshToken } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers)
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await userRefreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, userRefreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
