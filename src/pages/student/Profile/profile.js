import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "react-modal";
import {
	PageTitle,
	Button,
	SideTabs,
	CenteredDialog,
	Spinner,
	ToggleElement
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
	getAllLGAsUrl,
	getAllSessionsUrl,
	getBloodGroupsUrl,
	getGenoTypesUrl,
	getProgrammeTypesUrl,
	getRelationshipsUrl,
	getReligionsUrl,
	getSponsorRelationshipsUrl,
	getStudentProfileUrl
} from "../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import ProfilePrintOut from "./ProfilePrintOut";
import { EducationHistory } from "./components/educationalHistory";
import { EmploymentHistory } from "./components/employmentHistory";
import Documents from "./components/documents";
import PgDocuments from "./components/pgDocuments";
import { STUDENT_TYPES } from "../../../utils/constants";

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
	const { hash, state } = useLocation();
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});

	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);

	const { data, isLoading, error } = useApiGet(
		getStudentProfileUrl({ refCode: false }),
		{
			refetchOnWindowFocus: false
		}
	);

	const postgraduate_object = useMemo(
		() => [
			{
				linkName: `Educational History`,
				hashName: "#section_e",
				state
			},
			{
				linkName: `Employment History`,
				hashName: "#section_f",
				state
			},
			{
				linkName: `Medical History`,
				hashName: "#section_g",
				state
			}
		],
		[state]
	);

	const otherStudents_object = useMemo(
		() => [
			{
				linkName: `Medical History`,
				hashName: "#section_e",
				state
			}
		],
		[state]
	);

	const navs = useMemo(
		() => [
			{
				linkName: "Personal Information",
				hashName: "#section_a",
				state
			},
			{
				linkName: "Sponsor's Details",
				hashName: "#section_b",
				state
			},
			{
				linkName: "Next of Kin Details",
				hashName: "#section_c",
				state
			},
			{
				linkName: `Programme Details`,
				hashName: "#section_d",
				state
			},
			...(data?.data?.programmeDetail?.studentTypeId ===
			STUDENT_TYPES.POSTGRADUATE
				? postgraduate_object
				: otherStudents_object),
			{
				linkName: `Documents`,
				hashName: "#section_i",
				state
			}
		],
		[
			state,
			otherStudents_object,
			postgraduate_object,
			data?.data?.programmeDetail?.studentTypeId
		]
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
		data: programmeTypes,
		isLoading: isLoadingProgrammeTypes,
		error: programmeTypesError
	} = useApiGet(getProgrammeTypesUrl(), {
		refetchOnWindowFocus: false
	});
	const { data: bloodGroups, isLoading: loadingBloodGroups } = useApiGet(
		getBloodGroupsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: genotypes, isLoading: loadingGenotypes } = useApiGet(
		getGenoTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: religions, isLoading: loadingReligions } = useApiGet(
		getReligionsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: lgas, isFetching: isLoadingLGAs } = useApiGet(
		getAllLGAsUrl({
			stateId: data?.data?.personalData?.stateId,
			countryId: data?.data?.personalData?.countryId
		}),
		{
			refetchOnWindowFocus: false,
			enabled: !!(
				data?.data?.personalData?.stateId &&
				data?.data?.personalData?.countryId
			)
		}
	);
	const allLGAs = useMemo(
		() => formatSelectItems(lgas?.data, "name", "id"),
		[lgas]
	);
	const allBloodGroups = formatSelectItems(bloodGroups?.data, "name", "id");
	const allGenotypes = formatSelectItems(genotypes?.data, "name", "id");
	const allReligions = formatSelectItems(religions?.data, "name", "id");
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
	const allProgrammeTypes = formatSelectItems(
		programmeTypes?.data,
		"name",
		"id"
	);
	if (
		isLoading ||
		relationshipsLoading ||
		isLoadingSponsorRelationships ||
		isLoadingSessions ||
		isLoadingProgrammeTypes ||
		loadingBloodGroups ||
		loadingGenotypes ||
		loadingReligions ||
		isLoadingLGAs
	)
		return <Spinner />;
	if (
		error ||
		relationshipsError ||
		sponsorRelationshipsError ||
		sessionsError ||
		programmeTypesError
	)
		return "An error has occurred: " + error?.response?.data?.message;

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
						name={`${data?.data?.personalData?.lastname} ${data?.data?.personalData?.firstname}`?.toUpperCase()}
						className={styles.profile_img}
						src={data?.data?.personalData?.passport}
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
					</div>
					<PageTitle
						title={`${data?.data?.personalData?.lastname} ${
							data?.data?.personalData?.firstname
						} ${
							data?.data?.personalData?.middlename ?? ""
						}`?.toUpperCase()}
						buttonGroup={
							<Button
								data-cy="print_docs"
								buttonClass="primary"
								label="Print"
								onClick={handlePrint}
							/>
						}
					/>
					<div>
						<ToggleElement
							id={`toggle-staff`}
							checked={data?.data?.personalData?.isStaff}
							label={
								data?.data?.personalData?.isStaff
									? "Staff"
									: "Not a staff"
							}
							isDisabled={true}
						/>
					</div>
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
					{data?.data?.programmeDetail?.studentTypeId ===
					STUDENT_TYPES.POSTGRADUATE ? (
						<PgDisplayInformation
							education={data?.data?.educationHistory}
							employment={data?.data?.employment}
							studentPersonalData={data?.data?.personalData}
							allRelationships={allRelationships}
							allSponsorRelationships={allSponsorRelationships}
							studentSponsor={data?.data?.sponsor}
							studentNextOfKin={data?.data?.nextOfKin}
							studentProgrammeDetail={data?.data?.programmeDetail}
							allSessions={allSessions}
							medicalRecords={
								data?.data?.personalData?.medicalRecords
							}
							allProgrammeTypes={allProgrammeTypes}
							allBloodGroups={allBloodGroups}
							allGenotypes={allGenotypes}
							allReligions={allReligions}
							allLGAs={allLGAs}
						/>
					) : (
						<DisplayInformation
							studentPersonalData={data?.data?.personalData}
							allRelationships={allRelationships}
							allSponsorRelationships={allSponsorRelationships}
							studentSponsor={data?.data?.sponsor}
							studentNextOfKin={data?.data?.nextOfKin}
							studentProgrammeDetail={data?.data?.programmeDetail}
							allSessions={allSessions}
							medicalRecords={
								data?.data?.personalData?.medicalRecords
							}
							allProgrammeTypes={allProgrammeTypes}
							allBloodGroups={allBloodGroups}
							allGenotypes={allGenotypes}
							allReligions={allReligions}
							allLGAs={allLGAs}
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
	allProgrammeTypes,
	medicalRecords,
	allBloodGroups,
	allGenotypes,
	allLGAs,
	allReligions
}) => {
	const location = useLocation();
	switch (location.hash) {
		case "#section_a":
			return (
				<PersonalInformation
					data={studentPersonalData}
					allBloodGroups={allBloodGroups}
					allGenotypes={allGenotypes}
					allReligions={allReligions}
					allLGAs={allLGAs}
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
					allProgrammeTypes={allProgrammeTypes}
					allLGAs={allLGAs}
				/>
			);
		case "#section_e":
			return <MedicalHistory data={medicalRecords || []} />;
		case "#section_i":
			return <Documents />;
		default:
			return (
				<PersonalInformation
					data={studentPersonalData}
					allBloodGroups={allBloodGroups}
					allGenotypes={allGenotypes}
					allReligions={allReligions}
					allLGAs={allLGAs}
				/>
			);
	}
};

const PgDisplayInformation = ({
	studentPersonalData,
	allRelationships,
	allSponsorRelationships,
	studentSponsor,
	studentNextOfKin,
	studentProgrammeDetail,
	allSessions,
	medicalRecords,
	education,
	employment,
	allProgrammeTypes,
	allBloodGroups,
	allGenotypes,
	allReligions,
	allLGAs
}) => {
	const location = useLocation();
	switch (location.hash) {
		case "#section_a":
			return (
				<PersonalInformation
					data={studentPersonalData}
					allBloodGroups={allBloodGroups}
					allGenotypes={allGenotypes}
					allReligions={allReligions}
					allLGAs={allLGAs}
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
					allProgrammeTypes={allProgrammeTypes}
				/>
			);
		case "#section_e":
			return (
				<EducationHistory
					data={studentProgrammeDetail}
					allSessions={allSessions}
					education={education}
				/>
			);
		case "#section_f":
			return (
				<EmploymentHistory
					data={studentProgrammeDetail}
					allSessions={allSessions}
					employment={employment}
				/>
			);
		case "#section_g":
			return <MedicalHistory data={medicalRecords || []} />;

		case "#section_i":
			return <PgDocuments />;

		default:
			return (
				<PersonalInformation
					data={studentPersonalData}
					allBloodGroups={allBloodGroups}
					allGenotypes={allGenotypes}
					allReligions={allReligions}
					allLGAs={allLGAs}
				/>
			);
	}
};
