import * as UrlConstant from "utilities/UrlConstant";
import axiosClientAuthen from "./axiosClientAuthen";
const ProductApi = {
  getAllProducts: async () => {
    //let { order } = params;
    const url = `${UrlConstant.GET_ALL_PRODUCTS}`;
    return axiosClientAuthen.get(url);
  },
  getProductsByCategory: async (params) => {
    let { category } = params;
    const url = `${UrlConstant.GET_PRODUCTS_BY_CATEGORY}/category/${category}`;
    return axiosClientAuthen.get(url);
  },
  getTrendingProducts: async () => {
    const url = `${UrlConstant.GET_TRENDING_PRODUCTS}`;
    //console.log("call api get trending product");
    return axiosClientAuthen.get(url);
  },
  getTopPurchasedProducts: async (filterTopProduct) => {
    const url = `${UrlConstant.GET_TOP_PURCHASED_PRODUCTS}/${filterTopProduct}`;
    //console.log("call api get top purchased product");
    return axiosClientAuthen.get(url);
  },

  getDetailedProduct: async (id) => {
    const url = `${UrlConstant.GET_DETAILED_PRODUCT}/${id}`;
    return axiosClientAuthen.get(url);
  },
  getRelatedCategoryPro: async (id) => {
    const url = `${UrlConstant.GET_RELATED_CATEGORY_PRODUCT}/${id}`;
    return axiosClientAuthen.get(url);
  },
  getRelatedBrandPro: async (id) => {
    const url = `${UrlConstant.GET_RELATED_BRAND_PRODUCT}/${id}`;
    return axiosClientAuthen.get(url);
  },

  getSpecsPro: async (id) => {
    const url = `${UrlConstant.GET_SPECS_PRODUCT}/${id}`;
    return axiosClientAuthen.get(url);
  },
  getFullDescriptionPro: async (id) => {
    const url = `${UrlConstant.GET_FULL_DESCRIP_PRODUCT}/${id}`;
    return axiosClientAuthen.get(url);
  },
  searchProducts: async (info) => {
    const url = `${UrlConstant.SEARCH_PRODUCTS}?q=${info}`;
    return axiosClientAuthen.get(url);
  },
  searchProductsIncludeFilter: async (params) => {
    let { keyword, order } = params;
    const url = `${UrlConstant.SEARCH_PRODUCTS}?q=${keyword}&sortOrder=${order}`;
    return axiosClientAuthen.get(url);
  },
  getProposedProducts: async () => {
    const url = `${UrlConstant.GET_PROPOSED_PRODUCTS}`;
    return axiosClientAuthen.get(url);
  },
  addProduct: async (data) => {
    const url = `${UrlConstant.ADD_PRODUCT}`;
    const body = JSON.stringify(data);
    return axiosClientAuthen
      .post(url, body)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
  updateProduct: async (data, id) => {
    const url = `${UrlConstant.UPDATE_PRODUCT}/${id}`;

    return axiosClientAuthen
      .put(url, data)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
  deleteProduct: async (id) => {
    const url = `${UrlConstant.DELETE_PRODUCT}/${id}`;

    return axiosClientAuthen
      .delete(url)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
};
export default ProductApi;
