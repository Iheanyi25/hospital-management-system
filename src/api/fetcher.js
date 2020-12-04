import axios from "axios";
import useSWR from 'swr';

export const fetchWrapper = (requestObject) => axios(requestObject)
export const useRequest = (request, config) => {

  const { data: response, error, isValidating, revalidate, mutate } = useSWR(
    JSON.stringify(request),
    () => axios(request),
    config
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
    mutate
  };
}