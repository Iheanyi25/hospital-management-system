import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApiGet } from "../../../api/apiCall";
import {
	getAllApplicationTypesUnpaginatedUrl,
	getRecentNoticessUrl
} from "../../../api/urls";
import { GlobalMenu, MessageBox, PageLoader } from "../../../ui_elements";
import { LandingModal } from "./containers";
import DOMPurify from "dompurify";

import styles from "./styles.module.css";

const Home = () => {
	const [message, setMessage] = useState(true);
	const [currentApplication, setCurrentApplication] = useState("");
	const [modal, setModal] = useState(false);
	const handleCurrentLink = (linkObject) => {
		if (linkObject?.applicationMode === "1") {
			return {
				pathname: `/generate_jamb_students_invoice`,
				state: { application: linkObject }
			};
		} else if (linkObject?.applicationMode === "2") {
			return {
				pathname: `/generate_sub_degree_invoice`,
				state: { application: linkObject }
			};
		} else if (linkObject?.applicationMode === "3") {
			return {
				pathname: `/generate_other_students_invoice`,
				state: { application: linkObject }
			};
		} else if (linkObject?.applicationMode === "4") {
			return {
				pathname: `/generate_cse_invoice`,
				state: { application: linkObject }
			};
		} else {
			console.log("Not a valid application mode");
		}
	};

	const applicationForms = {
		postUme: {
			applicationMode: "1",
			id: "9",
			name: "POST UTME APPLICATION "
		},
		jupeb: { applicationMode: "2", id: "5", name: "JUPEB APPLICATION" },
		cse: { applicationMode: "4", id: "9", name: "CSE APPLICATION" },
		part_time: {
			applicationMode: "2",
			id: "6",
			name: "PART-TIME SALE OF FORMS"
		},
		postgraduate: {
			applicationMode: "3",
			id: "12",
			name: "POSTGRADUATE APPLICATION"
		},
		direct_entry: {
			applicationMode: "1",
			id: "15",
			name: "DIRECT ENTRY APPLICATION"
		}
	};
	const { data, isFetched } = useApiGet(getRecentNoticessUrl(), {
		keepPreviousData: true
	});

	useEffect(() => {
		if (isFetched) {
			setModal(true);
		}
	}, [isFetched]);

	const {
		data: applications,
		isLoading,
		error
	} = useApiGet(getAllApplicationTypesUnpaginatedUrl());

	const random = (array) => {
		if (array?.length > 0) {
			const arrayIndex = Math.floor(Math.random(3.32) * array.length);
			return array[arrayIndex];
		}
	};

	useEffect(() => {
		setCurrentApplication(
			random(applications?.data?.filter((item) => item.active))
		);
	}, [applications?.data]);

	if (isLoading) return <PageLoader />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<>
			{!data?.data || data?.data.length === 0 ? null : (
				<LandingModal
					data={data?.data}
					isOpen={modal}
					closeModal={() => setModal(false)}
				/>
			)}
			{!data?.data ||
			data?.data?.length === 0 ||
			message === false ? null : (
				<MessageBox
					openModal={() => setModal(true)}
					closeMessage={setMessage}
					title={data?.data[0]?.title}
					message={
						<div
							className={`d-flex align-items-baseline ${styles.message_body}`}
						>
							<div
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										data?.data[0]?.description.slice(0, 70)
									)
								}}
							/>
							<span>....</span>
						</div>
					}
				/>
			)}
			<GlobalMenu isLanding={"unAuthenticated"} />
			<main className={`${styles.container}`}>
				<div className={styles.sectionsContainer}>
					<section>
						{currentApplication ? (
							<div className={styles.notice}>
								<span>Notice</span>
								{`${currentApplication.name} is now open!`}
							</div>
						) : (
							<></>
						)}
						<h1>
							Federal University of <br /> Petroleum Resources,
							Effurun
						</h1>
						<p>
							Offering you the best educational experience through
							a variety of programmes and learning resources. See
							more below.
						</p>
					</section>
					<section className={`${styles.cardsContainer} row`}>
						<div className="col-md-4 col-12 mt-3">
							<div className={styles.card}>
								<h4>Sub-degree Programme</h4>
								<p>
									Please select a link applicable to you from{" "}
									<br /> the list below
								</p>
								<div className={styles.cardLinks}>
									<Link
										to={() =>
											handleCurrentLink(
												applicationForms.jupeb
											)
										}
									>
										Generate Invoice
									</Link>
									<Link to="/sub_degree_login">
										Application Form
									</Link>
								</div>
							</div>
						</div>
						<div className="col-md-4 col-12 mt-3">
							<div className={styles.card}>
								<h4>Post UTME</h4>
								<p>
									Please select a link applicable to you from{" "}
									<br /> the list below
								</p>
								<div className={styles.cardLinks}>
									<Link
										to={() =>
											handleCurrentLink(
												applicationForms.postUme
											)
										}
									>
										Generate Invoice
									</Link>
									<Link to="/putme_login">
										Application Form
									</Link>
								</div>
							</div>
						</div>
						<div className="col-md-4 col-12 mt-3">
							<div className={styles.card}>
								<h4>Post Graduate</h4>
								<p>
									Please select a link applicable to you from{" "}
									<br /> the list below
								</p>
								<div className={styles.cardLinks}>
									<Link
										to={() =>
											handleCurrentLink(
												applicationForms.postgraduate
											)
										}
									>
										Generate Invoice
									</Link>
									<Link to={"/pg_login"}>
										Application Form
									</Link>
									<Link to="/pg_reprint_login">
										Track Application Status
									</Link>
								</div>
							</div>
						</div>
						<div className="col-md-4 col-12 mt-3">
							<div className={styles.card}>
								<h4>Centre for Safety Education</h4>
								<p>
									Please select a link applicable to you from{" "}
									<br /> the list below
								</p>
								<div className={styles.cardLinks}>
									<Link
										to={() =>
											handleCurrentLink(
												applicationForms.cse
											)
										}
									>
										Generate Invoice
									</Link>
									<Link to={"/center_of_safety_login"}>
										Application Form
									</Link>
								</div>
							</div>
						</div>
						<div className="col-md-4 col-12 mt-3">
							<div className={styles.card}>
								<h4>Direct Entry</h4>
								<p>
									Please select a link applicable to you from{" "}
									<br /> the list below
								</p>
								<div className={styles.cardLinks}>
									<Link
										to={() =>
											handleCurrentLink(
												applicationForms.direct_entry
											)
										}
									>
										Generate Invoice
									</Link>
									<Link to={"/direct_entry_login"}>
										Application Form
									</Link>
								</div>
							</div>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export default Home;
