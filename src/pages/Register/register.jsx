import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "utilities/slices/userSlice";
import { useState } from "react";
import "./_register.scss";

export const Register = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const handleChangeInputText = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function submitToRegister() {
      await dispatch(register(info));
    }
    submitToRegister();
  };
  return (
    <div className="row w-100">
      <div className="col-sm-5 register-background"></div>
      <div className="col-sm-7 register-wrapper">
        <div className="register-wrapper-content">
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
                  name="DOB"
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

            {/* <div className="mb-3" style={{ color: "red" }}>
              {error}
            </div> */}
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
