import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRt = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser && currentUser?.rest?.role === "admin" ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateRt;
