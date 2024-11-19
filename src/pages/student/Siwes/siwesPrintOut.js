import React, { useRef } from "react";
import Logo from "../../../assets/images/sideLogo.png";
import Avatar from "react-avatar";
import styles from "./style.module.css";
import { SCHOOL_DETAILS } from "../../../utils/constants";
import { getStudentSiwesUrl } from "../../../api/urls";
import { useApiGet } from "../../../api/apiCall";
import { PageTitle, Spinner, Button } from "../../../ui_elements";
import { useLocation, useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const { name } = SCHOOL_DETAILS;

const pageStyle = `
  @page {
    // size: 80mm 50mm;
    margin-top: 10rem;
    margin-left: 3rem;
  }

  // @media all {
  //   .pagebreak {
  //     display: none;
  //   }
  // }

  @media print {
    .pagebreak {
      // page-break-before: always;

    }
  }
`;

export default function SiwesPrintOut() {
	const date = new Date();
	const componentRef = useRef();

	const { push } = useHistory();

	const { state } = useLocation();

	const {
		data: studentsSiwes,
		isLoading: isLoadingStudentsSiwes,
		error: studentsSiwesError
	} = useApiGet(getStudentSiwesUrl(), {
		refetchOnWindowFocus: false
	});

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});

	if (isLoadingStudentsSiwes) return <Spinner />;

	if (studentsSiwesError)
		return (
			"An error has occurred: " +
			studentsSiwesError?.response?.data?.message
		);

	if (!state) {
		push("/siwes");
	}

	return (
		<div>
			<PageTitle
				buttonGroup={
					<div className="mb-5">
						<Button
							data-cy="default"
							buttonClass="primary"
							label="Print"
							onClick={handlePrint}
						/>
					</div>
				}
			/>
			<div className="mt-5" ref={componentRef}>
				<div className={styles.logo_container}>
					<img src={Logo} alt="logo" />
				</div>
				<div className={styles.avatar_container}>
					<Avatar
						className="info-avatar"
						name={`${studentsSiwes?.data?.personalDetails?.lastname} ${studentsSiwes?.data?.personalDetails?.firstname}`}
						size="225"
						src={studentsSiwes?.data?.personalDetails?.passport}
						round={false}
						maxInitials={2}
						color="#00875a"
					/>
				</div>

				<div className={styles.print_out__section}>
					<div className={styles.grid_header}>
						Personal Information
					</div>
					<div className="row ml-2">
						<div className="col-6">
							<div className="row align-items-center">
								<div className="col-3 text-bold">Full Name</div>
								<div className="col-9">{`${studentsSiwes?.data?.personalDetails?.lastname} ${studentsSiwes?.data?.personalDetails?.firstname} ${studentsSiwes?.data?.personalDetails?.middlename}`}</div>
							</div>
							<div className="row mt-3">
								<div className="col-3 text-bold">Course of Study</div>
								<div className="col-9">
									{
										studentsSiwes?.data?.personalDetails
											?.department
									}
								</div>
							</div>
						</div>
						<div className="col-5">
							<div className="row">
								<div className="col-3 text-bold">Reg No:</div>
								<div className="col-9">
									{
										studentsSiwes?.data?.personalDetails
											?.regNumber
									}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-3 text-bold">Phone Number</div>
								<div className="col-9">
									{
										studentsSiwes?.data?.personalDetails
											?.mobileNumber
									}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.print_out__section}>
					<div className={styles.grid_header}>SIWES Details</div>
					<div className="row ml-2">
						<div className="col-6">
							<div className="row">
								<div className="col-3 text-bold">Session</div>
								<div className="col-9">
									{studentsSiwes?.data?.siwesDetails?.session}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-3 text-bold">Logbook Serial No.</div>
								<div className="col-9">
									{
										studentsSiwes?.data?.siwesDetails
											?.logBookSerialNumber
									}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-3 text-bold">Organization Name</div>
								<div className="col-9">
									{
										studentsSiwes?.data?.siwesDetails
											?.organizationName
									}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-3 text-bold">
									State of SIWES placement
								</div>
								<div className="col-9">
									{studentsSiwes?.data?.siwesDetails?.state}
								</div>
							</div>
							<div className="row mt-3 ">
								<div className="col-3 text-bold">City/Town of SIWES</div>
								<div className="col-9">
									{studentsSiwes?.data?.siwesDetails?.city}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-3 text-bold">
									Organization Address
								</div>
								<div className="col-9">
									{
										studentsSiwes?.data?.siwesDetails
											?.organizationAddress
									}
								</div>
							</div>
						</div>
						<div className="col-5">
							<div className="row">
								<div className="col-3 text-bold">
									Name of Industry Based Supervisor
								</div>
								<div className="col-9">
									{
										studentsSiwes?.data?.siwesDetails
											?.supervisor
									}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-3 text-bold">Bank</div>
								<div className="col-9">
									{studentsSiwes?.data?.siwesDetails?.bank}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-3 text-bold">Account Number</div>
								<div className="col-9">
									{
										studentsSiwes?.data?.siwesDetails
											?.accountNumber
									}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-3 text-bold">Sort Coder</div>
								<div className="col-9">
									{
										studentsSiwes?.data?.siwesDetails
											?.sortCode
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<footer className={styles.print_out_footer}>
				{`Copyright ©️ ${date.getFullYear()} ${name}. Powered by
				Tenece Professional Services`}
			</footer>
		</div>
	);
}
