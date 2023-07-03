import * as UrlConstant from "utilities/UrlConstant";
import axiosClient from "./axiosClient";
import axiosClientAuthen from "./axiosClientAuthen";
const CouponApi = {
  getAllCoupons: async () => {
    const url = `${UrlConstant.GET_ALL_COUPONS}`;
    return await axiosClientAuthen
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
  },
  addCoupon: async (data) => {
    const url = `${UrlConstant.ADD_COUPON}`;
    const body = JSON.stringify(data);
    return axiosClientAuthen
      .post(url, body)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
  updateCoupon: async (data, id) => {
    const url = `${UrlConstant.UPDATE_COUPON}/${id}`;

    return axiosClientAuthen
      .put(url, data)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
  deleteCoupon: async (id) => {
    const url = `${UrlConstant.DELETE_COUPON}/${id}`;

    return axiosClientAuthen
      .delete(url)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
};
export default CouponApi;
