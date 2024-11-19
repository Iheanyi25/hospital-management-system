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
import { getRecentNoticessUrl } from "../../../api/urls";
import DOMPurify from "dompurify";

const Dashboard = () => {
	const [modal, setModal] = useState(false);
	const [currentNotice, setCurrentNotice] = useState({});
	const [showSmallAside, setShowSmallAside] = useState(false);
	const { push } = useHistory();
	const [cookies] = useCookies([BIRTHDAY_STATE_HOLDER]);

	const { [BIRTHDAY_STATE_HOLDER]: birthday } = cookies;

	const { data: notices, isLoading: noticesIsLoading } = useApiGet(
		getRecentNoticessUrl(1),
		{
			keepPreviousData: true
		}
	);

	const handleCurrentNotice = (data) => {
		setModal(true);
		setCurrentNotice(data);
	};

	const { data, isLoading, error } = useApiGet(studentDashboardUrl());
	if (isLoading || noticesIsLoading) return <Spinner />;
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
					<div className="col-lg-12">
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
