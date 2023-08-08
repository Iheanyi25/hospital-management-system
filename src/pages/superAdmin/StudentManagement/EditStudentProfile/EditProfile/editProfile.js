import { memo, useEffect, useMemo, useRef, useState } from "react";
import Modal from "react-modal";
import {
	PageTitle,
	Button,
	SideTabs,
	CenteredDialog,
	Spinner
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useLocation, useHistory } from "react-router";
import dropDown from "../../../../../assets/svgs/chevron-left.svg";
import {
	PersonalInformation,
	SponsorInformation,
	NextOfKinInformation,
	ProgrammeDetails,
	MedicalHistory
} from "./components";
import { parent } from "../../../../../ui_elements/layout/layout";
import { useApiGet, useApiPost } from "../../../../../api/apiCall";
import {
	getAllCountriesUrl,
	getAllSessionsUrl,
	getBloodGroupsUrl,
	getDepartmentsUrl,
	getGendersUrl,
	getGenoTypesUrl,
	getRelationshipsUrl,
	getReligionsUrl,
	getSchoolProgrammesUrl,
	getSponsorRelationshipsUrl,
	getStudentModeOfEntryUrl,
	getStudentModesOfStudyUrl,
	getStudentModesUrl,
	getStudentProfileUrl,
	getStudentTypesUrl,
	updatePassportUrl
} from "../../../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_STUDENT_DATA } from "../../../../../store/constant";
import formatImageToBase64 from "../../../../../utils/formatImage";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../../../utils/FileValidation";

Modal.setAppElement("#root");

const EditProfile = () => {
	const {
		PersonalData,
		ProgrammeDetail,
		Sponsor,
		NextOfKin,
		Passport,
		MedicalRecords,
		isPassportValid,
		isPersonalDataValid,
		isProgrammeDetailValid,
		isSponsorValid,
		isNextOfKinValid
	} = useSelector((state) => state.studentData);
	const dispatch = useDispatch();
	const ref = useRef();
	const pictureRef = useRef();
	const updatePassport = useApiPost();
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	const [open, setOpen] = useState(false);
	const { hash, state } = useLocation();
	const { push } = useHistory();
	const { mutate, isLoading: isSubmitting } = useApiPost();
	if (!state?.refCode) {
		push("/student_management/view");
	}
	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);

	const { data, isLoading, error } = useApiGet(
		getStudentProfileUrl({ refCode: state?.refCode }),
		{
			refetchOnWindowFocus: false
		}
	);
	const {
		data: countries,
		isLoading: isLoadingCountries,
		error: countryError
	} = useApiGet(getAllCountriesUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: relationships,
		isLoading: isLoadingRelationships,
		error: relationshipError
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
	const { data: genders, isLoading: isLoadingGenders } = useApiGet(
		getGendersUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	// Program details endpoints
	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(
		getDepartmentsUrl(data?.data?.studentProgrammeDetail?.studentTypeId),
		{
			refetchOnWindowFocus: false,
			enabled: !!data?.data?.studentProgrammeDetail?.studentTypeId
		}
	);
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: programmes, isLoading: loadingProgrammes } = useApiGet(
		getSchoolProgrammesUrl({
			studentTypeId: data?.data?.studentProgrammeDetail?.studentTypeId
		}),
		{
			refetchOnWindowFocus: false,
			enabled: !!data?.data?.studentProgrammeDetail?.studentTypeId
		}
	);
	const {
		data: studentModesOfEntry,
		isLoading: isLoadingStudentModesOfEntry
	} = useApiGet(getStudentModeOfEntryUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: studentModesOfStudy,
		isLoading: isLoadingStudentModesOfStudy
	} = useApiGet(getStudentModesOfStudyUrl(), {
		refetchOnWindowFocus: false
	});

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
	const allBloodGroups = formatSelectItems(bloodGroups?.data, "name", "id");
	const allGenotypes = formatSelectItems(genotypes?.data, "name", "id");
	const allReligions = formatSelectItems(religions?.data, "name", "id");
	const allGenders = formatSelectItems(genders?.data, "name", "id");

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
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allStudentModesOfEntry = formatSelectItems(
		studentModesOfEntry?.data,
		"name",
		"id"
	);
	const allStudentModesOfStudy = formatSelectItems(
		studentModesOfStudy?.data,
		"name",
		"id"
	);
	const allProgrammes = formatSelectItems(programmes?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allStudentModes = formatSelectItems(studentModes?.data, "name", "id");
	const allCountries = formatSelectItems(countries?.data, "name", "id");
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
				data[property] = object[property].value;
			else data[property] = object[property];
		}
		return data;
	};

	const uploadImage = async (images) => {
		if (
			checkIfFilesAreTooBig(images) &&
			checkIfImagesAreCorrectType(images)
		) {
			setLoading(true);
			const requestBody = {
				url: updatePassportUrl(state?.refCode),
				data: {
					passport: await formatImageToBase64(images[0]),
				}
			};
			updatePassport.mutate(requestBody, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getStudentProfileUrl({ refCode: state?.refCode })
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Success!",
						body: "Image uploaded sucessfully"
					});
					setLoading(false);
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: () => {
					setLoading(false);
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Failed!",
						body: "Something went wrong"
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
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
				PersonalData: {
					Surname: PersonalData.Surname.toUpperCase(),
					Firstname: PersonalData.Firstname.toUpperCase(),
					Middlename: PersonalData.Middlename.toUpperCase(),
					Gender: PersonalData.Gender,
					DateOfBirth: PersonalData.DateOfBirth,
					Country: PersonalData.Country.label.toUpperCase(),
					State: PersonalData.State.label.toUpperCase(),
					Lga: PersonalData.Lga
						? PersonalData.Lga.label.toUpperCase()
						: null,
					Religion: PersonalData.Religion.value,
					MobileNo: PersonalData.MobileNo,
					Email: PersonalData.Email.toUpperCase(),
					ContactAddress: PersonalData.ContactAddress.toUpperCase(),
					HomeTown: PersonalData.HomeTown.toUpperCase(),
					PermanentAddress:
						PersonalData.PermanentAddress.toUpperCase(),
					BloodGroup: PersonalData.BloodGroup.value,
					GenoType: PersonalData.GenoType.value
				},
				ProgrammeDetail: formatProgramDetails(ProgrammeDetail),
				Sponsor: {
					Fullname: Sponsor.Fullname.toUpperCase(),
					Address: Sponsor.Address.toUpperCase(),
					PhoneNo: Sponsor.PhoneNo,
					Relationship: Sponsor.Relationship.value,
					Email: Sponsor.Email.toUpperCase()
				},
				NextOfKin: {
					Fullname: NextOfKin.Fullname.toUpperCase(),
					Address: NextOfKin.Address.toUpperCase(),
					PhoneNo: NextOfKin.PhoneNo,
					Relationship: NextOfKin.Relationship.value,
					Email: NextOfKin.Email.toUpperCase()
				},
				MedicalRecords,
				Passport
			};
			const requestBody = {
				url: getStudentProfileUrl(),
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
					setOpen(false);
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
	if (
		isLoading ||
		isLoadingRelationships ||
		isDepartmentLoading ||
		isLoadingStudentTypes ||
		loadingProgrammes ||
		isLoadingStudentModesOfEntry ||
		isLoadingStudentModesOfStudy ||
		loadingBloodGroups ||
		loadingGenotypes ||
		loadingReligions ||
		isLoadingSessions ||
		isLoadingStudentModes ||
		isLoadingCountries ||
		isLoadingGenders ||
		isLoadingSponsorRelationships
	)
		return <Spinner />;
	if (
		error ||
		relationshipError ||
		departmentError ||
		countryError ||
		sponsorRelationshipsError
	)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div ref={ref}>
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
			<div style={{ width: "fit-content" }}>
				<Link
					className={`mb-3 mx-5 d-flex align-items-center ${styles.back_link}`}
					to="/student_management/view"
				>
					<img src={dropDown} alt={""} />
					<span>Back to Search</span>
				</Link>
			</div>
			<div className="row mb-3 mx-5">
				<div className="col-12 col-md-2 col-lg-2">
					{loading ? (
						<Spinner width={100} />
					) : (
						<Avatar
							name={`${data?.data?.studentPersonalData?.lastname} ${data?.data?.studentPersonalData?.firstname}`}
							className={styles.profile_img}
							src={data?.data?.studentPersonalData?.passport}
							size={100}
							round={true}
							maxInitials={2}
						/>
					)}
				</div>
				<div className="col-12 col-md-10 col-lg-10 py-4">
					<PageTitle
						title={`${data?.data?.studentPersonalData?.lastname} ${
							data?.data?.studentPersonalData?.firstname
						} ${data?.data?.studentPersonalData?.middlename ?? ""}`}
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
							customClass={styles.upload_button}
							onClick={() => pictureRef?.current?.click()}
						/>
						<input
							type="file"
							ref={pictureRef}
							className={styles.input}
							accept="image/png, image/jpg, image/jpeg"
							onChange={(e) => uploadImage(e.target.files)}
						/>
					</div>
					<div className={styles.key_comes_tabs}>
						<div className={styles.key_comes_sticky}>
							<SideTabs navItems={navs} />
						</div>
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<DisplayInformation
						allDepartments={allDepartments}
						allStudentTypes={allStudentTypes}
						allProgrammes={allProgrammes}
						allStudentModesOfEntry={allStudentModesOfEntry}
						allStudentModesOfStudy={allStudentModesOfStudy}
						allRelationships={allRelationships}
						allSponsorRelationships={allSponsorRelationships}
						allBloodGroups={allBloodGroups}
						allGenotypes={allGenotypes}
						allReligions={allReligions}
						allSessions={allSessions}
						allStudentModes={allStudentModes}
						allCountries={allCountries}
						allGenders={allGenders}
						setOpen={setOpen}
						data={data?.data}
						refCode={state?.refCode}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;

const DisplayInformation = memo(
	({
		data,
		allDepartments,
		allStudentTypes,
		allProgrammes,
		allStudentModesOfEntry,
		allStudentModesOfStudy,
		allRelationships,
		allSponsorRelationships,
		allBloodGroups,
		allGenotypes,
		allReligions,
		allSessions,
		allStudentModes,
		allCountries,
		allGenders,
		setOpen,
		refCode
	}) => {
		const location = useLocation();
		switch (location.hash) {
			case "#section_a":
				return (
					<PersonalInformation
						data={data?.studentPersonalData}
						allBloodGroups={allBloodGroups}
						allGenotypes={allGenotypes}
						allReligions={allReligions}
						allCountries={allCountries}
						allGenders={allGenders}
						refCode={refCode}
					/>
				);
			case "#section_b":
				return (
					<SponsorInformation
						data={data?.studentSponsor}
						allSponsorRelationships={allSponsorRelationships}
						refCode={refCode}
					/>
				);
			case "#section_c":
				return (
					<NextOfKinInformation
						data={data?.studentNextOfKin}
						relationships={allRelationships}
						refCode={refCode}
					/>
				);
			case "#section_d":
				return (
					<ProgrammeDetails
						allDepartments={allDepartments}
						allStudentTypes={allStudentTypes}
						allProgrammes={allProgrammes}
						allStudentModesOfStudy={allStudentModesOfStudy}
						allStudentModesOfEntry={allStudentModesOfEntry}
						allSessions={allSessions}
						allStudentModes={allStudentModes}
						refCode={refCode}
						data={data?.studentProgrammeDetail}
					/>
				);
			case "#section_e":
				return (
					<MedicalHistory
						data={data?.studentPersonalData?.medicalRecords}
						setOpen={setOpen}
						refCode={refCode}
					/>
				);
			default:
				return (
					<PersonalInformation
						data={data?.studentPersonalData}
						allBloodGroups={allBloodGroups}
						allGenotypes={allGenotypes}
						allReligions={allReligions}
						allCountries={allCountries}
						allGenders={allGenders}
						refCode={refCode}
					/>
				);
		}
	}
);
