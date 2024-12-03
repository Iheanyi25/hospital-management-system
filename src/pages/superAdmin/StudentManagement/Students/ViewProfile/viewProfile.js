import { memo, useEffect, useMemo, useRef, useState } from "react";
import Modal from "react-modal";
import {
	PageTitle,
	Button,
	SideTabs,
	Spinner,
	ToggleElement
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
import { useApiGet, useApiPost, useApiPut } from "../../../../../api/apiCall";
import {
	getAllCountriesUrl,
	getAllDepartmentsWithoutValuesUrl,
	getAllSessionsUrl,
	getBloodGroupsUrl,
	getGendersUrl,
	getGenoTypesUrl,
	getProgrammeTypesUrl,
	getRelationshipsUrl,
	getReligionsUrl,
	getSponsorRelationshipsUrl,
	getStudentModesOfStudyUrl,
	getStudentModesUrl,
	getStudentProfileUrl,
	getStudentTypesUrl,
	updatePassportUrl,
	updateStudentStaffStatusUrl
} from "../../../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import formatImageToBase64 from "../../../../../utils/formatImage";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../../../utils/FileValidation";

Modal.setAppElement("#root");

const EditProfile = () => {
	const ref = useRef();
	const pictureRef = useRef();
	const updatePassport = useApiPost();
	const updateStatus = useApiPut();
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const { hash, state } = useLocation();
	const { goBack } = useHistory();
	if (!state?.refCode) {
		goBack();
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

	console.log("WAHAHAHA", data?.data);
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
	} = useApiGet(getAllDepartmentsWithoutValuesUrl(), {
		refetchOnWindowFocus: false
	});

	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		data: programmeTypes,
		isLoading: isLoadingProgrammeTypes,
		error: programmeTypesError
	} = useApiGet(getProgrammeTypesUrl(), {
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
	const allProgrammeTypes = formatSelectItems(
		programmeTypes?.data,
		"name",
		"id"
	);
	const allSponsorRelationships = formatSelectItems(
		sponsorRelationships?.data,
		"name",
		"id"
	);
	const allDepartments = formatSelectItems(departments?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allStudentModesOfStudy = formatSelectItems(
		studentModesOfStudy?.data,
		"name",
		"id"
	);
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

	const uploadImage = async (images) => {
		if (
			checkIfFilesAreTooBig(images) &&
			checkIfImagesAreCorrectType(images)
		) {
			setLoading(true);
			const requestBody = {
				url: updatePassportUrl(state?.refCode),
				data: {
					Passport: await formatImageToBase64(images[0])
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

	const toggleStaffStatus = (userId) => {
		const requestBody = {
			url: updateStudentStaffStatusUrl(userId)
		};
		updateStatus.mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getStudentProfileUrl({ refCode: state?.refCode })
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your student profile details have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body:
						response?.data?.message ||
						`Something went wrong with this action. Check your forms and submit again`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	if (
		isLoading ||
		isLoadingRelationships ||
		isDepartmentLoading ||
		isLoadingStudentTypes ||
		isLoadingStudentModesOfStudy ||
		loadingBloodGroups ||
		loadingGenotypes ||
		loadingReligions ||
		isLoadingSessions ||
		isLoadingStudentModes ||
		isLoadingCountries ||
		isLoadingGenders ||
		isLoadingProgrammeTypes ||
		isLoadingSponsorRelationships
	)
		return <Spinner />;
	if (
		error ||
		relationshipError ||
		departmentError ||
		countryError ||
		sponsorRelationshipsError ||
		programmeTypesError
	)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div ref={ref}>
			<div style={{ width: "fit-content" }}>
				<Link
					className={`mb-3 mx-5 d-flex align-items-center ${styles.back_link}`}
					to={
						state?.fromUserManagement
							? "/user_management/users/edit"
							: "/student_management/view"
					}
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
							name={`${data?.data?.personalData?.surname} ${data?.data?.personalData?.firstname}`}
							className={styles.profile_img}
							src={data?.data?.personalData?.passport}
							size={100}
							round={true}
							maxInitials={2}
						/>
					)}
				</div>
				<div className="col-12 col-md-10 col-lg-10 py-4 d-flex align-items-center justify-content-between">
					<PageTitle
						title={`${data?.data?.personalData?.lastname} ${
							data?.data?.personalData?.firstname
						} ${data?.data?.personalData?.middlename ?? ""}`}
					/>
					<div>
						<ToggleElement
							id={`toggle-staff`}
							checked={data?.data?.personalData?.isStaff}
							onChange={() =>
								toggleStaffStatus(
									data?.data?.personalData?.userId
								)
							}
							label={
								data?.data?.personalData?.isStaff
									? "Staff"
									: "Not a staff"
							}
							isDisabled={updateStatus.isLoading}
						/>
					</div>
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
						allProgrammeTypes={allProgrammeTypes}
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
		allProgrammeTypes,
		refCode
	}) => {
		const location = useLocation();
		switch (location.hash) {
			case "#section_a":
				return (
					<PersonalInformation
						data={data?.personalData}
						programmeData={data?.programmeDetail}
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
						data={data?.sponsor}
						allSponsorRelationships={allSponsorRelationships}
						refCode={refCode}
					/>
				);
			case "#section_c":
				return (
					<NextOfKinInformation
						data={data?.nextOfKin}
						relationships={allRelationships}
						refCode={refCode}
					/>
				);
			case "#section_d":
				return (
					<ProgrammeDetails
						allDepartments={allDepartments}
						allStudentTypes={allStudentTypes}
						allStudentModesOfStudy={allStudentModesOfStudy}
						allSessions={allSessions}
						allStudentModes={allStudentModes}
						allProgrammeTypes={allProgrammeTypes}
						refCode={refCode}
						data={data?.programmeDetail}
						hasMatricNumber={data?.hasMatricNumber}
					/>
				);
			case "#section_e":
				return (
					<MedicalHistory
						data={data?.medicalRecords || []}
						refCode={refCode}
					/>
				);
			default:
				return (
					<PersonalInformation
						data={data?.personalData}
						programmeData={data?.programmeDetail}
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
