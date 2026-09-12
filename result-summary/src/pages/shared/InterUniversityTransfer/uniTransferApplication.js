import { memo, useEffect, useMemo, useRef } from "react";
import { PageTitle, Button, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";
import {
	EducationalRecords,
	OlevelResult,
	PersonalDetails,
	OtherInformation,
	CourseOfStudy,
	UniversityDetails
} from "./components";
import { useApiGet } from "../../../api/apiCall";
import {
	getRelationshipsUrl,
	getGendersUrl,
	getMaritalStatusesUrl,
	getYearsUrl,
	getAllCountriesUrl,
	getReligionsUrl,
	getPGProgrammesUrl,
	getStudentModesOfStudyUrl,
	getOLevelExamTypesUrl,
	getOLevelSubjectsUrl,
	getOlevelGradeUrl,
	getPGPublicationStatusUrl,
	getPGCertificateTypesUrl,
	getPGLanguageProficiencyUrl,
	getPGHearAboutUsUrl,
	getDepartmentsUrl,
	getApplicationFacultiesUrl
} from "../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_UNI_TRANSFER_INFO } from "../../../store/constant";
import formatImageToBase64 from "../../../utils/formatImage";
import { useHistory } from "react-router-dom";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";

const UniTransferApplication = () => {
	const uniTransferData = useSelector((state) => state.uniTransferData);
	const { passport, studentTypeId, applicationTypeId, personalInfoResponse } =
		uniTransferData;
	const { push } = useHistory();
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();

	const { hash, state } = useLocation();
	if (!state?.fromUniTransferLogin) push("/uni_transfer_login");

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
	const { data: departments, isLoading: isLoadingDepartments } = useApiGet(
		getDepartmentsUrl(studentTypeId),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getApplicationFacultiesUrl(applicationTypeId),
		{
			refetchOnWindowFocus: false,
			enabled: !!applicationTypeId
		}
	);
	const { data: genders, isLoading: isLoadingGenders } = useApiGet(
		getGendersUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
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
	const { data: religions, isLoading: loadingReligions } = useApiGet(
		getReligionsUrl(),
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

	const allReligions = formatSelectItems(religions?.data, "name", "id");
	const allYears = years?.data?.map((year) => ({ label: year, value: year }));
	const allStatuses = formatSelectItems(stauses?.data, "name", "id");
	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allDepartments = useMemo(
		() =>
			formatSelectItems(departments?.data, "department", "departmentId"),
		[departments?.data]
	);
	const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
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
				linkName: "Candidate’s University Details",
				hashName: "#section_b",
				state
			},
			{
				linkName: "Proposed Course of Study",
				hashName: "#section_c",
				state
			},
			{
				linkName: "O-Level Result",
				hashName: "#section_d",
				state
			},
			{
				linkName: "Educational Records",
				hashName: "#section_e",
				state
			},
			{
				linkName: "Other information",
				hashName: "#section_f",
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
				type: SAVE_UNI_TRANSFER_INFO,
				payload: {
					...uniTransferData,
					passport: await formatImageToBase64(images[0])
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
		isLoadingFaculties ||
		isLoadingDepartments ||
		isLoadingGenders ||
		isLoadingStatuses ||
		isLoadingYears ||
		isLoadingCountries ||
		loadingReligions ||
		isLoadingStudentModesOfStudy ||
		isLoadingExamTypes ||
		isLoadingOLevelSubjects ||
		isLoadingOLevelGrades ||
		isLoadingPublicationStatuses ||
		isLoadingOLevelDocumentTypes ||
		isLoadingLanguageProficiency ||
		isLoadingHearAboutUs
	)
		return <Spinner />;
	if (error || countryError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container} ref={ref}>
			<div className="row mb-3 mx-5 align-items-center">
				<div className="col-12 col-md-2 col-lg-2 d-flex align-items-end">
					<Avatar
						name={`${personalInfoResponse?.surname} ${personalInfoResponse?.firstname} ${personalInfoResponse?.middlename}`}
						className={styles.profile_img}
						src={passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<div className="mb-3">
						<PageTitle
							title={`${personalInfoResponse?.surname} ${
								personalInfoResponse?.firstname
							} ${personalInfoResponse?.middlename ?? ""}`}
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
						allFaculties={allFaculties}
						allDepartments={allDepartments}
						allGenders={allGenders}
						allStatuses={allStatuses}
						allCountries={allCountries}
						allYears={allYears}
						allReligions={allReligions}
						allStudentModesOfStudy={allStudentModesOfStudy}
						allOlevelSubjects={allOlevelSubjects}
						allOlevelGrades={allOlevelGrades}
						allExamTypes={allExamTypes}
						allPublicationStatus={allPublicationStatus}
						allDocumentTypes={allDocumentTypes}
						allLanguageProficiency={allLanguageProficiency}
						allLHearAboutUs={allLHearAboutUs}
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
		allGenders,
		allStatuses,
		allYears,
		allReligions,
		allCountries,
		allOlevelSubjects,
		allExamTypes,
		allOlevelGrades
	}) => {
		const location = useLocation();
		switch (location.hash) {
			case "#section_a":
				return (
					<PersonalDetails
						allGenders={allGenders}
						allStatuses={allStatuses}
						relationships={allRelationships}
						allCountries={allCountries}
						allReligions={allReligions}
					/>
				);
			case "#section_b":
				return <UniversityDetails />;
			case "#section_c":
				return <CourseOfStudy allFaculties={allFaculties} />;
			case "#section_d":
				return (
					<OlevelResult
						oLevelGrades={allOlevelGrades}
						oLevelSubjects={allOlevelSubjects}
						examYears={allYears}
						oLevelType={allExamTypes}
					/>
				);
			case "#section_e":
				return <EducationalRecords allCountries={allCountries} />;
			case "#section_f":
				return (
					<OtherInformation
						allYears={allYears}
						allDepartments={allDepartments}
					/>
				);
			default:
				return (
					<PersonalDetails
						allGenders={allGenders}
						allStatuses={allStatuses}
						relationships={allRelationships}
						allCountries={allCountries}
						allReligions={allReligions}
					/>
				);
		}
	}
);

export default UniTransferApplication;
