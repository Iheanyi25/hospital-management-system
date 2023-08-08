import {
	Button,
	Spinner,
	Jumbotron,
	HappyBirthday
} from "../../../ui_elements";
import bookIcon from "../../../assets/svgs/book.svg";
import chartIcon from "../../../assets/svgs/chart.svg";
import walletIcon from "../../../assets/svgs/wallet.svg";
import emptyState from "../../../assets/svgs/emptyDashboard.svg";
import styles from "./style.module.css";
import { useApiGet } from "../../../api/apiCall";
import { studentDashboardUrl } from "../../../api/urls";
import numberFormatter from "../../../utils/numberFormatter";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import Avatar from "react-avatar";
import { useState } from "react";
import { fullDate } from "../../../utils/formatDate";
import { NoticesModal } from "./components/modal";
import { Cancel } from "../../../assets/svgs";
import { BIRTHDAY_STATE_HOLDER } from "../../../utils/constants";
import DOMPurify from "dompurify";
// import { HubConnectionBuilder } from "@microsoft/signalr";
import { getRecentNotificationsUrl } from "../../../api/urlCategories/Notification";

const Dashboard = () => {
	const [modal, setModal] = useState(false);
	const [currentNotice, setCurrentNotice] = useState({});
	const [showSmallAside, setShowSmallAside] = useState(false);
	const { push } = useHistory();
	const [cookies] = useCookies([BIRTHDAY_STATE_HOLDER]);
	// const [connection, setConnection] = useState(null);
	// const [chat, setChat] = useState([]);
	// const latestChat = useRef(null);

	const { [BIRTHDAY_STATE_HOLDER]: birthday } = cookies;

	// const { data: notices, isLoading: noticesLoading } = useApiGet(
	// 	getRecentNoticessUrl(1),
	// 	{
	// 		keepPreviousData: true
	// 	}
	// );

	const handleCurrentNotice = (data) => {
		setModal(true);
		setCurrentNotice(data);
	};
	function timeAgo(receivedDate) {
		const currentTime = new Date();
		const newRecieved = new Date(receivedDate);
		const timeDifference = currentTime.getTime() -newRecieved.getTime();
// console.log(timeDifference);
		let seconds = Math.floor(timeDifference / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);
		let weeks = Math.floor(days / 7);

		if (weeks > 0) {
			return weeks + " week(s) ago";
		} else if (days > 0) {
			return days + " day(s) ago";
		} else if (hours > 0) {
			return hours + " hour(s) ago";
		} else if (minutes > 0) {
			return minutes + " minute(s) ago";
		} else {
			return seconds + " second(s) ago";
		}
	}

	const notices = [];
	const { data, isLoading, error } = useApiGet(studentDashboardUrl());
	const {
		data: notifications,
		isLoading: isLoadingNotifications,
		error: notificationError
	} = useApiGet(getRecentNotificationsUrl());
	// useEffect(() => {
	// 	const newConnection = new HubConnectionBuilder()
	// 		.withUrl(signalRUrl())
	// 		.withAutomaticReconnect()
	// 		.build();
	// 		setConnection(newConnection)
	// 	// console.log(newConnection);
	// 	// newConnection
	// 	// 	.start()
	// 	// 	.then((result) => {
	// 	// 		console.log("Connected!", result);

	// 	// 		connection.on("RecieveNotification", (message) => {
	// 	// 			alert("A message came in");
	// 	// 			console.log("yyyy", message);
	// 	// 			const updatedChat = [...latestChat.current];
	// 	// 			updatedChat.push(message);

	// 	// 			setChat(updatedChat);
	// 	// 		});
	// 	// 	})
	// 	// 	.catch((e) => console.log("Connection failed: ", e))
	// 	// 	.finally((e) => console.log(e));
	// }, []);
	// const getMessage = () => {};
	// useEffect(() => {
	// 	if (connection) {
	// 		console.log("I got here");
	// 		connection
	// 			.start()
	// 			.then((result) => {
	// 				console.log("Connected!", result);

	// 				connection.on("RecieveNotification", (message) => {
	// 					alert("I got here")
	// 					console.log("yyyy", message);
	// 					const updatedChat = [...latestChat.current];
	// 					updatedChat.push(message);

	// 					setChat(updatedChat);
	// 				});
	// 			})
	// 			.catch((e) => console.log("Connection failed: ", e))
	// 			.finally((e) => console.log(e));
	// 	}
	// }, [connection]);
	if (isLoading || isLoadingNotifications) return <Spinner />;
	if (error || notificationError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<main className={styles.dashboard}>
			<NoticesModal
				data={currentNotice}
				isOpen={modal}
				closeModal={() => setModal(false)}
			/>
			{birthday === "true" ? <HappyBirthday /> : null}
			<div className={styles.dummy__aside}></div>
			{/* Big Aside */}
			<aside className={styles.bigAside}>
				<div className={styles.bio}>
					<Avatar
						className={styles.avatar}
						name={`${data?.data?.lastname} ${data?.data?.firstname}`}
						size="100"
						src={data?.data?.passport}
						round={true}
						maxInitials={2}
					/>
					<p className={`${styles.name} mt-2 text-uppercase`}>{`${
						data?.data?.lastname
					} ${data?.data?.firstname} ${
						data?.data?.middlename ?? ""
					}`}</p>
					<p className={styles.level}>{data?.data?.level ?? "N/A"}</p>
					<Button
						data-cy="update"
						buttonClass="standard"
						label="Update Profile"
						type="button"
						onClick={() => push("profile")}
					/>
				</div>
				<div className={styles.student__details}>
					<div className={styles.detail}>
						<p>MOBILE PHONE</p>
						<p>{data?.data?.mobileNumber ?? "N/A"}</p>
					</div>
					<div className={styles.detail}>
						<p>EMAIL ADDRESS</p>
						<p className="text-lowercase">
							{data?.data?.email ?? "N/A"}
						</p>
					</div>
					<div className={styles.detail}>
						<p>PERMANENT ADDRESS</p>
						<p>{data?.data?.permanentAddress ?? "N/A"}</p>
					</div>
					<div className={styles.detail}>
						<p>MATRIC NO</p>
						<p>{data?.data?.matricNumber ?? "N/A"}</p>
					</div>
					<div className={styles.detail}>
						<p>DEPARTMENT</p>
						<p>{data?.data?.department ?? "N/A"}</p>
					</div>
					<div className={styles.detail}>
						<p>STUDENT TYPE</p>
						<p>{data?.data?.studentType ?? "N/A"}</p>
					</div>
				</div>
			</aside>
			{/* Small Aside */}
			{showSmallAside ? (
				<aside className={styles.smallAside}>
					<button
						onClick={() => setShowSmallAside(false)}
						className={styles.cancel}
					>
						<Cancel />
					</button>
					<div className={styles.bio}>
						<Avatar
							className={styles.avatar}
							name={`${data?.data?.surname} ${data?.data?.firstname}`}
							size="100"
							src={data?.data?.passport}
							round={true}
							maxInitials={2}
						/>
						<p className={`${styles.name} mt-2 text-uppercase`}>{`${
							data?.data?.surname
						} ${data?.data?.firstname} ${
							data?.data?.middlename ?? ""
						}`}</p>
						<p className={styles.level}>
							{data?.data?.level ?? "N/A"}
						</p>
						<Button
							data-cy="update"
							buttonClass="standard"
							label="Update Profile"
							type="button"
							onClick={() => push("profile")}
						/>
					</div>
					<div className={styles.student__details}>
						<div className={styles.detail}>
							<p>MOBILE PHONE</p>
							<p>{data?.data?.mobileNo ?? "N/A"}</p>
						</div>
						<div className={styles.detail}>
							<p>EMAIL ADDRESS</p>
							<p className="text-lowercase">
								{data?.data?.email ?? "N/A"}
							</p>
						</div>
						<div className={styles.detail}>
							<p>PERMANENT ADDRESS</p>
							<p>{data?.data?.permanentAddress ?? "N/A"}</p>
						</div>
						<div className={styles.detail}>
							<p>MATRIC NO</p>
							<p>{data?.data?.matricNo ?? "N/A"}</p>
						</div>
						<div className={styles.detail}>
							<p>DEPARTMENT</p>
							<p>{data?.data?.department ?? "N/A"}</p>
						</div>
						<div className={styles.detail}>
							<p>STUDENT TYPE</p>
							<p>{data?.data?.studentType ?? "N/A"}</p>
						</div>
					</div>
				</aside>
			) : (
				""
			)}
			<section className={styles.right__side}>
				<Button
					label="Show Personal Details"
					buttonClass="mb-5"
					customClass={styles.personalDetailsButton}
					onClick={() => setShowSmallAside(true)}
				/>
				<div className={styles.stats}>
					<div className={styles.each__stat}>
						<img src={bookIcon} alt="book icon" />
						<p>Courses Registered</p>
						<p>{`${numberFormatter(
							data?.data?.numberOfCoursesRegistered
						)} courses`}</p>
					</div>
					<div className={styles.each__stat}>
						<img src={chartIcon} alt="bar chart icon" />
						<p>Results Published</p>
						<p>{`${numberFormatter(
							data?.data?.resultsPublished
						)} results`}</p>
					</div>
					<div className={styles.each__stat}>
						<img src={walletIcon} alt="wallet icon" />
						<p>Fees paid</p>
						<p>{`${numberFormatter(data?.data?.feesPaid)} NGN`}</p>
					</div>
				</div>
				<section className="row">
					<div className="col-lg-6">
						<Jumbotron headerText="Recent Activities">
							<div className={styles.activity_container}>
								{notifications?.data?.length > 0 ? (
									notifications?.data?.map(
										(activity, index) => {
											console.log(timeAgo(activity?.dateCreated));
											return (
												<div
													className={styles.activity}
													key={index}
												>
													<p>
														{activity.heading}
														<span>
															{
																timeAgo(activity?.dateCreated)
															}
														</span>
													</p>
													<small>{activity?.message}</small>
												</div>
											);
										}
									)
								) : (
									<div className="d-flex justify-content-center my-5">
										<img
											src={emptyState}
											alt="No activities"
										/>
									</div>
								)}
							</div>
						</Jumbotron>
					</div>

					<div className="col-lg-6">
						<Jumbotron headerText="Announcements">
							<div className={styles.announcement_container}>
								{notices?.data?.length > 0 ? (
									notices?.data?.map((announcement) => (
										<div
											className={styles.announcement}
											key={announcement.id}
										>
											<h4>{announcement?.title}</h4>
											<p>
												{fullDate(
													announcement?.startDate
												)}
											</p>
											<div
												dangerouslySetInnerHTML={{
													__html: DOMPurify.sanitize(
														announcement?.description.slice(
															0,
															70
														)
													)
												}}
											/>

											<span
												onClick={() =>
													handleCurrentNotice(
														announcement
													)
												}
											>
												{" "}
												...Read more
											</span>
										</div>
									))
								) : (
									<div className="d-flex justify-content-center my-5">
										<img
											src={emptyState}
											alt="No annoucements"
										/>
									</div>
								)}
							</div>
						</Jumbotron>
					</div>
				</section>
			</section>
		</main>
	);
};

export default Dashboard;
