import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, refresUserhToken } = useAuthContext();
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresUserhToken();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // run verifyRefreshToken only when we don't have the accessToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, [auth?.accessToken, persist, refresUserhToken, setIsLoading]);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${auth?.accessToken}`);
  // }, [auth?.accessToken, isLoading]);

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
