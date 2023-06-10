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

export const initialStateUseLoggedIn = () => {
  let result = cookiesService.getCookies("user");
  return result === undefined || result === null ? false : true;
};

export const persist = () => {
  let result = JSON.parse(window.localStorage.getItem("persist-key"));
  return result === null ? {} : result;
};

const user = createSlice({
  name: "user",
  initialState: {
    data: { isLoggedIn: initialStateUseLoggedIn(), error: "", info: persist() },
  },
  reducers: {
    updateLoggedInStatus: (state, action) => {
      state.data.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      //console.log("pending get token");
    },
    [login.fulfilled]: (state, action) => {
      state.data.isLoggedIn = true;
      state.data.error = "";
      state.data.info = action.payload;
      window.localStorage.setItem(
        "persist-key",
        JSON.stringify(action.payload)
      );
    },
    [login.rejected]: (state) => {
      console.log("login failed");
      state.data.error = "Username or password is incorrect";
    },
  },
});
export default user.reducer;
export const { updateLoggedInStatus } = user.actions;
