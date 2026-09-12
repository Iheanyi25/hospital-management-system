import React, { useMemo, useState } from "react";
import {
	Jumbotron,
	PageTitle,
	PaginationElement,
	Spinner
} from "../../../ui_elements";
import { timeAgo } from "../../../utils/formatDate";
import { useApiGet } from "../../../api/apiCall";
import { getAllNotificationsUrl } from "../../../api/urls";
import EmptyState from "../../../assets/svgs/emptyState.svg";
import NoResultFound from "../../../assets/svgs/searchError.svg";
import useHandleNotification from "../../../custom-hooks/useHandleNotification";

const Notifications = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const { handNotificationAction, isLoading } = useHandleNotification();
	const {
		data: notifications,
		isLoading: isLoadingNotifications,
		isFetching,
		hasPerformedQuery
	} = useApiGet(getAllNotificationsUrl({ pageNumber }), {
		keepPreviousData: true,
		refetchOnWindowFocus: false
	});

	let sortedNotifications = useMemo(
		() => notifications?.data?.items,
		[notifications]
	);

	return (
		<>
			<PageTitle title="All Notifications" />
			<section className="my-5">
				<Jumbotron headerText="Notifications">
					<div
						className="gm-notification-contents-style"
						style={{
							filter:
								isLoadingNotifications ||
								isFetching ||
								isLoading
									? "blur(5px)"
									: "none"
						}}
					>
						<div className="gm-notification-items">
							{isLoadingNotifications ? (
								<div className="py-3">
									<Spinner />
								</div>
							) : sortedNotifications?.length > 0 ? (
								<ul>
									{sortedNotifications?.map((item, index) => (
										<li
											key={index}
											className={`py-4 ${
												sortedNotifications?.length -
													1 !==
												index
													? "border-bottom"
													: ""
											} px-3 ${
												item?.isRead
													? "gm-notification-read"
													: ""
											}`}
											role="button"
											onClick={() =>
												handNotificationAction(item)
											}
										>
											<div className="pr-4">
												<h4>
													{item?.notificationType}
												</h4>
												<p className="my-1">
													{item?.message}
												</p>
												<p>
													{timeAgo(item?.dateCreated)}
												</p>
											</div>
										</li>
									))}
								</ul>
							) : (
								<div className="w-100 border border-top-0 d-flex justify-content-center align-items-center flex-column p-5 search-message-style">
									<img
										src={
											hasPerformedQuery
												? NoResultFound
												: EmptyState
										}
										alt="No activities"
									/>
									{
										<h4 className="mt-2">
											{hasPerformedQuery
												? `No result found, check your selection and try
									again`
												: "Your request results will be displayed here"}
										</h4>
									}
								</div>
							)}
						</div>
					</div>
				</Jumbotron>
				<div className="d-flex justify-content-between align-items-center  mt-5">
					<div
						style={{
							filter: isLoadingNotifications
								? "blur(5px)"
								: "none"
						}}
					>
						<PaginationElement
							setPageNumber={setPageNumber}
							noOfPages={
								notifications?.data?.metaData?.totalPages
							}
							isServerSidePagination={true}
							pageNumber={pageNumber}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Notifications;
