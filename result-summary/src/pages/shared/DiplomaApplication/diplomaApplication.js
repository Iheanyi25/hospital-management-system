import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
	PageTitle,
	Button,
	SideTabs,
	Spinner,
	CenteredDialog
} from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";
import {
	EducationalRecords,
	EmploymentHistory,
	PersonalDetails
} from "./components";
import { useApiGet } from "../../../api/apiCall";
import {
	getRelationshipsUrl,
	getMaritalStatusesUrl,
	getYearsUrl,
	getAllCountriesUrl,
	getPGProgrammesUrl,
	getStudentModesOfStudyUrl,
	getOLevelExamTypesUrl,
	getOLevelSubjectsUrl,
	getOlevelGradeUrl,
	getPGPublicationStatusUrl,
	getPGCertificateTypesUrl,
	getPGLanguageProficiencyUrl,
	getPGHearAboutUsUrl,
	getApplicationFacultiesUrl
} from "../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_DIPLOMA_INFO } from "../../../store/constant";
import formatImageToBase64 from "../../../utils/formatImage";
import { useHistory } from "react-router-dom";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";
import { DiplomaCourseForm } from "./components/diplomaCourse";

const DiplomaApplication = () => {
	const diplomaState = useSelector((state) => state.diplomaData);
	const [open, setOpen] = useState(false);
	const [confirmed, setConfirmed] = useState(false);
	const { basicInformation } = diplomaState;
	const { push } = useHistory();
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();

	const { hash, state } = useLocation();
	if (!state?.fromDiplomaLogin) push("/diploma_login");

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, [hash]);

	const {
		data: relationships,
		isLoading,
		error
	} = useApiGet(getRelationshipsUrl(), {
		refetchOnWindowFocus: false
	});

	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getApplicationFacultiesUrl(basicInformation?.applicationTypeId),
		{
			refetchOnWindowFocus: false,
			enabled: true
		}
	);
	const { data: programmes, isLoading: loadingProgrammes } = useApiGet(
		getPGProgrammesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		data: countries,
		isLoadingCountries,
		countryError
	} = useApiGet(getAllCountriesUrl(), {
		refetchOnWindowFocus: false
	});

	const { data: stauses, isLoading: isLoadingStatuses } = useApiGet(
		getMaritalStatusesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: years, isLoading: isLoadingYears } = useApiGet(
		getYearsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: publicationStatus, isLoading: isLoadingPublicationStatuses } =
		useApiGet(getPGPublicationStatusUrl(), {
			refetchOnWindowFocus: false
		});

	const {
		data: studentModesOfStudy,
		isLoading: isLoadingStudentModesOfStudy
	} = useApiGet(getStudentModesOfStudyUrl(), {
		refetchOnWindowFocus: false
	});

	const { data: examTypes, isLoading: isLoadingExamTypes } = useApiGet(
		getOLevelExamTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: oLevelSubjects, isLoading: isLoadingOLevelSubjects } =
		useApiGet(getOLevelSubjectsUrl(), {
			refetchOnWindowFocus: false
		});

	const { data: oLevelGrades, isLoading: isLoadingOLevelGrades } = useApiGet(
		getOlevelGradeUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		data: oLevelDocumentTypes,
		isLoading: isLoadingOLevelDocumentTypes
	} = useApiGet(getPGCertificateTypesUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: languageProficiency,
		isLoading: isLoadingLanguageProficiency
	} = useApiGet(getPGLanguageProficiencyUrl(), {
		refetchOnWindowFocus: false
	});
	const { data: hearAboutUs, isLoading: isLoadingHearAboutUs } = useApiGet(
		getPGHearAboutUsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const allYears = years?.data?.map((year) => ({ label: year, value: year }));
	const allStatuses = formatSelectItems(stauses?.data, "name", "id");
	const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allPublicationStatus = formatSelectItems(
		publicationStatus?.data,
		"name",
		"id"
	);
	const allRelationships = formatSelectItems(
		relationships?.data,
		"name",
		"id"
	);
	const allStudentModesOfStudy = formatSelectItems(
		studentModesOfStudy?.data,
		"name",
		"id"
	);
	const allCountries = formatSelectItems(countries?.data, "name", "id");
	const allOlevelSubjects = formatSelectItems(
		oLevelSubjects?.data,
		"name",
		"id"
	);
	const allOlevelGrades = formatSelectItems(oLevelGrades?.data, "name", "id");
	const allExamTypes = formatSelectItems(examTypes?.data, "name", "id");
	const allDocumentTypes = formatSelectItems(
		oLevelDocumentTypes?.data,
		"name",
		"id"
	);
	const allLanguageProficiency = formatSelectItems(
		languageProficiency?.data,
		"name",
		"id"
	);
	const allLHearAboutUs = formatSelectItems(hearAboutUs?.data, "name", "id");
	const navs = useMemo(
		() => [
			{
				linkName: "Personal Details",
				hashName: "#section_a",
				state
			},
			{
				linkName: "Diploma Course",
				hashName: "#section_b",
				state
			},
			// {
			// 	linkName: "O-Level Result",
			// 	hashName: "#section_c",
			// 	state
			// },
			{
				linkName: "Educational Records",
				hashName: "#section_c",
				state
			},
			{
				linkName: "Employment History",
				hashName: "#section_d",
				state
			}
		],
		[state]
	);

	const uploadImage = async (images) => {
		if (
			checkIfFilesAreTooBig(images) &&
			checkIfImagesAreCorrectType(images)
		) {
			dispatch({
				type: SAVE_DIPLOMA_INFO,
				payload: {
					...diplomaState,
					basicInformation: {
						...basicInformation,
						passport: await formatImageToBase64(images[0])
					}
				}
			});
		} else {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: !checkIfFilesAreTooBig(images)
					? "File too Large."
					: "Invalid file type. Try again"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	};
	if (
		isLoading ||
		loadingProgrammes ||
		isLoadingStatuses ||
		isLoadingYears ||
		isLoadingCountries ||
		isLoadingStudentModesOfStudy ||
		isLoadingExamTypes ||
		isLoadingOLevelSubjects ||
		isLoadingOLevelGrades ||
		isLoadingPublicationStatuses ||
		isLoadingOLevelDocumentTypes ||
		isLoadingLanguageProficiency ||
		isLoadingHearAboutUs ||
		isLoadingFaculties
	)
		return <Spinner />;
	if (error || countryError)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className={styles.container} ref={ref}>
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
							onClick={() => setOpen(false)}
						/>
						<Button
							data-cy="declare"
							label="Certify"
							buttonClass={`primary`}
							data-dismiss="modal"
							onClick={() => {
								setConfirmed(true);
								setOpen(false);
							}}
						/>
					</>
				}
			>
				<p className="mb-4">
					I certify that the information given in this form is, to the
					best of my knowledge and belief, correct and complete
				</p>
			</CenteredDialog>

			<div className="row mb-3 mx-5">
				<div className="col-12 col-md-2 col-lg-2 d-flex align-items-end pb-4">
					<Avatar
						name={`${basicInformation?.surname} ${basicInformation?.firstname} ${basicInformation?.middlename}`}
						className={styles.profile_img}
						src={basicInformation?.passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10 pb-4 d-flex align-items-center">
					<div>
						<PageTitle
							title={`${basicInformation?.firstname}
							 ${basicInformation?.middlename && basicInformation?.middlename} 
								${basicInformation?.surname}`}
						/>
					</div>
				</div>
			</div>
			<div className="row mx-5">
				<div className="col-12 col-md-2 col-lg-2">
					<div>
						<Button
							data-cy="upload"
							buttonClass="standard-two"
							label="Upload"
							accept="image/png, image/jpg, image/jpeg"
							customClass={styles.upload_button}
							onClick={() => pictureRef?.current?.click()}
						/>
						<input
							type="file"
							ref={pictureRef}
							className={styles.input}
							onChange={(e) => uploadImage(e.target.files)}
						/>
					</div>
					<div className={styles.key_comes_tabs}>
						<div className={styles.key_comes_sticky}>
							<SideTabs
								navItems={navs}
								disallowForwardMovement={true}
							/>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<DisplayInformation
						allRelationships={allRelationships}
						allProgrammes={allProgrammes}
						allStatuses={allStatuses}
						allCountries={allCountries}
						allYears={allYears}
						allStudentModesOfStudy={allStudentModesOfStudy}
						allOlevelSubjects={allOlevelSubjects}
						allOlevelGrades={allOlevelGrades}
						allExamTypes={allExamTypes}
						allPublicationStatus={allPublicationStatus}
						allDocumentTypes={allDocumentTypes}
						allLanguageProficiency={allLanguageProficiency}
						allLHearAboutUs={allLHearAboutUs}
						allFaculties={allFaculties}
						setOpen={setOpen}
						confirmed={confirmed}
						setConfirmed={setConfirmed}
					/>
				</div>
			</div>
		</div>
	);
};

const DisplayInformation = memo(
	({
		allRelationships,
		allDepartments,
		allFaculties,
		allStatuses,
		allYears,
		allCountries,
		// allOlevelSubjects,
		// allExamTypes,
		// allOlevelGrades,
		allPublicationStatus,

		setOpen,
		confirmed,
		setConfirmed
	}) => {
		const location = useLocation();
		switch (location.hash) {
			case "#section_a":
				return (
					<PersonalDetails
						allStatuses={allStatuses}
						relationships={allRelationships}
						allCountries={allCountries}
					/>
				);
			case "#section_b":
				return (
					<DiplomaCourseForm
						allDepartments={allDepartments}
						allFaculties={allFaculties}
					/>
				);
			// case "#section_c":
			// 	return (
			// 		<OlevelResult
			// 			oLevelGrades={allOlevelGrades}
			// 			oLevelSubjects={allOlevelSubjects}
			// 			examYears={allYears}
			// 			oLevelType={allExamTypes}
			// 		/>
			// 	);
			case "#section_c":
				return (
					<EducationalRecords
						allYears={allYears}
						allPublicationStatus={allPublicationStatus}
					/>
				);

			case "#section_d":
				return (
					<EmploymentHistory
						setOpen={setOpen}
						confirmed={confirmed}
						setConfirmed={setConfirmed}
					/>
				);

			default:
				return (
					<PersonalDetails
						allStatuses={allStatuses}
						relationships={allRelationships}
						allCountries={allCountries}
					/>
				);
		}
	}
);

export default DiplomaApplication;
