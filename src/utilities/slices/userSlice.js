/**
 * create action & reducer for user
 * thunk for async function
 * data: {
 * isLoggedIn:false}
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "api/userApi";
import { cookiesService } from "helpers/cookiesService";

// thunk action to login and get token
export const login = createAsyncThunk("user/login", async (params) => {
  const token = await UserApi.login(params);
  return token;
});

export const register = createAsyncThunk("user/register", async (params) => {
  console.log("register" , params)
  const token = await UserApi.register(params);
  console.log("token" , token)
  return token;
});

export const forgotPassword = createAsyncThunk(
  "user/forgot-password",
  async (params) => {
    const token = await UserApi.forgotPassword(params);
    return token;
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (params) => {
    const token = await UserApi.resetPassword(params);
    return token;
  }
);

export const verifyEmail = createAsyncThunk(
  "user/reset-password",
  async (params) => {
    const token = await UserApi.verifyEmail(params);
    return token;
  }
);

export const initialStateUseLoggedIn = () => {
  let result = cookiesService.getCookies("user");
  return result === undefined || result === null ? false : true;
};

export const persist = () => {
  let result = JSON.parse(window.localStorage.getItem("persist-key"));
  return result === null ? 2 : result.roleID;
};

const user = createSlice({
  name: "user",
  initialState: {
    data: {
      roleID: persist(),
      isLoggedIn: initialStateUseLoggedIn(),
      isSuccess: null,
      userEmail: "",
      error: "",
    },
  },
  reducers: {
    updateLoggedInStatus: (state, action) => {
      state.data.isLoggedIn = action.payload.isLoggedIn;
    },
    updateError: (state, action) => {
      state.data.error = action.payload.error;
    },
    updateStatus: (state, action) => {
      state.data.isSuccess = action.payload.isSuccess;
    },
    updateEmail: (state, action) => {
      state.data.userEmail = action.payload.userEmail;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
    },
    [login.fulfilled]: (state, action) => {
      state.data.isLoggedIn = true;
      state.data.error = "";
      state.data.roleID = action.payload.roleID;
      window.localStorage.setItem(
        "persist-key",
        JSON.stringify(action.payload)
      );
    },
    [login.rejected]: (state, action) => {
      state.data.error = "Username or password is incorrect";
    },
    [register.fulfilled]: (state, action) => {
      state.data.isSuccess = true;
      state.data.error = "";
    },
    [register.rejected]: (state, action) => {
      state.data.isSuccess = false;
      state.data.error = "Your email address is already registered";
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.data.isSuccess = true;
      state.data.error = "";
    },
    [forgotPassword.rejected]: (state, action) => {
      state.data.isSuccess = false;
      state.data.error = "Your email is not valid";
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.data.isSuccess = true;
    },
    [resetPassword.rejected]: (state, action) => {
      state.data.isSuccess = false;
      state.data.error = "Your OTP is not valid";
    },
     [verifyEmail.fulfilled]: (state, action) => {
      state.data.isSuccess = true;
    },
    [verifyEmail.rejected]: (state, action) => {
      state.data.isSuccess = false;
      state.data.error = "Your OTP is not valid";
    },
  },
});
export default user.reducer;
export const {
  updateLoggedInStatus,
  updateError,
  updateErrorSendOTP,
  updateErrorResetPassword,
  updateStatus,
  updateEmail
} = user.actions;
