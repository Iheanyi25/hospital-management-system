import React, { createContext } from "react";
import { useLocalObservable } from "mobx-react";
import { flow } from "mobx";
import { logInUrl } from "../api/URLs";
import { fetchConfig } from "../api/fetchConfig";
import { fetchWrapper } from "../api/fetcher";

//creating our store context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userStore = useLocalObservable(() => ({
    user: null,
    loading: null,
    error: null,
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
          localStorage.setItem(
            "authenticatedUser",
            JSON.stringify(res.data.authenticatedUser)
          );
        }
        userStore.user = res.data.authenticatedUser;
        userStore.loading = false;
        window.location.reload();
      } catch (error) {
          console.log(error,8888)
        userStore.error = error;
        userStore.loading = false;
      }
    }),
  }));
  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
};
