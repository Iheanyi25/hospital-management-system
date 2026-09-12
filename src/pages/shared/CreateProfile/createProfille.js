import { memo, useEffect, useMemo, useRef, useState } from "react";
import Modal from "react-modal";
import {
	PageTitle,
	Button,
	SideTabs,
	CenteredDialog,
	Spinner
} from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation, useHistory } from "react-router";
import {
	PersonalInformation,
	SponsorInformation,
	NextOfKinInformation,
	ProgrammeDetails,
	MedicalHistory
} from "./components";
import { parent } from "../../../ui_elements/layout/layout";
import { useApiGet, useApiPost } from "../../../api/apiCall";
import {
	getAllCountriesUrl,
	getAllSessionsUrl,
	getBloodGroupsUrl,
	getGendersUrl,
	getGenoTypesUrl,
	getRelationshipsUrl,
	getReligionsUrl,
	getSchoolProgrammesUrl,
	getSponsorRelationshipsUrl,
	getStudentModesOfStudyUrl,
	getStudentModesUrl,
	createStudentProfileUrl,
	yearOfStudyUrl,
	getStudentCategoryUrl,
	getStudentModeOfEntryUrl
} from "../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_STUDENT_DATA } from "../../../store/constant";
import formatImageToBase64 from "../../../utils/formatImage";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";

Modal.setAppElement("#root");
const CreateProfile = () => {
	const studentState = useSelector((state) => state.studentData);
	const {
		PersonalData,
		ProgrammeDetail,
		Sponsor,
		NextOfKin,
		StudentPassport,
		MedicalRecords,
		isPassportValid,
		isPersonalDataValid,
		isProgrammeDetailValid,
		isSponsorValid,
		isNextOfKinValid
	} = studentState;
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();

	const [open, setOpen] = useState(false);
	const { hash, state } = useLocation();
	const { push } = useHistory();
	const { mutate, isLoading: isSubmitting } = useApiPost();
	if (!state?.fromVerify) push("/verify_account");

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
	const {
		data: sponsorRelationships,
		isLoading: isLoadingSponsorRelationships,
		error: sponsorRelationshipsError
	} = useApiGet(getSponsorRelationshipsUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: countries,
		isLoadingCountries,
		countryError
	} = useApiGet(getAllCountriesUrl(), {
		refetchOnWindowFocus: false
	});
	const { data: genders, isLoading: isLoadingGenders } = useApiGet(
		getGendersUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
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

	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: ProgrammeDetail?.StudentTypeId.value }),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: sessions, isLoading: isLoadingSessions } = useApiGet(
		getAllSessionsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: studentModes, isLoading: isLoadingStudentModes } = useApiGet(
		getStudentModesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: studentModesOfEntry, isLoading: isLoadingStudentModesOfEntry } = useApiGet(
		getStudentModeOfEntryUrl(),
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
	const { data: studentCategory, isLoading: isLoadingCategories } = useApiGet(
		getStudentCategoryUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: programmes, isLoading: loadingProgrammes } = useApiGet(
		getSchoolProgrammesUrl({
			studentTypeId: ProgrammeDetail?.StudentTypeId?.value
		}),
		{
			refetchOnWindowFocus: false
		}
	);
	const allCountries = formatSelectItems(countries?.data, "name", "id");
	const allRelationships = formatSelectItems(
		relationships?.data,
		"name",
		"id"
	);
	const allSponsorRelationships = formatSelectItems(
		sponsorRelationships?.data,
		"name",
		"id"
	);
	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const allBloodGroups = formatSelectItems(bloodGroups?.data, "name", "id");
	const allGenotypes = formatSelectItems(genotypes?.data, "name", "id");
	const allReligions = formatSelectItems(religions?.data, "name", "id");
	const allLevels = formatSelectItems(levels?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allStudentModes = formatSelectItems(studentModes?.data, "name", "id");
		const allStudentModesOfEntry = formatSelectItems(studentModesOfEntry?.data, "name", "id");
	const allStudentModesOfStudy = formatSelectItems(
		studentModesOfStudy?.data,
		"name",
		"id"
	);
	const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
	const allStudentCategory = useMemo(
		() => formatSelectItems(studentCategory?.data, "name", "id"),
		[studentCategory]
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
			{
				linkName: `Medical History`,
				hashName: "#section_e",
				state
			}
		],
		[state]
	);

	const formatProgramDetails = (object) => {
		const data = {};
		for (const property in object) {
			if (typeof object[property] === "object")
				data[property] = object[property]?.value ?? null;
			else data[property] = object[property];
		}
		return data;
	};

	const submitForm = () => {
		if (
			!isPersonalDataValid ||
			!isProgrammeDetailValid ||
			!isSponsorValid ||
			!isNextOfKinValid ||
			!isPassportValid
		) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body: "Please, use the next button below the form to make sure all your details are captured"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
			setOpen(false);
			push({ hash: "#section_a", state });
		} else {
			const data = {
				StudentPersonalData: {
					Lastname: PersonalData?.Surname?.toUpperCase(),
					Firstname: PersonalData?.Firstname?.toUpperCase(),
					Middlename: PersonalData?.Middlename?.toUpperCase() ?? "",
					GenderId: PersonalData?.Gender?.value,
					DateOfBirth: PersonalData?.DateOfBirth,
					CountryId: PersonalData?.CountryId?.value,
					StateId: PersonalData?.StateId?.value,
					CategoryId: PersonalData?.CategoryId.value,
					LgaId: PersonalData?.LgaId
						? PersonalData?.LgaId.value
						: null,
					ReligionId: PersonalData?.Religion?.value,
					MobileNumber: PersonalData?.MobileNo,
					Email: PersonalData?.Email?.toUpperCase(),
					ContactAddress: PersonalData?.ContactAddress?.toUpperCase(),
					HomeTown: PersonalData?.HomeTown?.toUpperCase(),
					PermanentAddress:
						PersonalData?.PermanentAddress?.toUpperCase(),
					BloodGroupId: PersonalData?.BloodGroup?.value,
					GenoTypeId: PersonalData?.GenoType?.value,
					MedicalRecords
				},
				StudentProgramme: formatProgramDetails(ProgrammeDetail),
				StudentSponsor: {
					Fullname: Sponsor?.Fullname?.toUpperCase(),
					Address: Sponsor?.Address?.toUpperCase(),
					MobileNumber: Sponsor?.PhoneNo,
					RelationshipId: Sponsor?.Relationship?.value,
					Email: Sponsor?.Email?.toUpperCase()
				},
				StudentNextOfKin: {
					Fullname: NextOfKin?.Fullname?.toUpperCase(),
					Address: NextOfKin?.Address?.toUpperCase(),
					MobileNumber: NextOfKin?.PhoneNo,
					RelationshipId: NextOfKin?.Relationship?.value,
					Email: NextOfKin?.Email?.toUpperCase()
				},
				StudentPassport
			};
			const requestBody = {
				url: createStudentProfileUrl(),
				data
			};
			mutate(requestBody, {
				onSuccess: () => {
					setOpen(false);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Successful!",
						body: "You have successfully created your account"
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
					push(`/verify_confirmation`);
					dispatch({
						type: SAVE_STUDENT_DATA,
						payload: {}
					});
				},
				onError: (error) => {
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Account creation failed!",
						body:
							error?.response?.data?.message ||
							`Something went wrong with this action. Check your forms and submit again`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		}
	};
	const uploadImage = async (images) => {
		if (
			checkIfFilesAreTooBig(images) &&
			checkIfImagesAreCorrectType(images)
		) {
			dispatch({
				type: SAVE_STUDENT_DATA,
				payload: {
					...studentState,
					StudentPassport: {
						Passport: await formatImageToBase64(images[0])
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
		isLoadingCountries ||
		loadingBloodGroups ||
		loadingGenotypes ||
		loadingReligions ||
		isLoadingGenders ||
		isLoadingSponsorRelationships ||
		isLoadingLevels ||
		isLoadingSessions ||
		isLoadingStudentModes ||
		isLoadingStudentModesOfStudy ||
		loadingProgrammes ||
		isLoadingCategories  ||
		isLoadingStudentModesOfEntry
	)
		return (
			<div
				style={{ height: "100vh" }}
				className="d-flex justify-content-center align-items-center"
			>
				<Spinner />
			</div>
		);
	if (error || countryError || sponsorRelationshipsError)
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
							label="Submit"
							buttonClass={`primary`}
							onClick={submitForm}
							loading={isSubmitting}
						/>
					</>
				}
			>
				<p className="mb-4">
					I certify that the information given in this form is, to the
					best of my knowledge and belief, correct and complete
				</p>
			</CenteredDialog>
			<div className="row mb-5 mx-0">
				<PageTitle title="Set up your Profile and Submit to Verify your Account " />
			</div>
			<div className="row mb-3 mx-5">
				<div className="col-12 col-md-2 col-lg-2">
					<Avatar
						name={`${PersonalData?.Surname} ${PersonalData?.Firstname}`}
						className={styles.profile_img}
						src={StudentPassport?.Passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10 py-4">
					<PageTitle
						title={`${PersonalData?.Surname} ${
							PersonalData?.Firstname
						} ${PersonalData?.Middlename ?? ""}`}
					/>
				</div>
			</div>
			<div className="row mx-5">
				<div className="col-12 col-md-2 col-lg-2">
					<div className="">
						<Button
							data-cy="upload"
							buttonClass="standard"
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
						allSponsorRelationships={allSponsorRelationships}
						allCountries={allCountries}
						allBloodGroups={allBloodGroups}
						allGenotypes={allGenotypes}
						allReligions={allReligions}
						allGenders={allGenders}
						allLevels={allLevels}
						allSessions={allSessions}
						allStudentModes={allStudentModes}
						allStudentModesOfStudy={allStudentModesOfStudy}
						allProgrammes={allProgrammes}
						setOpen={setOpen}
						allStudentCategory={allStudentCategory}
						allStudentModesOfEntry={allStudentModesOfEntry}
					/>
				</div>
			</div>
		</div>
	);
};

const DisplayInformation = memo(
	({
		allRelationships,
		allCountries,
		allBloodGroups,
		allGenotypes,
		allReligions,
		allGenders,
		allSponsorRelationships,
		allLevels,
		allSessions,
		allStudentModes,
		allStudentModesOfStudy,
		allProgrammes,
		setOpen,
		allStudentCategory,
		allStudentModesOfEntry
	}) => {
		const location = useLocation();
		switch (location.hash) {
			case "#section_a":
				return (
					<PersonalInformation
						allCountries={allCountries}
						allGenders={allGenders}
						allBloodGroups={allBloodGroups}
						allGenotypes={allGenotypes}
						allReligions={allReligions}
						allStudentCategory={allStudentCategory}
					/>
				);
			case "#section_b":
				return (
					<SponsorInformation
						allSponsorRelationships={allSponsorRelationships}
					/>
				);
			case "#section_c":
				return (
					<NextOfKinInformation relationships={allRelationships} />
				);
			case "#section_d":
				return (
					<ProgrammeDetails
						allLevels={allLevels}
						allSessions={allSessions}
						allStudentModes={allStudentModes}
						allStudentModesOfStudy={allStudentModesOfStudy}
						allProgrammes={allProgrammes}
						allStudentModesOfEntry={allStudentModesOfEntry}
					/>
				);
			case "#section_e":
				return <MedicalHistory setOpen={setOpen} />;
			default:
				return (
					<PersonalInformation
						allCountries={allCountries}
						allGenders={allGenders}
						allBloodGroups={allBloodGroups}
						allGenotypes={allGenotypes}
						allReligions={allReligions}
					/>
				);
		}
	}
);

export default CreateProfile;
