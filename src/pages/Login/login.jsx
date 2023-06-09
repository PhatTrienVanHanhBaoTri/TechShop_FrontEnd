import { cookiesService } from "helpers/cookiesService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import {
  login,
  updateLoggedInStatus,
  updateError,
} from "utilities/slices/userSlice";
import "./_login.scss";
function Login() {
  const location = useLocation();
  const history = useHistory();
  const [info, setInfo] = useState({});
  const { isLoggedIn, error } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleChangeInputText = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInfo({ ...info, [name]: value });
    dispatch(updateError({ error: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function submitToLogin() {
      await dispatch(login(info));
    }
    submitToLogin();
  };

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const status = cookiesService.getCookies("user");
      if (status === undefined && isLoggedIn)
        dispatch(updateLoggedInStatus({ isLoggedIn: false }));
    };
    checkLoggedInStatus();

    if (isLoggedIn) {
      if (location.state?.referrer.pathname) {
        history.push(location.state.referrer.pathname);
      } else history.push("/home");
    }
  }, [isLoggedIn, history, location, dispatch]);

  return (
    <div className="row w-100">
      <div className="col-sm-6 login-background"></div>
      <div className="col-sm-6 login-wrapper">
        <div className="login-wrapper-content">
          <div className="login-title mb-4">Welcome to TechShop</div>
          <form>
            <p>Email</p>
            <input
              className="mb-4"
              name="email"
              onChange={handleChangeInputText}
              required
              placeholder="Enter your email"
            />
            <p>Password</p>
            <input
              name="pswd"
              onChange={handleChangeInputText}
              required
              type="password"
              placeholder="Enter your password"
            />
            <div className="forgot-password pt-1">
              <p className="">Forgot password?</p>
            </div>
            <div className="mb-2" style={{ color: "red" }}>
              {error}
            </div>
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="btn-primary mb-2 px-3 py-2"
              >
                Get Started
              </button>
              <p className="my-3" style={{ fontSize: "0.85rem" }}>
                Do not have account?
              </p>
              <button className="btn-secondary px-3 py-2">
                <Link to="/register">Register account</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
