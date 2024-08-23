import { memo, useEffect, useMemo, useRef } from "react";
import { PageTitle, Button, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";

import { OlevelResult, PersonalDetails, ProgrammeDetails } from "./components";

import { parent } from "../../../ui_elements/layout/layout";

import { useApiGet } from "../../../api/apiCall";
import {
	getGendersUrl,
	getOLevelExamTypesUrl,
	getOlevelGradeUrl,
	getYearsUrl,
	getDepartmentsUrl,
	getAllCountriesUrl,
	getOLevelSubjectsUrl,
	getJambSubjectsUrl
} from "../../../api/urls";

import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";
import { useDispatch, useSelector } from "react-redux";
import { SUPPLEMENTARY_PUTME } from "../../../store/constant";
import formatImageToBase64 from "../../../utils/formatImage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SupplementaryPutmeApplication = () => {
	const supplementaryPutmeData = useSelector(
		(state) => state.supplementaryPutmeData
	);
	const { passport, personalInfoResponse } = useSelector(
		(state) => state.supplementaryPutmeData
	);
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();

	const { hash, state } = useLocation();

	const { push } = useHistory();

	if (!state?.fromVerify) {
		push("/supplementary_putme_login");
	}

	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);

	const { data: departments, isLoading: isLoadingDepartments } = useApiGet(
		getDepartmentsUrl(supplementaryPutmeData?.StudentTypeId?.value),
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

	const { data: jambSubjects, isLoading: isLoadingJambSubjects } = useApiGet(
		getJambSubjectsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

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

	const { data: countries, isLoading: loadingCountries } = useApiGet(
		getAllCountriesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const allCountries = formatSelectItems(countries?.data, "name", "id");

	const allGenders = formatSelectItems(genders?.data, "name", "id");

	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);

	const allOlevelSubjects = formatSelectItems(
		oLevelSubjects?.data,
		"name",
		"id"
	);
	const allJambSubjects = formatSelectItems(jambSubjects?.data, "name", "id");
	const allOlevelGrades = formatSelectItems(oLevelGrades?.data, "name", "id");
	const allExamYears = examYears?.data.map((year) => ({
		value: year,
		label: year
	}));
	const allExamTypes = formatSelectItems(examTypes?.data, "name", "id");

	const navs = useMemo(
		() => [
			{
				linkName: "Personal",
				hashName: "#section_a",
				state
			},
			{
				linkName: "Programme Details",
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
				type: SUPPLEMENTARY_PUTME,
				payload: {
					...supplementaryPutmeData,
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
					? "File too Large. File should be less than 1MB"
					: "Invalid file type. Try again"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	};

	if (
		isLoadingGenders ||
		isLoadingExamTypes ||
		isLoadingOLevelSubjects ||
		isLoadingOLevelGrades ||
		isLoadingExamYears ||
		isLoadingDepartments ||
		loadingCountries ||
		isLoadingJambSubjects
	)
		return <Spinner />;

	return (
		<div className={styles.container} ref={ref}>
			<div className="row mb-3 mx-5">
				<div className="col-12 col-md-2 col-lg-2 d-flex align-items-end">
					<Avatar
						name={`${personalInfoResponse?.Firstname} ${personalInfoResponse?.Surname}`}
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
							title={`${personalInfoResponse?.Firstname} ${personalInfoResponse?.Surname}`}
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
						allGenders={allGenders}
						allOlevelGrades={allOlevelGrades}
						allExamYears={allExamYears}
						allOlevelSubjects={allOlevelSubjects}
						allJambSubjects={allJambSubjects}
						allExamTypes={allExamTypes}
						allDepartments={allDepartments}
						allCountries={allCountries}
					/>
				</div>
			</div>
		</div>
	);
};

export default SupplementaryPutmeApplication;

const DisplayInformation = memo(
	({
		allDepartments,
		allGenders,
		allOlevelGrades,
		allExamYears,
		allOlevelSubjects,
		allExamTypes,
		allCountries,
		allJambSubjects
	}) => {
		const location = useLocation();
		switch (location.hash) {
			case "#section_a":
				return (
					<PersonalDetails
						allGenders={allGenders}
						allCountries={allCountries}
					/>
				);
			case "#section_b":
				return (
					<ProgrammeDetails
						allDepartments={allDepartments}
						allJambSubjects={allJambSubjects}
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
						allCountries={allCountries}
					/>
				);
		}
	}
);
