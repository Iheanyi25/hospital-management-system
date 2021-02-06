import useSWR from "swr";
import { axiosInstance } from "./axiosInstance";

export const fetchWrapper = (requestObject) => axiosInstance(requestObject);
export const useRequest = (request, config) => {
  const { data: response, error, isValidating, revalidate, mutate } = useSWR(
    JSON.stringify(request),
    () => axiosInstance(request),
    config
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
    mutate,
  };
};
