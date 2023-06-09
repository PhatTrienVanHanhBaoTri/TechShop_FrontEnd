import { cookiesService } from "helpers/cookiesService";
import * as UrlConstant from "utilities/UrlConstant";
import axiosClient from "./axiosClient";
import axiosClientAuthen from "./axiosClientAuthen";
/**
 *
 * TODO: modify url of GET_USER_SHIPPING_INFO: dont have to sent userID (/1)
 */
const UserApi = {
  login: async (params) => {
    let { email, pswd } = params;
    const url = `${UrlConstant.LOGIN}`;
    const data = JSON.stringify({ email, pswd });

    return axiosClient
      .post(url, data)
      .then((response) => {
        cookiesService.setCookies("user", JSON.stringify(response), 98);
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getUserDetail: async (email) => {
    const url = `${UrlConstant.GET_USER_BY_EMAIL}/${email}`;
    return axiosClient.get(url);
  },
    register: async (params) => {
    let { email, fullname, pswd, DOB, phone, address, gender } = params;
    const url = `${UrlConstant.REGISTER}`;
    const data = JSON.stringify({ email, fullname, pswd, DOB, phone, address, gender });

    return axiosClient
      .post(url, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

    forgotPassword: async (params) => {
    const url = `${UrlConstant.FORGOT_PASSWORD} + ${params}`;
    return axiosClient
      .post(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

      resetPassword: async (params) => {
    let { newPassword, OTP, userEmail } = params;
    const url = `${UrlConstant.RESET_PASSWORD}`;
    const data = JSON.stringify({ newPassword, OTP, userEmail });

    return axiosClient
      .post(url, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },


  getShippingInfo: async () => {
    const url = `${UrlConstant.GET_USER_SHIPPING_INFO}`;
    return axiosClient
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        //console.log(error.response);
        return Promise.reject(error);
      });
  },
  
};
export default UserApi;
