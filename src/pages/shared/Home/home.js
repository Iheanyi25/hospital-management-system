import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApiGet } from "../../../api/apiCall";
import { getRecentNoticessUrl } from "../../../api/urls";
import { Footer, GlobalMenu, MessageBox } from "../../../ui_elements";
import { LandingModal } from "./containers";
import DOMPurify from "dompurify";

import styles from "./styles.module.css";

const Home = () => {
	const [message, setMessage] = useState(true);
	const [modal, setModal] = useState(false);
	const handleCurrentLink = (linkObject) => {
		if (linkObject?.applicationMode === "1") {
			return {
				pathname: `/generate_jamb_students_invoice`,
				state: { application: linkObject }
			};
		} else if (linkObject?.applicationMode === "2") {
			return {
				pathname: `/generate_jamb_students_invoice`,
				state: { application: linkObject }
			};
		} else if (linkObject?.applicationMode === "3") {
			return {
				pathname: `/generate_other_students_invoice`,
				state: { application: linkObject }
			};
		} else {
			console.log("Not a valid application mode");
		}
	};

	const applicationForms = {
		nd: {applicationMode: "1", id: "1", name: "ND APPLICATION "},
		hnd: { applicationMode: "2", id: "2", name: "HND APPLICATION" },
		partTime: { applicationMode: "3", id: "4", name: "ND PART-TIME APPLICATION" },
	};
	const { data, isFetched } = useApiGet(getRecentNoticessUrl(), {
		keepPreviousData: true
	});

	useEffect(() => {
		if (isFetched) {
			setModal(true);
		}
	}, [isFetched]);
	
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
					<section className={`${styles.sectionTextContainer} pb-5`}>
						<h1>
							Welcome To Akwa Ibom State <br /> Polytechnic
							Portal.
						</h1>
						<p className="pb-5">
							Offering you the best educational experience through
							a variety of programmes
							<br /> and learning resources. See more below.
						</p>
					</section>
					<section className={`${styles.cardsContainer} row`}>
						<div>
							<h4 className="text-center">Our Programmes</h4>
							<p className="text-center">
								Explore a World of Learning Possiblities:
								Discover Our Diverse Academic Pathways
							</p>
						</div>
						<div className="col-md-4 col-12 mt-3">
							<div className={styles.card}>
								<h4>HND Programme</h4>
								<p>
									Please select a link applicable to you from{" "}
									<br /> the list below
								</p>
								<div className={styles.cardLinks}>
									<Link
										to={() =>
											handleCurrentLink(
												applicationForms.hnd
											)
										}
									>
										Generate Invoice
									</Link>
									<Link to="/hnd_login">
										Application Form
									</Link>
								</div>
							</div>
						</div>
						<div className="col-md-4 col-12 mt-3">
							<div className={styles.card}>
								<h4>ND Programme</h4>
								<p>
									Please select a link applicable to you from{" "}
									<br /> the list below
								</p>
								<div className={styles.cardLinks}>
									<Link
										to={() =>
											handleCurrentLink(
												applicationForms.nd
											)
										}
									>
										Generate Invoice
									</Link>
									<Link to="/nd_login">Application Form</Link>
								</div>
							</div>
						</div>
						<div className="col-md-4 col-12 mt-3">
							<div className={styles.card}>
								<h4>ND Part-Time Programme</h4>
								<p>
									Please select a link applicable to you from{" "}
									<br /> the list below
								</p>
								<div className={styles.cardLinks}>
									<Link
										to={() =>
											handleCurrentLink(
												applicationForms.partTime
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
					</section>
				</div>
				<Footer />
			</main>
		</>
	);
};

export default Home;
