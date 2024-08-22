import { memo, useEffect, useMemo, useRef } from "react";
import { PageTitle, Button, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";
import {
	EducationHistory,
	EmploymentHistory,
	PersonalDetails,
	ProgrammeDetails
} from "./components";
import { useApiGet } from "../../../api/apiCall";
import {
	getApplicationFacultiesUrl,
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
	getPGLanguageProficiencyUrl,
	getPGHearAboutUsUrl,
	getPGCertificateTypesUrl
} from "../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_FIVE_YEAR_SANDWICH_APPLICATION } from "../../../store/constant";
import formatImageToBase64 from "../../../utils/formatImage";
import { useHistory } from "react-router-dom";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";
import EducationalQualification from "./components/educationalQualification";
import { UploadCertificate } from "./components/uploadCertificate";

const FiveYearSandwichApplication = () => {
	const fiveYearSandwichState = useSelector(
		(state) => state.fiveYearSandwichData
	);
	const { programme, basicInformation } = fiveYearSandwichState;
	const { push } = useHistory();
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();

	const { hash, state } = useLocation();
	if (!state?.fromLogin) push("/five_year_sandwich_login");

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
	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getApplicationFacultiesUrl(programme?.applicationTypeId),
		{
			refetchOnWindowFocus: false
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

	const {
		data: oLevelDocumentTypes,
		isLoading: isLoadingOLevelDocumentTypes
	} = useApiGet(getPGCertificateTypesUrl(), {
		refetchOnWindowFocus: false
	});

	const allDocumentTypes = formatSelectItems(
		oLevelDocumentTypes?.data,
		"name",
		"id"
	);

	const allReligions = formatSelectItems(religions?.data, "name", "id");
	const allYears = years?.data?.map((year) => ({ label: year, value: year }));
	const allStatuses = formatSelectItems(stauses?.data, "name", "id");
	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
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
				linkName: "Campus Programme Details",
				hashName: "#section_b",
				state
			},
			{
				linkName: "Educational Institutions",
				hashName: "#section_c",
				state
			},
			// {
			// 	linkName: "O-Level Result",
			// 	hashName: "#section_d",
			// 	state
			// },
			{
				linkName: "Educational Qualifications",
				hashName: "#section_d",
				state
			},
			{
				linkName: "Certificate upload",
				hashName: "#section_e",
				state
			},
			{
				linkName: "Employment History",
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
				type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
				payload: {
					...fiveYearSandwichState,
					programme: {
						...programme,
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
		isLoadingFaculties ||
		isLoadingGenders ||
		isLoadingStatuses ||
		isLoadingYears ||
		isLoadingCountries ||
		loadingReligions ||
		isLoadingStudentModesOfStudy ||
		isLoadingExamTypes ||
		isLoadingOLevelSubjects ||
		isLoadingOLevelGrades ||
		isLoadingLanguageProficiency ||
		isLoadingHearAboutUs ||
		isLoadingOLevelDocumentTypes
	)
		return <Spinner />;
	if (error || countryError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container} ref={ref}>
			<div className="row mb-3 mx-5">
				<div className="col-12 col-md-2 col-lg-2 d-flex align-items-end pb-4">
					<Avatar
						name={`${basicInformation?.surname} ${basicInformation?.firstname} ${basicInformation?.middlename}`}
						className={styles.profile_img}
						src={programme?.passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<div className="">
						<PageTitle
							title={`${basicInformation?.surname}
						${basicInformation?.firstname}`}
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
						allGenders={allGenders}
						allStatuses={allStatuses}
						allCountries={allCountries}
						allYears={allYears}
						allReligions={allReligions}
						allStudentModesOfStudy={allStudentModesOfStudy}
						allOlevelSubjects={allOlevelSubjects}
						allOlevelGrades={allOlevelGrades}
						allExamTypes={allExamTypes}
						allLanguageProficiency={allLanguageProficiency}
						allLHearAboutUs={allLHearAboutUs}
						allDocumentTypes={allDocumentTypes}
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
		allStudentModesOfStudy,
		allOlevelSubjects,
		allOlevelGrades,
		allDocumentTypes
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
				return (
					<ProgrammeDetails
						allYears={allYears}
						allDepartments={allDepartments}
						allFaculties={allFaculties}
						allStudentModesOfStudy={allStudentModesOfStudy}
					/>
				);
			case "#section_c":
				return <EducationHistory />;
			// case "#section_d":
			// 	return (
			// 		<OlevelResult
			// 			oLevelGrades={allOlevelGrades}
			// 			oLevelSubjects={allOlevelSubjects}
			// 			examYears={allYears}
			// 			oLevelType={allExamTypes}
			// 		/>
			// 	);
			case "#section_d":
				return (
					<EducationalQualification
						allYears={allYears}
						oLevelGrades={allOlevelGrades}
						oLevelSubjects={allOlevelSubjects}
					/>
				);
			case "#section_e":
				return (
					<UploadCertificate oLevelDocumentTypes={allDocumentTypes} />
				);
			case "#section_f":
				return <EmploymentHistory />;
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

export default FiveYearSandwichApplication;
