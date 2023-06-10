import * as UrlConstant from "utilities/UrlConstant";
import axiosClient from "./axiosClient";
const CouponApi = {
  getAllCoupons: async () => {
    const url = `${UrlConstant.GET_ALL_COUPONS}`;
    return await axiosClient
      .get(url)
      .then((res) => res)
      .catch(err => {
        return null;
      });
  },
  getCouponById: async (id) => {
    const url = `${UrlConstant.GET_COUPON_BY_ID}/${id}`;
    //console.log('call api get category')
    return await axiosClient
      .get(url)
      .then((res) => res)
      .catch(err => {
        return null;
      });
  },
  checkUsedCoupon: async (userID, couponID) => {
    const url = `${UrlConstant.CHECK_USED_COUPON(userID, couponID)}`;
    //console.log('call api get category')
    return await axiosClient
      .get(url)
      .then((res) => res)
      .catch(err => {
        return null;
      });
  }
};
export default CouponApi;
