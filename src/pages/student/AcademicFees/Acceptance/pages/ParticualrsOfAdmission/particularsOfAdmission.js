/* eslint-disable react-hooks/exhaustive-deps */
import { ProfileContext } from "../../../../../../ui_elements";
import styles from "./style.module.css";
// import logo from "../../../../../../assets/images/logoSimple.png";
import { forwardRef, useContext, useState, useEffect } from "react";
import { SCHOOL_DETAILS } from "../../../../../../utils/constants";
import Barcode from "react-barcode";

export const ParticularsOfAdmission = forwardRef(({ details }, ref) => {
	return (
		<div className="row">
			<div className="col-12 col-md-1"></div>
			<div className="col-12 col-md-10">
				<div className={styles.page_content}>
					<ViewParticularsOfAdmission
						details={details}
						currentRef={ref}
					/>
				</div>
			</div>
			<div className="col-12 col-md-1"></div>
		</div>
	);
});

const ViewParticularsOfAdmission = ({ details, currentRef }) => {
	const data = useContext(ProfileContext);



	const CheckBox = () => {
		const data = useContext(ProfileContext);
		const currentValue = data?.profileData?.programmeDetail?.modeOfStudy.toLowerCase();
		const options = ["FULL TIME", "PART TIME", "SANDWICH"];

		const [checkedValue, setCheckedValue] = useState('');

		useEffect(() => {
			const normalizedOptions = options.map(option => option.toLowerCase());
			if (normalizedOptions.includes(currentValue)) {
				setCheckedValue(currentValue);
			}
		}, [currentValue, options]);

		return (
			<div className="d-flex flex-column">
				{options.map((item) => {
					const normalizedItem = item.toLowerCase();
					return (
						<div key={item} className="d-flex mb-2 align-items-center">
							<div
								className={`${styles.checkBox} d-flex align-items-center justify-content-center ${checkedValue === normalizedItem ? styles.checked : ''}`}
							>
								{checkedValue === normalizedItem && <span>&#10003;</span>}
							</div>
							<label htmlFor={item} className="ml-2">{item}</label>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div ref={currentRef} className={`container ${styles.page_content}`}>
			<header className={`${styles.header} mb-5 text-center`}>
				<div className="d-flex align-items-center justify-content-center">
					{/* <img src={logo} alt="logo" className="mr-3" /> */}
					<h2 className="text-uppercase">
						{SCHOOL_DETAILS.nameWithoutCampus}
					</h2>
				</div>
			</header>

			<div className="border-top border-bottom text-center py-2">
				<h3 className="text-uppercase mb-3 mt-3">
					Particulars of Admission
				</h3>
				<p className={styles.ref}>
					{`${data?.profileData?.programmeDetail?.jambRegNumber}`}
				</p>
			</div>

			<main className={styles.body}>
				<section className="d-flex justify-content-between align-items-center pt-5">
					<div className="d-flex justify-content-between w-100">
						<div className="w-75">
							<div className="row mb-2">
								<p className="col-4 text-bold">Name of Student:</p>
								<p className="col-8 text-uppercase text-bold">
									{data?.profileData?.personalData?.fullname}
								</p>
							</div>
							<div className="row mb-2">
								<p className="col-4 text-bold">Registration Number:</p>
								<p className="col-8 text-uppercase text-bold">
									{data?.profileData?.programmeDetail?.jambRegNumber}
								</p>
							</div>
							<div className="row mb-2">
								<p className="col-4 text-bold">Faculty:</p>
								<p className="col-8 text-uppercase text-bold">
									{data?.profileData?.programmeDetail?.faculty}
								</p>
							</div>
							<div className="row mb-2">
								<p className="col-4 text-bold">Department:</p>
								<p className="col-8 text-uppercase text-bold">
									{data?.profileData?.programmeDetail?.department}
								</p>
							</div>
							<div className="row mb-2">
								<p className="col-4 text-bold">Academic Session:</p>
								<p className="col-8 text-uppercase text-bold">
									{details?.session}
								</p>
							</div>
						</div>
						<img
							src={data?.profileData?.personalData?.passport}
							alt="profile-img"
							className={`${styles.profile_img} img-fluid`}
						/>
					</div>
				</section>

				<section className="table-responsive mt-4">
					<table className="table table-bordered">
						<tbody>
							<tr>
								<th>FIELD OF STUDY</th>
								<td>{data?.profileData?.programmeDetail?.department}</td>
							</tr>
							<tr>
								<th>DEGREE IN VIEW</th>
								<td>{data?.profileData?.programmeDetail
									?.schoolProgramme +
									" " +
									data?.profileData?.programmeDetail
										?.department}
								</td>
							</tr>
							<tr>
								<th>MODE OF REGISTRATION</th>
								<td>
									<CheckBox />
								</td>
							</tr>
							<tr>
								<th>MODE OF STUDY</th>
								<td>
									<ol className="mb-0">
										<li>By comprehensive research to be embodied in a thesis for Ph.D programmes. By course work to be examined in written papers together with research to be presented.</li>
										<li>In a project report, where course work predominate over research and constitutes not less than two thirds of the total credit load for Masters programmes.</li>
										<li>By coursework and project for PGD programmes</li>
									</ol>
								</td>
							</tr>
							<tr>
								<th>PERIOD OF STUDY</th>
								<td>{`${data?.profileData?.programmeDetail?.entryYear} - ${data?.profileData?.programmeDetail?.graduationYear}`}</td>
							</tr>
							<tr>
								<th>SUPERVISOR(S)</th>
								<td>{data?.profileData?.admissionList?.supervisor ?? "-"}</td>
							</tr>
							<tr>
								<th>OTHER CONDITIONS</th>
								<td>
									<ol className="mb-0">
										<li>Every postgraduate student must pay fees at the beginning of every academic year and renew his/her registration for the new session.</li>
										<li>Renewal of registration involves the completion of end-of-sessions report form, obtainable from the department and submitting same to the provost, College of Postgraduate Studies within one (1) month from the beginning of the new academic session.</li>
									</ol>
								</td>
							</tr>
						</tbody>
					</table>
				</section>

				<section className="mt-5 d-flex justify-content-center">
					<div className={styles.barcode_img}>
						<Barcode value={details?.rrr} />
					</div>
				</section>
			</main>
		</div>
	);
};
