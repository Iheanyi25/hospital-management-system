import {
	Chart,
	ChartCards,
	DashboardCard,
	InfiniteProgressBar,
	PageTitle,
	SMSelect,
	Spinner
} from "../../../ui_elements";
import one from "../../../assets/svgs/cards_img/1.svg";
import two from "../../../assets/svgs/cards_img/2.svg";
import three from "../../../assets/svgs/cards_img/3.svg";
import four from "../../../assets/svgs/cards_img/4.svg";
import five from "../../../assets/svgs/cards_img/5.svg";
import six from "../../../assets/svgs/cards_img/6.svg";
import styles from "./styles.module.css";
import { useMemo, useState } from "react";
import { useApiGet } from "../../../api/apiCall";
import { getAllSessionsUrl, superAdminDashboardUrl } from "../../../api/urls";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import numberFormatter from "../../../utils/numberFormatter";
import { findValueAndLabel } from "../../../utils/findValueAndLabel";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";

export const sessionSchema = yup.object().shape({
	session: yup.mixed()
});

const Dashboard = () => {
	const [currentBarChartData, setCurrentBarChartData] = useState("students");
	const [doughnutState, setDoughnutState] = useState({
		value: "Count",
		label: "Count"
	});

	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const allSessions = useMemo(
		() => formatSelectItems(sessions?.data, "session", "id"),
		[sessions]
	);

	const {
		control,
		watch,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(sessionSchema)
	});

	const watchData = watch({
		session: "session"
	});

	const {
		data: adminData,
		isLoading: adminDataLoading,
		error: isError,
		isFetching
	} = useApiGet(superAdminDashboardUrl(watchData?.session?.value), {
		refetchOnWindowFocus: false,
		enabled: !!watchData?.session?.value || !!sessions,
		keepPreviousData: true
	});

	const handleDoughnutOnchange = (val) => {
		setDoughnutState(val);
	};

	const newStudentsArray = [
		...Object.keys(adminData?.data?.students || [])
			.filter((_, index) => index !== 2)
			.map((studentsData, i) => ({
				label: studentsData,
				value: Object.values(adminData?.data?.students || [])[i]
			}))
	];

	const newLecturersArray = [
		...Object.keys(adminData?.data?.lecturers || [])
			.filter((_, index) => index !== 2)
			.map((lecturersData, i) => ({
				label: lecturersData,
				value: Object.values(adminData?.data?.lecturers || [])[i]
			}))
	];

	const newApplicationData =
		adminData?.data?.applications.map((app) => ({
			label: app?.name,
			value: app?.total
		})) || [];

	const newfeePaymentData =
		adminData?.data?.feePaymentByLevels.map((fees) => ({
			label: fees?.group,
			value: fees?.numberOfStudents
		})) || [];

	const percentageFeesPaymentData =
		adminData?.data?.feePaymentByLevels.map((fees) => ({
			label: fees?.group,
			value:
				(fees?.numberOfStudents / adminData?.data?.students?.total) *
				100
		})) || [];

	const cards = [
		{
			img: one,
			title: "Active Students",
			value: numberFormatter(adminData?.data?.students?.total) || "-"
		},
		{
			img: two,
			title: "Colleges",
			value: numberFormatter(adminData?.data?.faculties) || "-"
		},
		{
			img: three,
			title: "Lecturers",
			value: numberFormatter(adminData?.data?.lecturers?.total) || "-"
		},
		{
			img: four,
			title: "Departments",
			value: numberFormatter(adminData?.data?.departments) || "-"
		},
		{
			img: five,
			title: "Admitted Students",
			value: numberFormatter(adminData?.data?.admittedStudents) || "-"
		},
		{
			img: six,
			title: "Courses",
			value: numberFormatter(adminData?.data?.courses) || "-"
		}
	];

	const levelsLegends = [
		{
			level: "100L",
			color: "#508DEC"
		},
		{
			level: "200L",
			color: "#3979D8"
		},
		{
			level: "300L",
			color: "#1451B0"
		},
		{
			level: "400L",
			color: "#66C6FD"
		},
		{
			level: "500L",
			color: "#65E7A8"
		},
		{
			level: "600L",
			color: "#609F8A"
		},
		{
			level: "Other Students",
			color: "#E5E8EC"
		}
	];

	const doughnutStates = [
		{ value: "Count", label: "Count" },
		{ value: "Percentage", label: "Percentage" }
	];

	if (isLoading || adminDataLoading) return <Spinner />;
	if (error || isError) return "An error has occurred: " + error?.response?.data?.message;
	return (
		<>
			<PageTitle
				title={`Hi, ${adminData?.data?.lastname} ${adminData?.data?.firstname}`}
				buttonGroup={
					<div className="d-flex gap-4 align-items-center">
						<p>Session</p>
						<div className={styles.session_dropdown}>
							{allSessions.length > 0 && (
								<Controller
									id="session"
									name="session"
									control={control}
									rules={{
										required: true
									}}
									defaultValue={findValueAndLabel(
										adminData?.data?.sessionId,
										allSessions
									)}
									render={({ field }) => (
										<SMSelect
											name="session"
											id="session"
											options={allSessions}
											searchable={true}
											isError={!!errors.session}
											{...field}
										/>
									)}
								/>
							)}
						</div>
					</div>
				}
			/>
			{isFetching && <InfiniteProgressBar width="inherit" />}
			<div className="row m-0">
				<div className="row col-lg-6 m-0">
					{cards.map((card, i) => (
						<div key={i} className="col-6 mt-4">
							<DashboardCard
								isFetching={isFetching}
								img={card.img}
								title={card.title}
								value={card.value}
							/>
						</div>
					))}
					<motion.div
						className="col-12 mt-4"
						style={{
							filter: isFetching ? "blur(5px)" : "none"
						}}
						animate={{
							transition: {
								type: "spring",
								stiffness: 100
							},
							initial: {
								visibility: "hidden",
								x: -25
							},
							animate: {
								visibility: "visible",
								x: 5
							}
						}}
					>
						<ChartCards>
							<div className={styles.custom_tabs}>
								<p
									className={
										currentBarChartData === "students" &&
										styles.custom_tabs_active
									}
									onClick={() =>
										setCurrentBarChartData("students")
									}
								>
									Students
								</p>
								<p
									className={
										currentBarChartData === "lecturers" &&
										styles.custom_tabs_active
									}
									onClick={() =>
										setCurrentBarChartData("lecturers")
									}
								>
									Lecturers
								</p>
							</div>
							<Chart
								chartData={
									currentBarChartData === "students"
										? newStudentsArray
										: newLecturersArray
								}
								backgrounds={["#0052CC", "#FD9797"]}
								stepSize={
									currentBarChartData === "students"
										? 1500
										: 1
								}
							/>
						</ChartCards>
					</motion.div>
				</div>
				<div className="col-lg-6">
					<motion.div
						className="mt-4"
						style={{
							filter: isFetching ? "blur(5px)" : "none"
						}}
						animate={{
							transition: {
								type: "spring",
								stiffness: 100
							},
							initial: {
								visibility: "hidden",
								x: -25
							},
							animate: {
								visibility: "visible",
								x: 5
							}
						}}
					>
						<ChartCards>
							<div className="d-flex justify-content-between flex-wrap">
								<p className={styles.title}>School Fees</p>
								<div className={styles.session_dropdown}>
									<SMSelect
										value={doughnutState}
										options={doughnutStates}
										onChange={handleDoughnutOnchange}
										searchable={false}
									/>
								</div>
							</div>
							<div className="d-flex flex-wrap">
								<div>
									<Chart
										type={"doughnut"}
										chartData={
											doughnutState?.value === "Count"
												? newfeePaymentData
												: percentageFeesPaymentData
										}
										backgrounds={[
											"#508DEC",
											"#3979D8",
											"#1451B0",
											"#66C6FD",
											"#65E7A8",
											"#609F8A",
											"#E5E8EC"
										]}
									/>
								</div>
								<div className={styles.legends_container}>
									{levelsLegends.map((levels, i) => (
										<div key={i} className={styles.legend}>
											<span
												style={{
													background: levels.color
												}}
												key={i}
											></span>
											<p>{levels.level}</p>
										</div>
									))}
								</div>
							</div>
						</ChartCards>
					</motion.div>
					<motion.div
						className="mt-4"
						style={{
							filter: isFetching ? "blur(5px)" : "none"
						}}
						animate={{
							transition: {
								type: "spring",
								stiffness: 100
							},
							initial: {
								visibility: "hidden",
								x: -25
							},
							animate: {
								visibility: "visible",
								x: 5
							}
						}}
					>
						<ChartCards>
							<p className={styles.title}>Applications</p>
							<Chart
								chartData={newApplicationData}
								backgrounds={"#0052CC"}
								stepSize={500}
							/>
						</ChartCards>
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
