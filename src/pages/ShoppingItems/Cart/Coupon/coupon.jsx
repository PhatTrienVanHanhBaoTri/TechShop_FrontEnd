import React, { useState, useRef } from "react";
import "./_coupon.scss";
import CouponApi from "api/couponApi";
import { applyCoupon } from "utilities/slices/cartSlice";
import { useDispatch } from "react-redux";
import handlePrice from "helpers/formatPrice";
import { cookiesService } from "helpers/cookiesService";

function Coupon() {
  const [coupon, setCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(null);
  const typingTimeoutRef = useRef(null);
  const dispatch = useDispatch();

  const handleChangeCoupon = (e) => {
    const value = e.target.value;
    setCouponCode(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      submitCoupon(value);
    }, 300);
  };

  const submitCoupon = async (input) => {
    // TODO: solve when status code is 404
    setCoupon(null);
    let response = await CouponApi.getAllCoupons();
    let valid = false;
    let user = null;
    user = cookiesService.getCookies("user");

    for (let i = 0; i < response.length; i++) {
      const coupon = response[i];
      
      if (coupon.couponCode === input) {
        const used = await CouponApi.checkUsedCoupon(user.userID, coupon.id);
        const expired = await checkExpiredCoupon(coupon.expiry);

        if (!used && expired === false) {
          valid = true;
          setCoupon(coupon);
        }
      }
    }

    if (!valid) {
      if (input !== "") {
        setCouponStatus("unavailable");
      } else {
        setCouponStatus(null);
      }
    } else {
        setCouponStatus("available");
    }
  };

  const checkExpiredCoupon = (expiry) => {
    const now = new Date();
    const exp = new Date(expiry);

    if (now <= exp) {
      return false;
    } else {
      return true;
    }
  }

  const renderCouponStatus = (status) => {
    return status !== null ? (
      <>
        {coupon ? (
          <span className={`alert ${status}`}>Your coupon is {status} - {coupon?.couponType === "PERCENT" ? coupon?.value + "%" : handlePrice(coupon?.value) + " đ"}</span>
        ) : (
          <span className={`alert ${status}`}>Your coupon is {status}</span>
        )}
      </>
    ) : (
      ""
    );
  };

  const handleApplyCoupon = () => {
    // console.log(coupon);
    dispatch(applyCoupon(coupon));
    setCoupon(null);
    setCouponCode("");
    setCouponStatus(null);
  }

  return (
    <div className="coupon h-100">
      <div>
        <h4>Coupon Discount</h4>
      </div>
      <p>Enter your coupon code if you have one!</p>
      <div className="d-flex flex-column">
        <input
          placeholder="Enter your code here"
          value={couponCode}
          onChange={handleChangeCoupon}
        />
        {renderCouponStatus(couponStatus)}
      </div>
      <div>
        <button onClick={handleApplyCoupon} disabled={couponStatus === "available" ? false : true} type="button" className="apply-coupon-btn border-0 mt-2 p-2 text-nowrap">
          Apply coupon
        </button>
      </div>
    </div>
  );
}

export default Coupon;
