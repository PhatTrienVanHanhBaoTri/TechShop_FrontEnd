// PRODUCT
export const GET_PRODUCTS_BY_CATEGORY = "/api/v1/product";
export const GET_ALL_PRODUCTS = "/api/v1/product";
export const GET_TRENDING_PRODUCTS = "api/v1/product/trending";
export const GET_TOP_PURCHASED_PRODUCTS = "api/v1/product/toppurchased";
export const GET_DETAILED_PRODUCT = "/api/v1/product";
export const GET_RELATED_CATEGORY_PRODUCT = "/api/v1/product/related-category";
export const GET_RELATED_BRAND_PRODUCT = "/api/v1/product/related-brand";
export const GET_SPECS_PRODUCT = "/api/v1/product/specs";
export const GET_FULL_DESCRIP_PRODUCT = "/api/v1/product/longDescrip";

export const SEARCH_PRODUCTS = "/api/v1/product";

export const GET_PROPOSED_PRODUCTS = "/proposed_products";
export const GET_PRODUCTS_IN_CART = "/products";

// CATEGORY
export const GET_ALL_CATEGORIES = "/api/v1/category";

// BRANDS
export const GET_ALL_BRANDS = "/api/v1/brand";

// REVIEW
export const GET_ALL_REVIEWS_BY_PRODUCTID = "/api/v1/review";
export const ADD_REVIEW = "/api/v1/review";

// COUPON
export const GET_ALL_COUPONS = "api/v1/coupons";

export const GET_COUPON_BY_ID = "api/v1/coupons";

export const CHECK_USED_COUPON = (userID, couponID) =>
  `api/v1/invoice/${couponID}/user/${userID}`;

export const ADD_COUPON = "/api/v1/coupons";

export const UPDATE_COUPON = "/api/v1/coupons";

export const DELETE_COUPON = "/api/v1/coupons";

// USER
export const LOGIN = "api/v1/auth/login";
export const REGISTER = "api/v1/auth/register";
export const FORGOT_PASSWORD = "api/v1/auth/forgotPassword";
export const RESET_PASSWORD = "api/v1/auth/resetPassword";
export const VERIFY_EMAIL = "/api/v1/auth/validateOTPConfirmEmail";


export const GET_USER_SHIPPING_INFO = "/api/v1/user/shippingInfo";
export const PLACE_ORDER = "/api/v1/invoice";

// ORDER
export const GET_ALL_COMPLETED_ORDER = "/api/v1/invoice/user";
export const GET_DETAILED_ORDER = "/api/v1/invoice";

// TOKEN
export const REFRESH_TOKEN = "/refresh";

export const GET_USER_BY_EMAIL = "/api/v1/user";
export const UPDATE_PRODUCT = "/api/v1/product";
export const ADD_PRODUCT = "/api/v1/product";
export const DELETE_PRODUCT = "/api/v1/product";
