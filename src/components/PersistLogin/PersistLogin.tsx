import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useRefreshUserTokenMutation } from "../../services/authApiSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";

import useLocalStorage from "../../hooks/useLocalStorage";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

const PersistLogin = () => {
  // const { auth, refreshUserToken } = useAuthContext();
  const [refreshUserToken] = useRefreshUserTokenMutation();
  const dispatch = useDispatch();
  const token: string = useSelector(selectCurrentToken);

  const [isLoading, setIsLoading] = useState(true);
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        const userData = await refreshUserToken().unwrap();
        dispatch(setCredentials({ ...userData }));
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // run verifyRefreshToken only when we don't have the accessToken
    !token && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, [dispatch, persist, refreshUserToken, token]);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${token}`);
  // }, [token, isLoading]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <div className="page-flex">
          <HourglassEmptyIcon />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
