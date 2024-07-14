import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/UserSlice";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  useEffect(() => {
    handleSignOut();
  });

  return <div>SignOut Page</div>;
};
