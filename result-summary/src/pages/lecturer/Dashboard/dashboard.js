import {
	Button,
	HappyBirthday,
	Jumbotron,
	Spinner
} from "../../../ui_elements";
import bookIcon from "../../../assets/svgs/book.svg";
import chartIcon from "../../../assets/svgs/chart.svg";
import walletIcon from "../../../assets/svgs/walletPurple.svg";
import emptyState from "../../../assets/svgs/emptyDashboard.svg";
import styles from "./style.module.css";
import { useApiGet } from "../../../api/apiCall";
import { lecturerDashboardUrl } from "../../../api/urls";
import Avatar from "react-avatar";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import numberFormatter from "../../../utils/numberFormatter";
import { useState } from "react";
import { NoticesModal } from "./components/modal";
import { fullDate } from "../../../utils/formatDate";
import { Cancel } from "../../../assets/svgs";
import { BIRTHDAY_STATE_HOLDER } from "../../../utils/constants";
import DOMPurify from "dompurify";

const LecturerDashboard = () => {
	const [modal, setModal] = useState(false);
	const [currentNotice, setCurrentNotice] = useState({});
	const [showSmallAside, setShowSmallAside] = useState(false);
	const { push } = useHistory();
	const [cookies] = useCookies([BIRTHDAY_STATE_HOLDER]);
	const { [BIRTHDAY_STATE_HOLDER]: birthday } = cookies;

	// const { data: notices, isLoading: noticesLoading } = useApiGet(
	// 	getRecentNoticessUrl(4),
	// 	{
	// 		keepPreviousData: true
	// 	}
	// );
	const notices = [];
	const handleCurrentNotice = (data) => {
		setModal(true);
		setCurrentNotice(data);
	};

	const activities = [];

	const { data, isLoading, error } = useApiGet(lecturerDashboardUrl());
	if (isLoading) return <Spinner />;
	if (error)
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
						data?.data?.middleName ?? ""
					}`}</p>
					<p className={styles.level}>Lecturer</p>
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
						<p>DEPARTMENT</p>
						<p>{data?.data?.department ?? "N/A"}</p>
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
							name={`${data?.data?.lastname} ${data?.data?.firstname}`}
							size="100"
							src={data?.data?.passport}
							round={true}
							maxInitials={2}
						/>
						<p className={`${styles.name} mt-2 text-uppercase`}>{`${
							data?.data?.lastname
						} ${data?.data?.firstname} ${
							data?.data?.middleName ?? ""
						}`}</p>
						<p className={styles.level}>Lecturer</p>
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
							<p>DEPARTMENT</p>
							<p>{data?.data?.department ?? "N/A"}</p>
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
						<p>Courses Assigned</p>
						<p>{`${numberFormatter(
							data?.data?.courses
						)} courses`}</p>
					</div>
					<div className={styles.each__stat}>
						<img src={walletIcon} alt="wallet icon" />
						<p>No of students</p>
						<p>{`${numberFormatter(
							data?.data?.students
						)} students`}</p>
					</div>
					<div className={styles.each__stat}>
						<img src={chartIcon} alt="bar chart icon" />
						<p>Results Published</p>
						<p>{`${numberFormatter(
							data?.data?.resultsUploaded
						)} results`}</p>
					</div>
				</div>
				<section className="row">
					<div className="col-lg-6">
						<Jumbotron headerText="Recent Activities">
							<div className={styles.activity_container}>
								{activities.length > 0 ? (
									activities.map((activity, index) => (
										<div
											className={styles.activity}
											key={index}
										>
											<p>
												{activity.title}
												<span>{activity.time}</span>
											</p>
										</div>
									))
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
						<Jumbotron headerText="Announcement">
							<div className={styles.announcement_container}>
								{notices?.data?.length > 0 ? (
									notices?.data?.map(
										(announcement, index) => (
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
										)
									)
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

export default LecturerDashboard;
