import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { baseURL } from "./urls";
import useAuthAction from "../custom-hooks/useAuthAction";

export function setAuthHeader(token = null) {
	if (token) {
		// setting the authorization header in a case where the auth JWT token was provided
		axiosInstance.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
	} else {
		// deleting the authorization header that has already been set in a case where auth JWT token was not provided
		delete axiosInstance.defaults.headers.common["Authorization"];
	}
}

export const axiosInstance = axios.create({
	baseURL: baseURL
});

const formatError = (error) => {
	let err = error;
	if (!error?.response?.data?.message)
		err = { response: { data: { message: error.message } } };
	throw err;
};

export const getSearchRequest = async (request) => {
	try {
		return (await axiosInstance.get(request.queryKey, request.data)).data;
	} catch (error) {
		formatError(error);
	}
};

export const getRequest = async (request) => {
	try {
		return (await axiosInstance.get(request.queryKey[0], request.data))
			.data;
	} catch (error) {
		formatError(error);
	}
};

const postRequest = (request) => axiosInstance.post(request.url, request.data);

const editRequest = (request) => axiosInstance.put(request.url, request.data);

const patchRequest = (request) =>
	axiosInstance.patch(request.url, request.data);

const putRequest = (request) => axiosInstance.put(request.url, request.data);

const getFileRequest = async (request) =>
	await axiosInstance.get(request.queryKey[0], {
		responseType: "arraybuffer",
		headers: { "Content-Type": "blob" }
	});

const deleteRequest = (request) =>
	axiosInstance.delete(request.url, {
		data: request.data
	});

export const useReturnQueryOptions = (queryOptions) => {
	const { push } = useHistory();
	const { logout } = useAuthAction();
	return {
		onError: (error) => {
			if (
				error?.response?.status === 403 ||
				error?.response?.data?.message ===
					"Request failed with status code 403"
			)
				push({ pathname: "/no_access", state: { fromError: true } });
			if (
				error?.response?.status === 401 ||
				error?.response?.data?.message ===
					"Request failed with status code 401"
			) {
				logout();
			}

			if (
				error?.response?.status === 502 ||
				error?.response?.status === 503
			) {
				push({
					pathname: "/downtime",
					state: { fromError: true }
				});
			}
		},
		retry: (_, error) =>
			!(error?.response?.status === 400 || 403 || 401 || 500),
		...queryOptions
	};
};

/**
 * This is api hook for different http operations
 * Takes the following values
 * @param  data: {url, body}
 * @returns Object
 */
export const useApiGet = (key, queryOptions) =>
	useQuery(key, getRequest, useReturnQueryOptions(queryOptions));

export const useApiPost = (options) =>
	useMutation(postRequest, useReturnQueryOptions(options));

export const useApiEdit = (options) =>
	useMutation(editRequest, useReturnQueryOptions(options));

export const useApiPatch = (options) =>
	useMutation(patchRequest, useReturnQueryOptions(options));

export const useApiPut = (options) =>
	useMutation(putRequest, useReturnQueryOptions(options));

export const useApiBlob = (key, queryOptions = {}) =>
	useQuery(key, getFileRequest, useReturnQueryOptions(queryOptions));

export const useApiDelete = (data) =>
	useMutation(deleteRequest, useReturnQueryOptions(data));
