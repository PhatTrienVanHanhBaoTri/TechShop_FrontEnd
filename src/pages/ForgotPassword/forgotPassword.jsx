import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";

import {
  forgotPassword,
  updateEmail,
  updateError,
  updateStatus,
} from "utilities/slices/userSlice";
import "./_forgotPassword.scss";
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { isSuccess, error } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(updateError({ error: "" }));
    setLoading(false);
    if (isSuccess) {
      dispatch(updateStatus({ isSuccess: false }));
      history.push("/reset-password");
    }
  }, [isSuccess, history, dispatch]);

  const handleSubmit = async (e) => {
    if (!email) {
      updateError({ error: "Please enter your email" });
    } else {
      dispatch(updateError({ error: "" }));
      e.preventDefault();
      async function submitToSendOTP() {
        await dispatch(forgotPassword(email));
      }
      submitToSendOTP();
      dispatch(updateEmail({ userEmail: email }));
      setLoading(true);
    }
  };
  return (
    <div className="row w-100">
      <div className="col-sm-6 forgot-background"></div>
      <div className="col-sm-6 forgot-wrapper">
        <div className="forgot-wrapper-content position-relative">
          {isloading && (
            <div className=" my-auto text-center position-absolute h-100 opacity-50 bg-white w-100 d-flex align-items-center justify-content-center">
              <Spinner color="primary" />
            </div>
          )}
          <div className="forgot-title mb-4">Forgot password</div>
          <form>
            <div className="send-otp">
              <p>Email</p>
              <input
                className="mb-4"
                name="userEmail"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-2 mx-auto" style={{ color: "red" }}>
              <p>{error}</p>
            </div>
            <div className="text-center">
              <button
                className="btn-primary mb-2 px-3 py-2"
                onClick={handleSubmit}
              >
                Send OTP
              </button>
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
