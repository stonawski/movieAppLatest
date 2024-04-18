import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectError } from "../Store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./authentication.css";

export const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [registerError, setRegisterError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);

  const handleLoginEvent = (e) => {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 10000); // 10 seconds
      }
    });
  };

  const handleRegisterEvent = async (e) => {
    e.preventDefault();
    let registerCredentials = {
      email,
      password,
      username,
    };
    try {
      const req = await axios.post(
        "http://localhost:3001/api/register",
        registerCredentials
      );
      const response = await req.data;
      if (response.message === "User registered successfully") {
        setEmail("");
        setPassword("");
        setUsername("");
        setIsLogin(true);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 10000); // 10 seconds
      }
    } catch (error) {
      setRegisterError(error.response.data.error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setRegisterError("");
      }, 10000);
      console.log(error.response.data.error);
    }
  };

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="formContainer">
        <Link to="/" className="arrowBack">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        {showError && (
          <div className="errorPopup">
            {error
              ? error
              : registerError
              ? registerError
              : "An error occurred. Please try again."}
          </div>
        )}
        {showSuccess && (
          <div className="successPopup">
            Registration Successfull! You can now login.
          </div>
        )}
        {isLogin ? (
          <form className="loginForm" onSubmit={handleLoginEvent}>
            <label>Email</label>
            <input
              type="email"
              required
              className="formInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              required
              className="formInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="changeForm">
              <p>Don't have an account?</p>
              <button className="changeFormButton" onClick={() => changeForm()}>
                Sign up
              </button>
            </div>
            <div className="btnContainer">
              <button type="submit" className="btnSuccess">
                LOGIN
              </button>
            </div>
          </form>
        ) : (
          <form className="registerForm" onSubmit={handleRegisterEvent}>
            <label>Email</label>
            <input
              type="email"
              required
              className="formInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              required
              className="formInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label>Username</label>
            <input
              type="username"
              required
              className="formInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <div className="changeForm">
              <p>Already have an account?</p>
              <button className="changeFormButton" onClick={() => changeForm()}>
                Sign in
              </button>
            </div>
            <div className="btnContainer">
              <button type="submit" className="btnSuccess">
                SIGN UP
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
