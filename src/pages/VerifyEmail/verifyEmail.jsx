import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";

import {
  verifyPassword,
  updateEmail,
  updateError,
  updateStatus,
  verifyEmail,
} from "utilities/slices/userSlice";
import "./_verifyEmail.scss";
export const VerifyEmail = () => {
  const [info, setInfo] = useState({});
  const { isSuccess, error, userEmail } = useSelector(
    (state) => state.user.data
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(updateError({ error: "" }));
    setInfo({});
    setInfo({ ...info, userEmail: userEmail });
    setLoading(false);
    if (isSuccess) {
      dispatch(updateStatus({ isSuccess: false }));
      history.push("/login");
    }
  }, [isSuccess, history, dispatch]);

  const handleChangeInputText = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInfo({ ...info, [name]: value });
    dispatch(updateError({ error: "" }));
  };

  const handleSubmit = async (e) => {
    console.log(info);
    if (!info) {
      updateError({ error: "Please enter your otp" });
    } else {
      dispatch(updateError({ error: "" }));
      setInfo({ info, userEmail });

      e.preventDefault();
      async function submitToSendOTP() {
        await dispatch(verifyEmail(info));
      }
      submitToSendOTP();
      setLoading(true);
    }
  };
  return (
    <div className="row w-100">
      <div className="col-sm-6 verify-background"></div>
      <div className="col-sm-6 verify-wrapper">
        <div className="verify-wrapper-content position-relative">
          {isloading && (
            <div className=" my-auto text-center position-absolute h-100 opacity-50 bg-white w-100 d-flex align-items-center justify-content-center">
              <Spinner color="primary" />
            </div>
          )}
          <div className="verify-title mb-4">Verify email</div>
          <form>
            <div className="send-otp">
              <p>OTP</p>
              <input
                className="mb-4"
                name="otp"
                onChange={handleChangeInputText}
                required
                placeholder="Enter your OTP"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
