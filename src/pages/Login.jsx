import React, { useState } from "react";
import userData from "../data/userdata.json";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import { login } from "../store/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Email is required");
    }

    if (password === "") {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    validateForm();

    try {
      const user = userData.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        alert("Login successful");
        dispatch(login(user.email));
        navigate("/foodlist");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Login</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-danger">{emailError}</p>}
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                      <p className="text-danger">{passwordError}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">
                    Submit
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

export default Login;
