import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import {
  register,
  updateError,
  updateStatus,
  updateEmail,
} from "utilities/slices/userSlice";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./_register.scss";

export const Register = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const history = useHistory();
  const [isloading, setLoading] = useState(false);

  const { isSuccess, error } = useSelector((state) => state.user.data);
  const handleChangeInputText = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInfo({ ...info, [name]: value });
    dispatch(updateError({ error: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function submitToRegister() {
      await dispatch(register(info));
    }
    submitToRegister();
    dispatch(updateEmail({ userEmail: info.email }));
    setLoading(true);
  };
  useEffect(() => {
    setLoading(false);
    window.scrollTo(0, 0);
    if (isSuccess) {
      dispatch(updateStatus({ isSuccess: false }));
      history.push("/login");
    }
  }, [isSuccess, history, dispatch]);
  return (
    <div className="row w-100">
      <div className="col-sm-5 register-background"></div>
      <div className="col-sm-7 register-wrapper">
        <div className="register-wrapper-content position-relative">
          {isloading && (
            <div className=" my-auto text-center position-absolute h-100 opacity-50 bg-white w-100 d-flex align-items-center justify-content-center">
              <Spinner color="primary" />
            </div>
          )}
          <div className="register-title mb-4">Create your account</div>
          <form>
            <div className="form-input">
              <div className="form-container">
                <p>Email</p>
                <input
                  onChange={handleChangeInputText}
                  className="mb-3"
                  name="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-container">
                <p>Password</p>
                <input
                  onChange={handleChangeInputText}
                  name="pswd"
                  required
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="form-container">
                <p>Fullname</p>
                <input
                  onChange={handleChangeInputText}
                  className="mb-3"
                  name="fullname"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-container">
                <p>Date of birth</p>
                <input
                  onChange={handleChangeInputText}
                  className="mb-3"
                  type="date"
                  name="dob"
                  required
                  placeholder="Enter your date of birth"
                />
              </div>
              <div className="form-container">
                <p>Phone number</p>
                <input
                  onChange={handleChangeInputText}
                  className="mb-3"
                  name="phone"
                  type="number"
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-container">
                <p>Gender</p>
                <select
                  className="form-control"
                  name="gender"
                  id="gender"
                  onChange={handleChangeInputText}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-container">
                <p>Address</p>
                <input
                  onChange={handleChangeInputText}
                  className="mb-3"
                  name="address"
                  required
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="mb-3" style={{ color: "red" }}>
              {error}
            </div>
            <div className="text-center mt-2">
              <button
                onClick={handleSubmit}
                className="btn-primary mb-2 px-3 py-2"
              >
                Create new account
              </button>
              {/* <p className="mt-3" style={{ fontSize: "0.85rem" }}>
                You have an account?
              </p> */}
              <button className="btn-secondary px-3 py-2">
                <Link to="/login">Back to Login</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
