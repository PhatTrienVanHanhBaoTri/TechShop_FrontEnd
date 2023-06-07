import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="row">
      <div className="col-sm-6 login-background"></div>
      <div className="col-sm-6 login-wrapper">
        <div className="login-wrapper-content">
          <div className="login-title">Create your account</div>
          <form>
            <p>Email</p>
            <input name="email" required placeholder="Enter your email" />
            <p>Password</p>
            <input
              name="pswd"
              required
              type="password"
              placeholder="Enter your password"
            />
            <div className="text-center">
              <button className="btn mb-3">Create account</button>
              <Link to="/login">Back to login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
