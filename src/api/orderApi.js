import * as UrlConstant from "utilities/UrlConstant";
import axiosClientAuthen from "./axiosClientAuthen";
import axiosClient from "./axiosClient";


const OrderApi = {
  getAllCompletedOrders: async (id) => {
    const url = `${UrlConstant.GET_ALL_COMPLETED_ORDER}/${id}`;
    return axiosClient.get(url);
  },
  getDetailedOrder: async (id) => {
    const url = `${UrlConstant.GET_DETAILED_ORDER}/${id}`;
    return axiosClientAuthen.get(url);
  },
  placeOrder: async (params) => {
    const url = `${UrlConstant.PLACE_ORDER}`;
    const body = JSON.stringify(params);

    return axiosClient
      .post(url, body)
      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
};
export default OrderApi;
