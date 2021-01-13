import React, { createContext } from "react";
import { useLocalObservable } from "mobx-react";
import { flow } from "mobx";
import { logInUrl } from "../api/URLs";
import { fetchConfig } from "../api/fetchConfig";
import { fetchWrapper } from "../api/fetcher";
import { axiosInstance } from "../api/axiosInstance";
import { logOut } from "../utils/logout";

//creating our store context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userStore = useLocalObservable(() => ({
    user: null,
    // userToken: null,
    loading: null,
    isLoadingUser: true,
    error: null,
    userToken: null,
    logIn: flow(function* logIn(data) {
      console.log(data, "log in data");
      userStore.loading = true;
      const url = logInUrl();
      const logInConfig = fetchConfig({
        url: url,
        method: "post",
        data: data,
      });
      try {
        const res = yield fetchWrapper(logInConfig);
        console.log(res, "response");
        if (res.status) {
          console.log(res.data.token,66666)
          localStorage.setItem("authenticatedUser",JSON.stringify(res.data.authenticatedUser));
          localStorage.setItem( "userToken", JSON.stringify(res.data.token));
        }
        userStore.user = res.data.authenticatedUser;
        userStore.userToken = res.data.token;
        userStore.loading = false;
        window.location.href  = "/";
      } catch (error) {
        console.log(error, 8888);
        userStore.error = error;
        userStore.loading = false;
      }
    }),
    loadUser: flow(function* loadUser(){
      userStore.user = JSON.parse(localStorage.getItem("authenticatedUser"));
      userStore.token = JSON.parse(localStorage.getItem("userToken"));
      userStore.isLoadingUser = false;

      axiosInstance.interceptors.request.use(
        async config => {
          config.headers = { 
            'Authorization': `Bearer ${userStore.token}`,
            'Accept': 'application/json',
            "Content-Type": "application/json-patch+json"
          }
          return config;
        },
        error => {
          Promise.reject(error)
      });
      
      axiosInstance.interceptors.response.use((response) => {
        return response
      }, async function (error) {
        if (error?.status === 403) {
          logOut()
        }
        return Promise.reject(error);
      });
    }),
  }));
  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
};
