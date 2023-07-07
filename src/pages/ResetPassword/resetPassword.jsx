import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetPassword, updateError } from "utilities/slices/userSlice";
import { Spinner } from "reactstrap";
import "./_resetpassword.scss";
export const ResetPassword = () => {
  const [info, setInfo] = useState({});
  const { isSuccess, error, userEmail } = useSelector(
    (state) => state.user.data
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    setInfo({});
    setInfo({ ...info, userEmail: userEmail });
    window.scrollTo(0, 0);
    setLoading(false);
    if (isSuccess) history.push("/login");
  }, [isSuccess, history, dispatch, userEmail]);

  const handleChangeInputText = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInfo({ ...info, [name]: value });
    dispatch(updateError({ error: "" }));
  };

  const handleSubmit = (e) => {
    if (!info) {
      dispatch(updateError({ error: "Please fill out" }));
    } else {
      e.preventDefault();
      console.log("Submit", info);
      async function submitToreset() {
        await dispatch(resetPassword(info));
      }
      submitToreset();
      setLoading(true);
    }
  };
  return (
    <div className="row w-100">
      <div className="col-sm-6 reset-background"></div>
      <div className="col-sm-6 reset-wrapper">
        <div className="reset-wrapper-content position-relative">
          {isloading && (
            <div className=" my-auto text-center position-absolute h-100 opacity-50 bg-white w-100 d-flex align-items-center justify-content-center">
              <Spinner color="primary" />
            </div>
          )}
          <div className="reset-title">Reset your password</div>
          <form>
            <p>New password</p>
            <input
              name="newPassword"
              className="mb-4"
              onChange={handleChangeInputText}
              required
              type="password"
              placeholder="Enter your new password"
            />
            <p>OTP</p>
            <input
              name="otp"
              className="mb-4"
              onChange={handleChangeInputText}
              required
              type="text"
              placeholder="Enter your OTP"
            />

            <div className="mb-2" style={{ color: "red" }}>
              {error}
            </div>
            <div className="text-center">
              <button
                className="btn-primary mb-2 px-3 py-2"
                onClick={handleSubmit}
              >
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
