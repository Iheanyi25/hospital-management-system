import { memo, useEffect, useMemo, useRef } from "react";
import {
	PageTitle,
	Button,
	SideTabs,
	Spinner,
	BlueContainer,
	sharedParent
} from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";
import {
	EducationalRecords,
	EmploymentHistory,
	PersonalDetails,
	ProgrammeInfo,
	ResearchDetails
} from "./components";
import { useApiGet } from "../../../api/apiCall";
import {
	getFacultiesUrl,
	getRelationshipsUrl,
	getGendersUrl,
	getMaritalStatusesUrl,
	getYearsUrl,
	getAllCountriesUrl,
	getReligionsUrl,
	getPGProgrammesUrl
} from "../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PG_INFO } from "../../../store/constant";
import formatImageToBase64 from "../../../utils/formatImage";
import { useHistory } from "react-router-dom";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";

const PGApplication = () => {
	const pgState = useSelector((state) => state.pgData);
	const { programme, basicInformation, studentTypeId } = pgState;
	const { push } = useHistory();
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();

	const { hash, state } = useLocation();
	if (!state?.fromPGLogin) push("/pg_login");

	useEffect(() => {
		sharedParent.current?.scrollTo(0, 0);
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
		getFacultiesUrl(studentTypeId),
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
	const allCountries = formatSelectItems(countries?.data, "name", "id");
	const navs = useMemo(
		() => [
			{
				linkName: "Program Info",
				hashName: "#section_a",
				state
			},
			{
				linkName: "Personal Details",
				hashName: "#section_b",
				state
			},
			{
				linkName: "Educational Records",
				hashName: "#section_c",
				state
			},
			{
				linkName: "Employment History",
				hashName: "#section_d",
				state
			},
			{
				linkName: "Research / Other Details",
				hashName: "#section_e",
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
				type: SAVE_PG_INFO,
				payload: {
					...pgState,
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
		loadingReligions
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
				<div className="col-12 col-md-10 col-lg-10 pb-4">
					<div className="mb-3">
						<PageTitle title="Post Graduate Application Form" />
					</div>
					<BlueContainer
						items={[
							{
								title: "Full Name",
								content: `${basicInformation?.lastname} ${basicInformation?.firstname} ${basicInformation?.middlename}`
							},
							{
								title: "Mobile Number",
								content: basicInformation?.mobileNumber
							},
							{
								title: "Reference Number",
								content: programme?.rrr
							}
						]}
					/>
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
		allProgrammes,
		allFaculties,
		allGenders,
		allStatuses,
		allYears,
		allReligions,
		allCountries
	}) => {
		const location = useLocation();
		switch (location.hash) {
			case "#section_a":
				return (
					<ProgrammeInfo
						allDepartments={allDepartments}
						allProgrammes={allProgrammes}
						allFaculties={allFaculties}
					/>
				);
			case "#section_b":
				return (
					<PersonalDetails
						allGenders={allGenders}
						allStatuses={allStatuses}
						relationships={allRelationships}
						allCountries={allCountries}
						allReligions={allReligions}
					/>
				);
			case "#section_c":
				return <EducationalRecords />;
			case "#section_d":
				return <EmploymentHistory />;
			case "#section_e":
				return <ResearchDetails allYears={allYears} />;
			default:
				return (
					<ProgrammeInfo
						allDepartments={allDepartments}
						allProgrammes={allProgrammes}
						allFaculties={allFaculties}
					/>
				);
		}
	}
);

export default PGApplication;
