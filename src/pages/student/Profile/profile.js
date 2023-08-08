import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import {
	PageTitle,
	Button,
	SideTabs,
	CenteredDialog,
	Spinner
} from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";
import {
	PersonalInformation,
	SponsorInformation,
	NextOfKinInformation,
	ProgrammeDetails,
	MedicalHistory
} from "./components";
import { parent } from "../../../ui_elements/layout/layout";
import { useApiGet } from "../../../api/apiCall";
import {
	getAllSessionsUrl,
	getRelationshipsUrl,
	getSponsorRelationshipsUrl,
	getStudentProfileUrl
} from "../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import ProfilePrintOut from "./ProfilePrintOut";
import { getEyeColorsUrl } from "../../../api/urlCategories/Enums";
import SecurityFormPrintOut from "./SecurityFormPrintout";
import { motion } from "framer-motion";

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

Modal.setAppElement("#root");
const Profile = () => {
	const [open, setOpen] = useState(false);
	const { hash } = useLocation();
	const componentRef = useRef();

	const securityPrintRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});

	const handleSecurityPrint = useReactToPrint({
		content: () => securityPrintRef.current,
		pageStyle
	});

	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);
	const { data, isLoading, error, isFetching } = useApiGet(
		getStudentProfileUrl({ refCode: false }),
		{
			refetchOnWindowFocus: false
		}
	);
	const {
		data: relationships,
		isLoading: relationshipsLoading,
		error: relationshipsError
	} = useApiGet(getRelationshipsUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: sponsorRelationships,
		isLoading: isLoadingSponsorRelationships,
		error: sponsorRelationshipsError
	} = useApiGet(getSponsorRelationshipsUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: sessions,
		isLoading: isLoadingSessions,
		error: sessionsError
	} = useApiGet(getAllSessionsUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: eyeColors,
		isLoading: isLoadingEyeColors,
		error: eyeColorsError
	} = useApiGet(getEyeColorsUrl(), {
		refetchOnWindowFocus: false
	});

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allSponsorRelationships = formatSelectItems(
		sponsorRelationships?.data,
		"name",
		"id"
	);
	const allRelationships = formatSelectItems(
		relationships?.data,
		"name",
		"id"
	);

	const allEyeColors = formatSelectItems(eyeColors?.data, "name", "id");

	if (
		isLoading ||
		relationshipsLoading ||
		isLoadingSponsorRelationships ||
		isLoadingSessions ||
		isLoadingEyeColors
	)
		return <Spinner />;

	if (
		error ||
		relationshipsError ||
		sponsorRelationshipsError ||
		sessionsError ||
		eyeColorsError
	)
		return "An error has occurred: " + error?.response?.data?.message;

	const navs = [
		{
			linkName: "Personal Information",
			hashName: "#section_a"
		},
		{
			linkName: "Sponsor's Details",
			hashName: "#section_b"
		},
		{
			linkName: "Next of Kin Details",
			hashName: "#section_c"
		},
		{
			linkName: `Programme Details`,
			hashName: "#section_d"
		},
		{
			linkName: `Medical History`,
			hashName: "#section_e"
		}
	];

	return (
		<div className={styles.container}>
			<CenteredDialog
				modalId="accept-dialog"
				title="Declaration"
				isOpen={open}
				closeModal={() => setOpen(false)}
				footerData={
					<>
						<Button
							data-cy="cancel"
							label="Cancel"
							buttonClass="secondary"
							data-dismiss="modal"
						/>
						<Button
							data-cy="submit"
							label="Submit"
							buttonClass={`primary`}
							data-dismiss="modal"
						/>
					</>
				}
			>
				<p className="m-0">
					I certify that the information given in this form is, to the
					best of my knowledge and belief, correct and complete
				</p>
			</CenteredDialog>
			<div className="row mb-3 mx-0">
				<div className="col-12 col-md-2 col-lg-2">
					<Avatar
						name={`${data?.data?.studentPersonalData?.lastname} ${data?.data?.studentPersonalData?.firstname}`?.toUpperCase()}
						className={styles.profile_img}
						src={data?.data?.studentPersonalData?.passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10 py-4">
					<div className="d-none">
						<div ref={componentRef}>
							{data?.data && (
								<ProfilePrintOut userData={data.data} />
							)}
						</div>
						<div ref={securityPrintRef}>
							{data?.data && (
								<SecurityFormPrintOut userData={data.data} />
							)}
						</div>
					</div>
					<PageTitle
						title={`${data?.data?.studentPersonalData?.lastname} ${
							data?.data?.studentPersonalData?.firstname
						} ${
							data?.data?.studentPersonalData?.middlename ?? ""
						}`?.toUpperCase()}
						buttonGroup={[
							<Button
								data-cy="print_docs"
								buttonClass={"secondary"}
								label="Print Security Form"
								onClick={handleSecurityPrint}
								disabled={!data?.data?.canPrintSecurityForm}
							/>,
							<Button
								data-cy="print_docs"
								buttonClass="primary"
								label="Print"
								onClick={handlePrint}
							/>
						]}
					/>
				</div>
			</div>
			<div className="row mx-0">
				<div className="col-12 col-md-2 col-lg-2">
					<div className={styles.key_comes_tabs}>
						<div className={styles.key_comes_sticky}>
							<SideTabs navItems={navs} />
						</div>
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					{isFetching ? (
						<motion.div
							className="mt-5"
							transition={{ type: "spring", stiffness: 100 }}
							initial={{ visibility: "hidden", x: -25 }}
							animate={{ visibility: "visible", x: 1 }}
							style={{
								filter: isFetching ? "blur(5px)" : "none"
							}}
						>
							<DisplayInformation
								studentPersonalData={
									data?.data?.studentPersonalData
								}
								allRelationships={allRelationships}
								allSponsorRelationships={
									allSponsorRelationships
								}
								allEyeColors={allEyeColors}
								studentSponsor={data?.data?.studentSponsor}
								studentNextOfKin={data?.data?.studentNextOfKin}
								studentProgrammeDetail={
									data?.data?.studentProgrammeDetail
								}
								allSessions={allSessions}
								medicalRecords={
									data?.data?.studentPersonalData
										?.medicalRecords
								}
							/>
						</motion.div>
					) : (
						<DisplayInformation
							studentPersonalData={
								data?.data?.studentPersonalData
							}
							allRelationships={allRelationships}
							allSponsorRelationships={allSponsorRelationships}
							allEyeColors={allEyeColors}
							studentSponsor={data?.data?.studentSponsor}
							studentNextOfKin={data?.data?.studentNextOfKin}
							studentProgrammeDetail={
								data?.data?.studentProgrammeDetail
							}
							allSessions={allSessions}
							medicalRecords={
								data?.data?.studentPersonalData?.medicalRecords
							}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
export default Profile;

const DisplayInformation = ({
	studentPersonalData,
	allRelationships,
	allSponsorRelationships,
	studentSponsor,
	studentNextOfKin,
	studentProgrammeDetail,
	allSessions,
	allEyeColors,
	medicalRecords
}) => {
	const location = useLocation();
	switch (location.hash) {
		case "#section_a":
			return (
				<PersonalInformation
					data={studentPersonalData}
					allEyeColors={allEyeColors}
				/>
			);
		case "#section_b":
			return (
				<SponsorInformation
					data={studentSponsor}
					allSponsorRelationships={allSponsorRelationships}
				/>
			);
		case "#section_c":
			return (
				<NextOfKinInformation
					data={studentNextOfKin}
					relationships={allRelationships}
				/>
			);
		case "#section_d":
			return (
				<ProgrammeDetails
					data={studentProgrammeDetail}
					allSessions={allSessions}
				/>
			);
		case "#section_e":
			return <MedicalHistory data={medicalRecords} />;
		default:
			return (
				<PersonalInformation
					data={studentPersonalData}
					allEyeColors={allEyeColors}
				/>
			);
	}
};
