import { useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { useApiGet, useApiPost } from "../api/apiCall";
import {
	getInvoiceWithInvoiceNumberUrl,
	readNotificationUrl
} from "../api/urls";
import { useEffect, useState } from "react";

export default function useHandleNotification() {
	const { push } = useHistory();
	const { mutate, isLoading } = useApiPost({ retry: false });
	const queryClient = useQueryClient();
	const [makeRequest, setMakeRequest] = useState(false);
	const [invoiceCode, setInvoiceCode] = useState("");
	const {
		data: invoiceData,
		isFetching: isInvoiceLoading,
		error: requestError
	} = useApiGet(getInvoiceWithInvoiceNumberUrl(invoiceCode), {
		enabled: makeRequest,
		refetchOnWindowFocus: false,
		retry: false
	});
	const onSubmit = (invoiceCode) => {
		setInvoiceCode(invoiceCode);
		setMakeRequest(true);
	};
	useEffect(() => {
		if (invoiceData?.success && makeRequest && !isInvoiceLoading) {
			push({
				pathname: "/academic_fees/school_fees/invoice",
				state: { details: invoiceData?.data, fromVerify: true }
			});
		}
		if (requestError && makeRequest && !isInvoiceLoading) {
			setMakeRequest(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					requestError?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [requestError, push, makeRequest, isInvoiceLoading, invoiceData]);
	const handNotificationAction = (item) => {
		if (!item.isRead) {
			const requestDet = {
				url: readNotificationUrl(item.notificationId)
			};
			mutate(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries({
						predicate: (query) =>
							query.queryKey.startsWith("Notification/")
					});
					handleRedirect(item);
				},
				onError: ({ response }) => {
					throw response;
				}
			});
		} else handleRedirect(item);
	};
	const handleRedirect = (item) => {
		switch (item.notificationCategory) {
			case "courseApproval":
				push({
					pathname: "/course_registration/view",
					state: item.notificationRequestProperties
				});
				break;
			case "schoolFeesInvoice":
				push("/academic_fees/school_fees");
				break;
			case "studentProfile":
				push("/profile");
				break;
			case "lecturerCourses":
				push({
					pathname: "/records/view",
					state: {
						session: {
							value: item?.notificationRequestProperties
								?.sessionId
						},
						semester: {
							value: item?.notificationRequestProperties
								?.semesterId
						}
					}
				});
				break;
			case "sddsd":
				onSubmit("dejkde");
				break;

			default:
				break;
		}
	};
	return { handNotificationAction, isLoading };
}
