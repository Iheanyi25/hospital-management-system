import React, { useRef } from "react";
import Logo from "../../../assets/images/sideLogo.png";
import Avatar from "react-avatar";
import styles from "./style.module.css";
import { useApiGet } from "../../../api/apiCall";
import { Spinner } from "../../../ui_elements";
import { getStudentProfileUrl } from "../../../api/urlCategories/Student";
import { formatDateFromAPI } from "../../../utils/formatDate";

export default function SecurityFormPrintOut() {
	const componentRef = useRef();

	const { data, isLoading, error } = useApiGet(
		getStudentProfileUrl({ refCode: false }),
		{
			refetchOnWindowFocus: false
		}
	);

	if (isLoading) return <Spinner />;

	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className={styles.print_out_wrapper}>
			<div ref={componentRef}>
				<div className={styles.printout_logo}>
					<img src={Logo} alt="logo" />
				</div>
				<div
					className={`d-flex align-items-center justify-content-center ${styles.print_out_h2}`}
				>
					<div className="text-center">
						<h2>OFFICE OF THE CHIEF SECURITY OFFICER</h2>
						<h2 className="mt-3">STUDENT SECURITY DATA FORM</h2>
					</div>
				</div>
				<div className={styles.avatar_container}>
					<Avatar
						className="info-avatar"
						name={data?.data?.studentPersonalData?.fullname}
						size="125"
						src={`${data?.data?.studentPersonalData?.passport}`}
						round={false}
						maxInitials={2}
						color="#00875a"
					/>
				</div>

				<div className={styles.print_out__section}>
					<div className={`${`${styles.grid_header} text-bold`}`}>
						Personal Information
					</div>
					<div className="row ml-2">
						<div className="col-6">
							<div className="d-flex align-items-center gap-2">
								<div className="col-3 p-0 text-bold">
									Fullname
								</div>
								<div className="col-9 p-0">{`${data?.data?.studentPersonalData?.fullname}`}</div>
							</div>
							<div className="d-flex mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Programme
								</div>
								<div className="col-9  p-0">
									{`${data?.data?.studentProgrammeDetail?.department}`}
								</div>
							</div>
							<div className="d-flex mt-3 align-items-center gap-2">
								<div className="col-3 p-0 text-bold">
									Date of birth
								</div>
								<div className="col-9 p-0">
									{formatDateFromAPI(
										data?.data?.studentPersonalData
											?.dateOfBirth
									)}
								</div>
							</div>
							<div className="d-flex mt-3 align-items-center gap-2">
								<div className="col-3 p-0 text-bold">
									Session
								</div>

								<div className="col-9 p-0">{`${data?.data?.studentProgrammeDetail?.session}`}</div>
							</div>
							<div className="d-flex mt-3 mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									State of origin
								</div>

								<div className="col-9 p-0">
									{`${data?.data?.studentPersonalData?.state}`}
								</div>
							</div>
							<div className="d-flex mt-3 align-items-center gap-2">
								<div className="col-3 p-0 text-bold">
									LGA of origin
								</div>

								<div className="col-9 p-0">{`${data?.data?.studentPersonalData?.lga}`}</div>
							</div>
							<div className="d-flex mt-3 mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Home town
								</div>

								<div className="col-9 p-0">
									{`${data?.data?.studentPersonalData?.homeTown}`}
								</div>
							</div>
							<div className="d-flex mt-3 align-items-center gap-2">
								<div className="col-3 p-0 text-bold">
									Languages Spoken
								</div>

								<div className="col-9 p-0">English</div>
							</div>
						</div>
						<div className="col-6">
							<div className="d-flex mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Religion
								</div>

								<div className="col-9 p-0">
									{`${data?.data?.studentPersonalData?.religion}`}
								</div>
							</div>
							<div className="d-flex mt-3 mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Residential Address
								</div>

								<div className="col-9 p-0">
									{`${data?.data?.studentPersonalData?.permanentAddress}`}
								</div>
							</div>
							<div className="d-flex mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Contact Address
								</div>

								<div className="col-9 p-0">
									{`${data?.data?.studentPersonalData?.contactAddress}`}
								</div>
							</div>
							<div className="d-flex mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Height
								</div>

								<div className="col-9 p-0">
									{`${data?.data?.studentPersonalData?.height}`}
								</div>
							</div>
							<div className="d-flex mt-3 mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Weight
								</div>

								<div className="col-9 p-0">
									{`${data?.data?.studentPersonalData?.weight}`}
								</div>
							</div>
							<div className="d-flex mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Eye Colour
								</div>

								<div className="col-9 p-0">
									{`${data?.data?.studentPersonalData?.eyeColor}`}
								</div>
							</div>
							<div className="d-flex mt-3 p-0 mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Blood Group
								</div>

								<div className="col-9 p-0">
									{`${data?.data?.studentPersonalData?.bloodGroup}`}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.print_out__section}>
					<div className={`${styles.grid_header} text-bold`}>
						Next Of Kin Details
					</div>
					<div className="d-flex ml-2">
						<div className={styles.image_print_out}>
							<img
								src={
									data?.data?.studentNextOfKin
										?.passportAsBase64
								}
								alt={"next of kin"}
								className={`${styles.previewKin}`}
							/>
						</div>
						<div className="col-6 ml-5">
							<div className="d-flex gap-2">
								<div className="col-3 p-0 text-bold">
									Fullname
								</div>
								<div className="col-9 p-0">
									{`${data?.data?.studentNextOfKin?.fullname}`}
								</div>
							</div>
							<div className="d-flex mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Address
								</div>
								<div className="col-9 p-0">
									{`${data?.data?.studentNextOfKin?.address}`}
								</div>
							</div>
							<div className="d-flex mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Relationship
								</div>
								<div className="col-9 p-0">
									{`${data?.data?.studentNextOfKin?.relationship}`}
								</div>
							</div>
							<div className="d-flex mt-3 gap-2">
								<div className="col-3 p-0 text-bold">
									Phone Number
								</div>
								<div className="col-9 p-0">
									{`${data?.data?.studentNextOfKin?.mobileNumber}`}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.print_out__section}>
					<div
						className={`${`${styles.grid_header} text-bold`} text-center font-weight-bold mb-5`}
					>
						PARENTS/GUARDIANS CERTIFICATION
					</div>
					<div className="d-flex">
						<div className="col-6 p-0">
							<h3
								className={`font-weight-bold text-decoration-underline mb-3 ${styles.gaurdian}`}
							>
								PARENT
							</h3>
							<div className="d-flex">
								<div className="col-3 p-0 text-bold">Name</div>

								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
							<div className="d-flex mt-3">
								<div className="col-3 p-0 text-bold">
									Address
								</div>
								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
							<div className="d-flex mt-3">
								<div className="col-3 p-0 text-bold">
									Phone number
								</div>
								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
							<div className="d-flex mt-3">
								<div className="col-3 p-0 text-bold">
									Signature
								</div>
								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
							<div className="d-flex mt-3 ">
								<div className="col-3 p-0 text-bold">Date</div>
								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
						</div>
						<div className="col-5 ml-5 p-0">
							<h3
								className={`font-weight-bold text-decoration-underline mb-3 ${styles.gaurdian}`}
							>
								WITNESS
							</h3>
							<div className="d-flex">
								<div className="col-3 p-0 text-bold">Name</div>
								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
							<div className="d-flex mt-3">
								<div className="col-3 p-0 text-bold">
									Address
								</div>
								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
							<div className="d-flex mt-3">
								<div className="col-3 p-0 text-bold">
									Phone Number
								</div>
								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
							<div className="d-flex mt-3">
								<div className="col-3 p-0 text-bold">
									Signature
								</div>
								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
							<div className="d-flex mt-3">
								<div className="col-3 p-0 text-bold">Date</div>
								<div className="col-9 p-0">
									<hr />
								</div>
							</div>
						</div>
					</div>
					<div className="mt-5">
						<h3
							className={`font-weight-bold text-decoration-underline mb-4 ${styles.gaurdian}`}
						>
							CERTIFICATION BY DIVISONAL POLICE OFFICER
						</h3>
						<div className="w-100 d-flex flex-wrap">
							<div className="d-flex gap-2 w-100 justify-content-between align-it">
								<span>I certify that</span>
								<hr className={`${styles.line}`} />
								<span>
									has no criminal record on him/her (if any
									state boldly)
								</span>
							</div>
							<hr className="w-100 mt-4" />
							<hr className="w-100 mt-4" />
							<p className="mt-2">
								That to the best of my knowledge and the facts
								stated above are correct and I hereby decade
								that if criminal case is made in connection with
								this student is proven to be false I should be
								prosecuted.
							</p>
						</div>
					</div>
					<div className="mt-5 ml-4">
						<div>
							<div className="row">
								<div className="col-2 text-bold">Rank</div>

								<div className="col-5">
									<hr className="w-60" />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-2 text-bold">Address</div>
								<div className="col-5">
									<hr />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-2 text-bold">
									Phone number
								</div>
								<div className="col-5">
									<hr />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-2 text-bold">
									Signature and Stamp
								</div>
								<div className="col-5">
									<hr />
								</div>
							</div>
							<div className="row mt-3 ">
								<div className="col-2 text-bold">Date</div>
								<div className="col-5">
									<hr />
								</div>
							</div>
						</div>
					</div>

					<div className="mt-5">
						<h3
							className={`font-weight-bold text-decoration-underline mb-4 ${styles.gaurdian}`}
						>
							NEXT OF KIN CERTIFICATE
						</h3>
						<div className="w-100 d-flex flex-wrap">
							<div className="d-flex w-100 gap-2 align-items-baseline">
								<span>I</span>
								<hr className={`${styles.line}`} />
								<span>
									hereby depose that I am the true and
									certified next of kin of the
								</span>
							</div>
							<p>
								above mentioned student. I have verified the
								details of the student and ascertained on my
								honour that they are correct.
							</p>
							<p className="mt-2">
								I fully understand that it is my responsibility
								to promptly inform the University (Security
								Department) of any change or update affecting
								the student.
							</p>
							<p className="mt-2">
								I am liable to be persecuted in accordance to
								extant laws for fraud or liabilities incurred
								against the University arising from my
								responsibility as Next of Kin.
							</p>
						</div>
					</div>
					<div className="mt-5">
						<div className="row mt-5">
							<div className="col-1 text-bold">Signature</div>
							<div className="col-5">
								<hr />
							</div>
						</div>
					</div>

					<p className="mt-xl-5 font-weight-bold">
						In the Presence of
					</p>

					<div className="mt-3">
						<div>
							<div className="row">
								<div className="col-1 text-bold">Name</div>

								<div className="col-5">
									<hr className="w-60" />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-1 text-bold">
									Occupation
								</div>
								<div className="col-5">
									<hr />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-1 text-bold">Address</div>
								<div className="col-5">
									<hr />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-1 text-bold">Signature</div>
								<div className="col-5">
									<hr />
								</div>
							</div>
							<div className="row mt-3 ">
								<div className="col-1 text-bold">Date</div>
								<div className="col-5 d-flex align-items-baseline gap-2">
									<hr className={styles.line} />
									<p>day of</p>
									<hr className={styles.line} />
									<p>{new Date().getFullYear()}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-xl-5 d-flex align-items-center justify-content-center flex-column">
						<p className={`mt-5 ${styles.bottom}`}>Before me</p>
						<p className={`mt-2 mb-2 ${styles.bottom}`}>
							Commissioner of Oath
						</p>
						<hr className={`${styles.line2} mt-5`} />
						<p className={`mt-l-5 ${styles.bottom}`}>
							SIGNATURE & STAMP
						</p>
						<div
							className={`d-flex align-items-center justify-content-center ${styles.print_out_h2}`}
						>
							<h2 className="mt-5 text-center">
								NOTE: ANY FORM NOT SIGNED AND STAMPED BY THE CSO
								SHOULD NOT BE HONOURED
							</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
