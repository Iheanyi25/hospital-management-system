import React, { useEffect, useRef, useState } from "react";
import { Button, PageTitle, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";
import {
	AppointmentDetails,
	NextOfKinInformation,
	PersonalInformation,
	Qualification,
	Signature,
	PaymentDetails,
	Housing
} from "./components";
import { parent } from "../../../ui_elements/layout/layout";
import { useApiGet, useApiPost } from "../../../api/apiCall";
import {
	getAccomodationTypeUrl,
	getAllCountriesUrl,
	getBanksUrl,
	getBloodGroupsUrl,
	getCampusLocationUrl,
	getDesignationsUrl,
	getEmploymentStatusUrl,
	getFacultiesUrl,
	getGenoTypesUrl,
	getMaritalStatusesUrl,
	getPensionFundsUrl,
	getRelationshipsUrl,
	getReligionsUrl,
	getSalaryGradeUrl,
	getSalaryStepUrl,
	getSalaryStructureUrl,
	getSponsorRelationshipsUrl,
	getStaffTypesUrl,
	getTitlesUrl,
	getUserProfileUrl,
	updatePassportUrl,
} from "../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useQueryClient } from "react-query";
import formatImageToBase64 from "../../../utils/formatImage";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../utils/FileValidation";
import ProfilePrintOut from "./ProfilePrintOut";
import { useReactToPrint } from "react-to-print";
import { trimItem } from "../../../utils/trimItem";

const pageStyle = `
  @page {
    // size: 80mm 50mm;
    margin-top: 10rem;
    margin-left: 3rem;
  }

  // @media all {
  //   .pagebreak {
  //     display: none;
  //   }
  // }

  @media print {
    .pagebreak {
      // page-break-before: always;

    }
  }
`;

const StaffProfile = () => {
	const ref = useRef();
	const updatePassport = useApiPost();
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	// const loading = false;
	const { hash } = useLocation();

	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});

	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);
	const navs = [
		{
			linkName: "Personal Information",
			hashName: "#section_a"
		},
		{
			linkName: "Medical & Next of Kin Details",
			hashName: "#section_b"
		},
		{
			linkName: "Appointment Details",
			hashName: "#section_c"
		},
		{
			linkName: "Payment Details",
			hashName: "#section_d"
		},
		{
			linkName: "Qualification",
			hashName: "#section_e"
		},
		{
			linkName: "Housing Details",
			hashName: "#section_f"
		},
		{
			linkName: "Signature",
			hashName: "#section_g"
		}
	];
	const { data, isLoading, error } = useApiGet(getUserProfileUrl("false"), {
		refetchOnWindowFocus: false
	});

	const { data: countries, isLoading: loadingCountries } = useApiGet(
		getAllCountriesUrl(),
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

	const { data: maritalStatus, isLoading: isLoadingStatuses } = useApiGet(
		getMaritalStatusesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		data: sponsorRelationships,
		isLoading: isLoadingSponsorRelationships
		// error: sponsorRelationshipsError
	} = useApiGet(getSponsorRelationshipsUrl(), {
		refetchOnWindowFocus: false
	});

	const { data: titles, isLoading: isLoadingTitle } = useApiGet(
		getTitlesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: relationships, isLoading: isLoadingRelationships } =
		useApiGet(getRelationshipsUrl(), {
			refetchOnWindowFocus: false
		});

	const { data: genotypes, isLoading: loadingGenotypes } = useApiGet(
		getGenoTypesUrl(),
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

	const { data: staffTypes, isLoading: loadingStaffTypes } = useApiGet(
		getStaffTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: faculties, isLoading: loadingFaculties } = useApiGet(
		getFacultiesUrl(data?.data?.programmeDetail?.studentTypeId),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: designations, isLoading: loadingDesignations } = useApiGet(
		getDesignationsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: salaryStructure, isLoading: loadingsalaryStructure } =
		useApiGet(getSalaryStructureUrl(), {
			refetchOnWindowFocus: false
		});

	const { data: salaryGrade, isLoading: loadingsalaryGrade } = useApiGet(
		getSalaryGradeUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: salaryStep, isLoading: loadingSalaryStep } = useApiGet(
		getSalaryStepUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: pensionFunds, isLoading: isLoadingPensionFunds } = useApiGet(
		getPensionFundsUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: banks, isLoading: isLoadingBanks } = useApiGet(
		getBanksUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: accomodation, isLoading: isLoadingAccomodation } = useApiGet(
		getAccomodationTypeUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: campusLocation, isLoading: isLoadingCampusLocation } =
		useApiGet(getCampusLocationUrl(), {
			refetchOnWindowFocus: false
		});

	const { data: employmentStatus, isLoading: loadingEmploymentStatus } =
		useApiGet(getEmploymentStatusUrl(), {
			refetchOnWindowFocus: false
		});

	const allBloodGroups = formatSelectItems(bloodGroups?.data, "name", "id");
	const allGenotypes = formatSelectItems(genotypes?.data, "name", "id");
	const allSponsorRelationships = formatSelectItems(
		sponsorRelationships?.data,
		"name",
		"id"
	);
	const allStaffTypes = formatSelectItems(staffTypes?.data, "name", "id");
	const allPensionFunds = formatSelectItems(pensionFunds?.data, "name", "id");
	const allBanks = formatSelectItems(banks?.data, "name", "id");
	const allAccomodations = formatSelectItems(
		accomodation?.data,
		"name",
		"id"
	);
	const allCampusUrl = formatSelectItems(campusLocation?.data, "name", "id");

	const allFaculties = formatSelectItems(faculties?.data, "name", "id");
	const allDesignations = formatSelectItems(designations?.data, "name", "id");
	const allSalaryStructure = formatSelectItems(
		salaryStructure?.data,
		"name",
		"id"
	);
	const allSalaryGrade = formatSelectItems(salaryGrade?.data, "name", "id");
	const allSalaryStep = formatSelectItems(salaryStep?.data, "name", "id");
	const allEmploymentStatus = formatSelectItems(
		employmentStatus?.data,
		"name",
		"id"
	);

	const allReligions = formatSelectItems(religions?.data, "name", "id");

	const allCountries = formatSelectItems(countries?.data, "name", "id");

	const allTitles = formatSelectItems(titles?.data, "name", "id");

	const allMaritalStatus = formatSelectItems(
		maritalStatus?.data,
		"name",
		"id"
	);

	const allRelationships = formatSelectItems(
		relationships?.data,
		"name",
		"id"
	);

	if (
		isLoading ||
		loadingCountries ||
		loadingReligions ||
		isLoadingStatuses ||
		isLoadingTitle ||
		isLoadingRelationships ||
		loadingGenotypes ||
		loadingBloodGroups ||
		isLoadingSponsorRelationships ||
		loadingStaffTypes ||
		loadingFaculties ||
		loadingDesignations ||
		loadingsalaryStructure ||
		loadingsalaryGrade ||
		loadingSalaryStep ||
		loadingEmploymentStatus ||
		isLoadingPensionFunds ||
		isLoadingBanks ||
		isLoadingAccomodation ||
		isLoadingCampusLocation
	)
		return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	const uploadImage = async (images) => {
		if (
			checkIfFilesAreTooBig(images) &&
			checkIfImagesAreCorrectType(images)
		) {
			setLoading(true);
			const requestData = [];
			const newObj = { Passport: await formatImageToBase64(images[0]) };

			Object.keys(newObj).map((item) =>
				requestData.push({
					op: "replace",
					path: `/${item}`,
					value: trimItem(newObj[item])
				})
			);

			const requestBody = {
				url: updatePassportUrl(),
				data: { Passport: await formatImageToBase64(images[0]) }
			};

			updatePassport.mutate(requestBody, {
				onSuccess: () => {
					queryClient.invalidateQueries(getUserProfileUrl("false"));
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
	return (
		<div className={styles.container}>
			<div className="row mb-3 mx-0">
				<div className="col-12 col-xl-2">
					<div className={styles.profile_img}>
						{loading ? (
							<Spinner width={100} />
						) : (
							<Avatar
								name={`${data?.data?.personalData?.lastName} ${data?.data?.personalData?.firstName}`}
								className={styles.profile_img}
								src={data?.data?.personalData?.passport}
								size={100}
								round={true}
								maxInitials={2}
							/>
						)}
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10 py-4">
					<div className="d-none">
						<div ref={componentRef}>
							{data?.data && (
								<ProfilePrintOut
									userData={{
										...data?.data?.personalData,
										...data?.data?.programmeDetail
									}}
								/>
							)}
						</div>
					</div>
					<PageTitle
						title={`${data?.data?.personalData?.lastName} ${
							data?.data?.personalData?.firstName
						} ${data?.data?.personalData?.middlename ?? ""}`}
						buttonGroup={
							<Button
								data-cy="print_docs"
								buttonClass="primary"
								label="Print"
								onClick={handlePrint}
							/>
						}
					/>
				</div>
			</div>
			<div className="row mx-0">
				<div className="col-12 col-xl-2">
					<div className="">
						<div className="">
							<Button
								data-cy="upload"
								buttonClass="standard"
								label="Upload"
								customClass={styles.upload_button}
								onClick={() => ref?.current?.click()}
							/>
							<input
								type="file"
								ref={ref}
								className={styles.input}
								onChange={(e) => uploadImage(e.target.files)}
							/>
						</div>
					</div>
					<div className={styles.key_comes_tabs}>
						<div className={styles.key_comes_sticky}>
							<SideTabs navItems={navs} />
						</div>
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<DisplayInformation
						data={data?.data?.personalData}
						nexOfKinData={data?.data?.nextOfKin}
						programmeDetail={data?.data?.programmeDetail}
						allCountries={allCountries}
						allReligions={allReligions}
						allMaritalStatus={allMaritalStatus}
						allTitles={allTitles}
						allRelationships={allRelationships}
						allGenotypes={allGenotypes}
						allBloodGroups={allBloodGroups}
						allSponsorRelationships={allSponsorRelationships}
						allStaffTypes={allStaffTypes}
						allFaculties={allFaculties}
						allDesignations={allDesignations}
						allSalaryStructure={allSalaryStructure}
						allSalaryGrade={allSalaryGrade}
						allSalaryStep={allSalaryStep}
						allEmploymentStatus={allEmploymentStatus}
						allPensionFunds={allPensionFunds}
						allBanks={allBanks}
						allAccomodations={allAccomodations}
						allCampusUrl={allCampusUrl}
					/>
				</div>
			</div>
		</div>
	);
};

const DisplayInformation = ({
	allCountries,
	allTitles,
	allMaritalStatus,
	allRelationships,
	allReligions,
	allGenotypes,
	allBloodGroups,
	data,
	programmeDetail,
	nexOfKinData,
	allSponsorRelationships,
	allStaffTypes,
	allFaculties,
	allDesignations,
	allSalaryStructure,
	allSalaryGrade,
	allSalaryStep,
	allEmploymentStatus,
	allPensionFunds,
	allBanks,
	allAccomodations,
	allCampusUrl
}) => {
	let location = useLocation();
	useEffect(() => {
		if (!location.hash) {
			location.hash = "#section_a";
		}
	}, [location]);
	switch (location.hash) {
		case "#section_a":
			return (
				<PersonalInformation
					data={data}
					allCountries={allCountries}
					allReligions={allReligions}
					allMaritalStatus={allMaritalStatus}
					allTitles={allTitles}
				/>
			);
		case "#section_b":
			return (
				<NextOfKinInformation
					data={data}
					nexOfKinData={nexOfKinData}
					allRelationships={allRelationships}
					allGenotypes={allGenotypes}
					allBloodGroups={allBloodGroups}
					allSponsorRelationships={allSponsorRelationships}
				/>
			);
		case "#section_c":
			return (
				<AppointmentDetails
					programmeDetail={programmeDetail}
					allStaffTypes={allStaffTypes}
					allFaculties={allFaculties}
					allDesignations={allDesignations}
					allSalaryStructure={allSalaryStructure}
					allSalaryGrade={allSalaryGrade}
					allSalaryStep={allSalaryStep}
					allEmploymentStatus={allEmploymentStatus}
				/>
			);
		case "#section_d":
			return (
				<PaymentDetails
					programmeDetail={programmeDetail}
					allPensionFunds={allPensionFunds}
					allBanks={allBanks}
				/>
			);
		case "#section_e":
			return <Qualification programmeDetail={programmeDetail} />;
		case "#section_f":
			return (
				<Housing
					data={data}
					allAccomodations={allAccomodations}
					allCampusUrl={allCampusUrl}
				/>
			);
		case "#section_g":
			return <Signature signature={data?.signature} />;

		default:
			return (
				<PersonalInformation
					data={data}
					allCountries={allCountries}
					allReligions={allReligions}
					allMaritalStatus={allMaritalStatus}
					allTitles={allTitles}
					// allDepartments={allDepartments}
				/>
			);
	}
};
export default StaffProfile;
