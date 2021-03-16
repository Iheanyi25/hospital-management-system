import React, { createContext } from "react";
import { useLocalObservable } from "mobx-react";
import { flow } from "mobx";
import { logInUrl } from "../api/URLs";
import { fetchConfig } from "../api/fetchConfig";
import { fetchWrapper } from "../api/fetcher";
import { axiosInstance } from "../api/axiosInstance";
import { logOut } from "../utils/logout";
import { toggleGlobalLoaderClass } from "../utils/toggleGlobalLoaderClass";
import { notification, removeNotification } from "../utils/notification";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userStore = useLocalObservable(() => ({
    user: null,
    loading: null,
    isLoadingUser: true,
    error: null,
    userToken: null,
    logIn: flow(function* logIn(data) {
      userStore.loading = true;
      const url = logInUrl();
      const logInConfig = fetchConfig({
        url: url,
        method: "post",
        data: data,
      });
      try {
        const res = yield fetchWrapper(logInConfig);
        if (res.status) {
          console.log(res.data.token, 66666);
          localStorage.setItem(
            "authenticatedUser",
            JSON.stringify(res.data.authenticatedUser)
          );
          localStorage.setItem("userToken", JSON.stringify(res.data.token));
        }
        userStore.user = res.data.authenticatedUser;
        userStore.userToken = res.data.token;
        userStore.loading = false;
        window.location.href = "/";
      } catch (error) {
        userStore.error = error;
        userStore.loading = false;
      }
    }),
    loadUser: flow(function* loadUser() {
      userStore.user = JSON.parse(localStorage.getItem("authenticatedUser"));
      userStore.token = JSON.parse(localStorage.getItem("userToken"));
      userStore.isLoadingUser = false;
      axiosInstance.interceptors.request.use(
        yield (config) => {
          if (userStore.user) toggleGlobalLoaderClass("add");
          config.headers = {
            Authorization: `Bearer ${userStore.token}`,
            Accept: "application/json",
            "Content-Type": "application/json-patch+json",
          };
          return config;
        },
        (error) => {
          if (userStore.user) toggleGlobalLoaderClass("remove");
          console.log(error);
        }
      );
      let prevNotificationId;
      axiosInstance.interceptors.response.use(
        (response) => {
          if (userStore.user) toggleGlobalLoaderClass("remove");

          return response;
        },
        yield function (error) {
          if (error?.status === 403) {
            logOut();
          }
          console.log(error.message,666666666)
          if (error.message === "Network Error") {
            if(prevNotificationId) removeNotification(prevNotificationId)
            prevNotificationId = notification.warining({ message: "Network Error, try again", duration: 5000 })
          }
          if (userStore.user) toggleGlobalLoaderClass("remove");
          throw error
        }
      );
    }),
  }));
  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
};
