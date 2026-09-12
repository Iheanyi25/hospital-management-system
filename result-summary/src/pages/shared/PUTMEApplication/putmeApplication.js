import { memo, useEffect, useMemo, useRef } from "react";
import { PageTitle, Button, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";

import { OlevelResult, PersonalDetails, ProgrammeDetails } from "./components";

import { parent } from "../../../ui_elements/layout/layout";

import { useApiGet } from "../../../api/apiCall";
import {
	getSchoolProgrammesUrl,
	getGendersUrl,
	getMaritalStatusesUrl,
	getOLevelExamTypesUrl,
	getOlevelGradeUrl,
	getYearsUrl,
	getAllCountriesUrl,
	getRelationshipsUrl,
	getPutmeSubjectsUrl,
	getOLevelSubjectsUrl
} from "../../../api/urls";

import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PUTME_INFO } from "../../../store/constant";
import formatImageToBase64 from "../../../utils/formatImage";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";
import { getFacultiesUrl } from "../../../api/urls";

const PUTMEApplication = () => {
	const putmeStoreData = useSelector((state) => state.putmeData);
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();

	const { hash, state } = useLocation();

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

	const { data: programmes, isLoading: loadingProgrammes } = useApiGet(
		getSchoolProgrammesUrl({
			studentTypeId: putmeStoreData?.StudentTypeId
		}),
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

	const { data: putmeSubjects, isLoading: isLoadingPutmeSubjects } =
		useApiGet(getPutmeSubjectsUrl(), {
			refetchOnWindowFocus: false
		});

	const { data: olevelSubjects, isLoading: isLoadingOlevelSubjects } =
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

	const { data: faculties, isLoading: isLoadingFaculties } = useApiGet(
		getFacultiesUrl(putmeStoreData?.StudentTypeId),
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

	const allStatuses = formatSelectItems(stauses?.data, "name", "id");
	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
	const allRelationships = formatSelectItems(
		relationships?.data,
		"name",
		"id"
	);

	const allOlevelSubjects = formatSelectItems(
		olevelSubjects?.data,
		"name",
		"id"
	);

	const allPutmeSubjects = formatSelectItems(
		putmeSubjects?.data,
		"name",
		"id"
	);

	const allFaculties = formatSelectItems(faculties?.data, "name", "id");

	const allOlevelGrades = formatSelectItems(oLevelGrades?.data, "name", "id");
	const allExamYears = examYears?.data.map((year) => ({
		value: year,
		label: year
	}));
	const allExamTypes = formatSelectItems(examTypes?.data, "name", "id");
	const allCountries = formatSelectItems(countries?.data, "name", "id");

	const navs = useMemo(
		() => [
			{
				linkName: "Personal & Sponsor Details",
				hashName: "#section_a",
				state
			},
			{
				linkName: "JAMB & Programme Details",
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
				type: SAVE_PUTME_INFO,
				payload: {
					...putmeStoreData,
					passport: {
						passport: await formatImageToBase64(images[0])
					}
				}
			});
		} else {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: !checkIfFilesAreTooBig(images)
					? "File too Large. File should be less than 1MB"
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
		isLoadingGenders ||
		isLoadingStatuses ||
		isLoadingExamTypes ||
		isLoadingPutmeSubjects ||
		isLoadingOLevelGrades ||
		isLoadingExamYears ||
		isLoadingCountries ||
		isLoadingFaculties ||
		isLoadingOlevelSubjects
	)
		return <Spinner />;
	if (error || countryError) return "An error has occurred: " + error.message;

	return (
		<div className={styles.container} ref={ref}>
			<div className="row mb-3 mx-1 mx-md-5">
				<div className="col-12 col-md-2 col-lg-2 d-flex align-items-end">
					<Avatar
						name={`${putmeStoreData?.personalInfo?.surName} ${putmeStoreData?.personalInfo?.firstName}`}
						className={styles.profile_img}
						src={putmeStoreData?.passport?.passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<div className="">
						<PageTitle
							title={`${putmeStoreData?.personalInfo?.surName}
						${putmeStoreData?.personalInfo?.firstName}`}
						/>
					</div>
				</div>
			</div>
			<div className="row mx-1 mx-md-5">
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
						allGenders={allGenders}
						allStatuses={allStatuses}
						allOlevelGrades={allOlevelGrades}
						allExamYears={allExamYears}
						allOlevelSubjects={allOlevelSubjects}
						allPutmeSubjects={allPutmeSubjects}
						allExamTypes={allExamTypes}
						allCountries={allCountries}
						allFaculties={allFaculties}
						fromJambState={state.fromJamb}
					/>
				</div>
			</div>
		</div>
	);
};

const DisplayInformation = memo(
	({
		allRelationships,
		allGenders,
		allStatuses,
		allOlevelGrades,
		allExamYears,
		allOlevelSubjects,
		allPutmeSubjects,
		allExamTypes,
		allCountries,
		allFaculties,
		fromJambState
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
					/>
				);
			case "#section_b":
				return (
					<ProgrammeDetails
						allFaculties={allFaculties}
						allPutmeSubjects={allPutmeSubjects}
						fromJambState={fromJambState}
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
			default:
				return (
					<PersonalDetails
						allGenders={allGenders}
						allStatuses={allStatuses}
						relationships={allRelationships}
						allCountries={allCountries}
					/>
				);
		}
	}
);

export default PUTMEApplication;
