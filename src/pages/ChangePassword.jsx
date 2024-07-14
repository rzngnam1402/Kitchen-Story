import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { updatePassword } from "../store/UserSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    setPasswordError("");

    if (currentPassword === "") {
      setPasswordError("Current password is required");
      return false;
    }

    if (newPassword === "") {
      setPasswordError("New password is required");
      return false;
    } else if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }

    if (confirmPassword === "") {
      setPasswordError("Please confirm your new password");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(updatePassword({ newPassword }));
    alert("Password updated successfully");
    navigate("/foodlist");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Change Password</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-4">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordError && (
                      <p className="text-danger">{passwordError}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
