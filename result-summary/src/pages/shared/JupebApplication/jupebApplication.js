import { memo, useEffect, useMemo, useRef } from "react";
import { PageTitle, Button, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation, useHistory } from "react-router";

import {
	OlevelResult,
	PersonalDetails,
	EducationalHistory,
	UploadDocument
} from "./components";

import { parent } from "../../../ui_elements/layout/layout";

import { useApiGet } from "../../../api/apiCall";
import {
	getFacultiesUrl,
	getRelationshipsUrl,
	getGendersUrl,
	getMaritalStatusesUrl,
	getOLevelExamTypesUrl,
	getOLevelSubjectsUrl,
	getOlevelGradeUrl,
	getYearsUrl,
	getBloodGroupsUrl,
	getGenoTypesUrl,
	getReligionsUrl,
	jupebCourseOptionsUrl,
	getAllCountriesUrl
} from "../../../api/urls";

import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useDispatch, useSelector } from "react-redux";
import { JUPEP_APPLICATIONS } from "../../../store/constant";
import formatImageToBase64 from "../../../utils/formatImage";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";

const JupebApplication = () => {
	const jupebData = useSelector((state) => state.jupebData);

	const { passport, Firstname, Lastname } = useSelector(
		(state) => state.jupebData
	);
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();

	const { hash, state } = useLocation();

	const { push } = useHistory();

	if (!state?.fromVerify) {
		push("/jupeb_login");
	}

	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);

	const {
		data: relationships,
		isLoading,
		error
	} = useApiGet(getRelationshipsUrl(), {
		refetchOnWindowFocus: false
	});

	const { data: maritalStatus, isLoading: isLoadingMaritalStatus } =
		useApiGet(getMaritalStatusesUrl(), {
			refetchOnWindowFocus: false
		});

	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getFacultiesUrl(jupebData?.StudentTypeId),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: bloodGroups, isLoading: isLoadingBloodGroups } = useApiGet(
		getBloodGroupsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: genotype, isLoading: isLoadingGenoType } = useApiGet(
		getGenoTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: departments, isLoading: isLoadingDepartments } = useApiGet(
		jupebCourseOptionsUrl(),
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

	const { data: examYears, isLoading: isLoadingExamYears } = useApiGet(
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

	const { data: countries, isLoading: loadingCountries } = useApiGet(
		getAllCountriesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const allCountries = formatSelectItems(countries?.data, "name", "id");
	const allReligions = formatSelectItems(religions?.data, "name", "id");
	const allMartitalStatus = formatSelectItems(
		maritalStatus?.data,
		"name",
		"id"
	);
	const allStatuses = formatSelectItems(stauses?.data, "name", "id");
	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allRelationships = formatSelectItems(
		relationships?.data,
		"name",
		"id"
	);
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allBloodGroups = formatSelectItems(bloodGroups?.data, "name", "id");
	const allGenotype = formatSelectItems(genotype?.data, "name", "id");

	const allOlevelSubjects = formatSelectItems(
		oLevelSubjects?.data,
		"name",
		"id"
	);
	const allOlevelGrades = formatSelectItems(oLevelGrades?.data, "name", "id");
	const allExamYears = examYears?.data.map((year) => ({
		value: year,
		label: year
	}));
	const allExamTypes = formatSelectItems(examTypes?.data, "name", "id");

	const navs = useMemo(
		() => [
			{
				linkName: "Personal & Next of Kin",
				hashName: "#section_a",
				state
			},
			{
				linkName: "Educational History",
				hashName: "#section_b",
				state
			},
			{
				linkName: "O-Level Result",
				hashName: "#section_c",
				state
			},
			{
				linkName: "Upload Documents",
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
				type: JUPEP_APPLICATIONS,
				payload: {
					...jupebData,
					passport: {
						passport: await formatImageToBase64(images[0])
					},
					isPassportValid: true
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
		isLoadingFaculties ||
		isLoadingGenders ||
		isLoadingStatuses ||
		isLoadingExamTypes ||
		isLoadingOLevelSubjects ||
		isLoadingOLevelGrades ||
		isLoadingExamYears ||
		isLoadingBloodGroups ||
		isLoadingGenoType ||
		isLoadingDepartments ||
		loadingReligions ||
		isLoadingMaritalStatus ||
		loadingCountries
	)
		return <Spinner />;
	if (error) return "An error has occurred: " + error.message;

	return (
		<div className={styles.container} ref={ref}>
			<div className="row mb-3 mx-2 mx-md-5">
				<div className="col-12 col-xl-2 d-flex align-items-end justify-content-center justify-content-xl-start">
					<Avatar
						name={`${Firstname} ${Lastname}`}
						className={styles.profile_img}
						src={passport?.passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-xl-10">
					<div className="d-flex d-xl-block justify-content-center mt-3 mt-xl-0">
						<PageTitle title={`${Firstname} ${Lastname}`} />
					</div>
				</div>
			</div>
			<div className="row mx-2 mx-md-5">
				<div className="col-12 col-xl-2 mb-4 mb-xl-0">
					<div className="d-flex d-xl-block justify-content-center">
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
				<div className="col-12 col-xl-10">
					<DisplayInformation
						allRelationships={allRelationships}
						allFaculties={allFaculties}
						allGenders={allGenders}
						allStatuses={allStatuses}
						allOlevelGrades={allOlevelGrades}
						allExamYears={allExamYears}
						allOlevelSubjects={allOlevelSubjects}
						allExamTypes={allExamTypes}
						allDepartments={allDepartments}
						allBloodGroups={allBloodGroups}
						allGenotype={allGenotype}
						allReligions={allReligions}
						maritalStatus={allMartitalStatus}
						allCountries={allCountries}
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
		allGenotype,
		allBloodGroups,
		allGenders,
		allStatuses,
		allOlevelGrades,
		allExamYears,
		allOlevelSubjects,
		allExamTypes,
		allReligions,
		maritalStatus,
		allCountries,
		allFaculties
	}) => {
		const location = useLocation();
		switch (location.hash) {
			case "#section_a":
				return (
					<PersonalDetails
						allGenders={allGenders}
						allStatuses={allStatuses}
						relationships={allRelationships}
						departments={allDepartments}
						bloodGroups={allBloodGroups}
						genotypes={allGenotype}
						religions={allReligions}
						maritalStatus={maritalStatus}
						allCountries={allCountries}
						allFaculties={allFaculties}
					/>
				);
			case "#section_b":
				return (
					<EducationalHistory
						years={allExamYears}
						oLevelType={allExamTypes}
					/>
				);
			case "#section_c":
				return (
					<OlevelResult
						oLevelGrades={allOlevelGrades}
						oLevelSubjects={allOlevelSubjects}
						examYears={allExamYears}
						oLevelType={allExamTypes}
					/>
				);
			case "#section_d":
				return <UploadDocument />;
			default:
				return (
					<PersonalDetails
						allGenders={allGenders}
						allStatuses={allStatuses}
						relationships={allRelationships}
						departments={allDepartments}
						bloodGroups={allBloodGroups}
						genotypes={allGenotype}
						religions={allReligions}
						maritalStatus={maritalStatus}
						allCountries={allCountries}
						allFaculties={allFaculties}
					/>
				);
		}
	}
);

export default JupebApplication;
