import { memo, useEffect, useMemo, useRef } from "react";
import { PageTitle, Button, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";

import {
	OlevelResult,
	PersonalDetails,
	InstitutionAttended
} from "./components";

import { parent } from "../../../ui_elements/layout/layout";

import { useApiGet } from "../../../api/apiCall";
import {
	getFacultiesUrl,
	getRelationshipsUrl,
	getGendersUrl,
	getMaritalStatusesUrl,
	getOLevelExamTypesUrl,
	getOlevelGradeUrl,
	getYearsUrl,
	getDepartmentsUrl,
	getBloodGroupsUrl,
	getGenoTypesUrl,
	getReligionsUrl,
	getAllCountriesUrl,
	getOLevelSubjectsUrl
} from "../../../api/urls";

import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";
import { useDispatch, useSelector } from "react-redux";
import { DIRECT_ENTRY } from "../../../store/constant";
import formatImageToBase64 from "../../../utils/formatImage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DirectEntryApplication = () => {
	const directEntryData = useSelector((state) => state.directEntryData);
	const { passport, basicInformation } = useSelector(
		(state) => state.directEntryData
	);
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();

	const { hash, state } = useLocation();

	const { push } = useHistory();

	if (!state?.fromVerify) {
		push("/direct_entry_login");
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

	// const { data: programmes, isLoading: loadingProgrammes } = useApiGet(
	// 	getSchoolProgrammesUrl(),
	// 	{
	// 		refetchOnWindowFocus: false
	// 	}
	// );

	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getFacultiesUrl(directEntryData?.StudentTypeId?.value),
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
		getDepartmentsUrl(directEntryData?.StudentTypeId?.value),
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

	const allStatuses = formatSelectItems(stauses?.data, "name", "id");
	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	// const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
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
				linkName: "Institutions Attended",
				hashName: "#section_b",
				state
			},
			{
				linkName: "O-Level Result",
				hashName: "#section_c",
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
				type: DIRECT_ENTRY,
				payload: {
					...directEntryData,
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
		// loadingProgrammes ||
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
		loadingCountries
	)
		return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div className={styles.container} ref={ref}>
			<div className="row mb-3 mx-5">
				<div className="col-12 col-md-2 col-lg-2 d-flex align-items-end">
					<Avatar
						name={`${basicInformation?.Firstname} ${basicInformation?.Surname}`}
						className={styles.profile_img}
						src={passport?.passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<div className="">
						<PageTitle
							title={`${basicInformation?.Firstname} ${basicInformation?.Surname}`}
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
						// allProgrammes={allProgrammes}
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
						allCountries={allCountries}
					/>
				</div>
			</div>
		</div>
	);
};

export default DirectEntryApplication;

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
		allCountries
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
						allCountries={allCountries}
					/>
				);
			case "#section_b":
				return <InstitutionAttended oLevelType={allExamTypes} />;
			case "#section_c":
				return (
					<OlevelResult
						oLevelGrades={allOlevelGrades}
						oLevelSubjects={allOlevelSubjects}
						examYears={allExamYears}
						oLevelType={allExamTypes}
					/>
				);

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
						allCountries={allCountries}
					/>
				);
		}
	}
);
