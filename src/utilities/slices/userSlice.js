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
  const token = await UserApi.register(params);
  return token;
});

export const forgotPassword = createAsyncThunk("user/forgot-password", async (params) => {
  const token = await UserApi.forgotPassword(params);
  return token;
});

export const resetPassword = createAsyncThunk("user/reset-password", async (params) => {
  const token = await UserApi.resetPassword(params);
  return token;
});
export const initialStateUseLoggedIn = () => {
  let result = cookiesService.getCookies("user");
  return result === undefined || result === null ? false : true;
};

const user = createSlice({
  name: "user",
  initialState: {
    data: { 
      isLoggedIn: initialStateUseLoggedIn(),
      isSuccess: null,
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
   
  },
  extraReducers: {
    [login.pending]: (state) => {
      //console.log("pending get token");
    },
    [login.fulfilled]: (state, action) => {
      state.data.isLoggedIn = true;
      state.data.error = "";
    },
    [login.rejected]: (state, action) => {
      state.data.error = "Username or password is incorrect";
    },
    [register.fulfilled]: (state, action) => {
      state.data.isSuccess = true;
    },
    [register.rejected]: (state, action) => {
      state.data.isSuccess = false;
      state.data.error = "Your email address is already registered";
    },
    [forgotPassword.fulfilled]: (state, action) => {
       state.data.isSuccess = true;
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
      state.data.isSuccessResetPassword = "Your OTP is not valid";
    }
  },
  serializableCheck: false,
});
export default user.reducer;
export const { updateLoggedInStatus, updateError,updateErrorSendOTP, updateErrorResetPassword } = user.actions;
