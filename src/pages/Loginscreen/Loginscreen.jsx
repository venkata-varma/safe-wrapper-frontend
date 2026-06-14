import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import "./Loginscreen.css";
import Loginscreenlogo from "../../assets/navbarlogo.jpg";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/registerSlice";
import { loginUser } from "../../redux/auth/loginSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Loginscreen = () => {
  // localStorage.clear()
  const registerForm = useForm();
  const loginForm = useForm();
  let navigate = useNavigate();
  const registerFormSubmitFn = (data) => {
    let payload = {
      ...data,
      status: "active",
    };
    console.log("Register form submitted", payload);
    dispatch(registerUser(payload));
  };

  const loginFormSubmitFn = (data) => {
    dispatch(loginUser(data));
    console.log("Login form submitted", data);
  };
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("register");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const { loading, status, message } = useSelector((state) => state.register);
  const {
    loading: loginLoading,
    status: loginStatus,
    message: loginMessage,
  } = useSelector((state) => state.login);
  console.log("loading===status---message", loading, status, message);
  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (status === "success") {
      toast.success(message);

      registerForm.reset();
    }

    if (status === "fail" || status === "warning" || status === "error") {
      toast.error(message);
    }
  }, [status, message]);

  useEffect(() => {
    if (loginStatus === "success") {
      toast.success(loginMessage);

      loginForm.reset();

      // later
      navigate("/dashboard");
    }

    if (loginStatus === "fail" || loginStatus === "warning") {
      toast.error(loginMessage);
    }
  }, [loginStatus, loginMessage]);

  useEffect(()=>{
if(localStorage?.accessToken){
  navigate('/dashboard')
}
  },[])
  return (
    <div className="login-screen-whole">
      {/* <div className="logo-container">
        <img
          src={Loginscreenlogo}
          alt="Login screen logo"
          className="login-screen-logo"
        />

        <p className="login-screen-logo-text">Horse Power</p>
      </div> */}
      <div className="login-register-form-container">
        <div className="tab-container">
          <button
            type="button"
            className={`tab-button ${
              activeTab === "register" ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>

          <button
            type="button"
            className={`tab-button ${
              activeTab === "login" ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
        </div>

        <div className="form-area">
          {activeTab === "register" && (
            <form onSubmit={registerForm.handleSubmit(registerFormSubmitFn)}>
              <div className="company-name-form-div form-group">
                <label htmlFor="companyName">Company name</label>
                <input
                  type="text"
                  id="companyName"
                  {...registerForm.register("companyName")}
                  placeholder="Enter company name"
                ></input>
              </div>

              <div className="account-name-form-div form-group">
                <label htmlFor="accountName">Account name</label>
                <input
                  type="text"
                  id="accountName"
                  {...registerForm.register("accountName")}
                  placeholder="Enter name"
                ></input>
              </div>
              <div className="email-form-div form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...registerForm.register("email")}
                  placeholder="Enter email"
                ></input>
              </div>

              <div className="password-form-div form-group">
                <label htmlFor="register-password">Password</label>
                <input
                  type="password"
                  id="register-password"
                  {...registerForm.register("password", {
                    required: "Password is mandatory",
                  })}
                  placeholder="Enter password"
                ></input>
              </div>
              <div className="phone-form-div form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  {...registerForm.register("phone", {
                    required: "Phone is mandatory",
                  })}
                  placeholder="Enter phone"
                ></input>
              </div>
              <div className="checkbox-group">
                <label htmlFor="status">Status</label>
                <input
                  type="checkbox"
                  id="status"
                  {...registerForm.register("status")}
                />
              </div>
              <button type="submit" className="submit-button">
                {loading ? "Submitting..." : "Submit"}
              </button>
              <DevTool control={registerForm.control} />
            </form>
          )}

          {activeTab === "login" && (
            <form onSubmit={loginForm.handleSubmit(loginFormSubmitFn)}>
              <div className="moblile-email-form-div form-group">
                <label htmlFor="mobileEmail">Mobile / Email</label>
                <input
                  type="text"
                  id="mobileEmail"
                  {...loginForm.register("mobileEmail", {
                    required: "Mobile / Email is mandatory",
                  })}
                  placeholder="Enter Phone / Email"
                ></input>
              </div>

              <div className="password-form-div form-group">
                <label htmlFor="login-password">Password</label>
                <div className="password-input-container">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    id="login-password"
                    {...loginForm.register("password", {
                      required: "Password is mandatory",
                    })}
                    placeholder="Enter password"
                  ></input>
                  <span
                    className="eye-icon"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="show-password-container">
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showLoginPassword}
                  onChange={() => setShowLoginPassword(!showLoginPassword)}
                />

                <label htmlFor="show-password">Show Password</label>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              <DevTool control={loginForm.control} />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
