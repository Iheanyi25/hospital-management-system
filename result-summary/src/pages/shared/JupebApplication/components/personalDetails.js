import { useState, useEffect, useMemo } from "react";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalDetailsSchema } from "../jupebApplicationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
	getDepartmentsUrl,
	getAllLGAsUrl,
	getAllStatesUrl,
	jupebCourseOptionsSubjectUrl
} from "../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../api/apiCall";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { PersonalDetailsForm } from "./personalDetailsform";

export const PersonalDetails = ({
	allGenders,
	religions,
	relationships,
	departments,
	bloodGroups,
	genotypes,
	maritalStatus,
	allCountries,
	allFaculties
}) => {
	const jupebData = useSelector((state) => state.jupebData);

	const { mutate, isLoading: isFormLoading } = useApiPut();

	const [courseCombination, setCourseCombination] = useState(
		jupebData?.DepartmentId?.value
	);

	const [countryValue, setCountryValue] = useState(
		jupebData?.CountryId?.value
	);
	const [stateValue, setStateValue] = useState(jupebData?.StateId?.value);
	const [facultyValue, setFacultyValue] = useState(
		jupebData?.ChoiceSchoolId?.value
	);

	const { data: departmentsSubject, isLoading: loadingSubjects } = useApiGet(
		jupebCourseOptionsSubjectUrl(courseCombination),
		{
			enabled: !!courseCombination,
			refetchOnWindowFocus: false
		}
	);

	const { data: choiceDepartment, isLoading: loadingChoiceSubjects } =
		useApiGet(getDepartmentsUrl(jupebData?.StudentTypeId, facultyValue), {
			enabled: !!facultyValue,
			refetchOnWindowFocus: false
		});

	const { data: statesData, isFetching: loadingStates } = useApiGet(
		getAllStatesUrl(countryValue),
		{
			refetchOnWindowFocus: false,
			enabled: !!countryValue
		}
	);

	const { data: lgaData, isFetching: loadingLga } = useApiGet(
		getAllLGAsUrl({ stateId: stateValue, countryId: countryValue }),
		{
			enabled: !!(stateValue && countryValue),
			refetchOnWindowFocus: false
		}
	);

	const allDepartmentSubjects = useMemo(
		() =>
			formatSelectItems(
				departmentsSubject?.data,
				"department",
				"departmentId"
			),
		[departmentsSubject?.data]
	);

	const allChoiceDepartments = useMemo(
		() =>
			formatSelectItems(
				choiceDepartment?.data,
				"department",
				"departmentId"
			),
		[choiceDepartment?.data]
	);

	const allStateData = useMemo(
		() => formatSelectItems(statesData?.data, "name", "id"),
		[statesData?.data]
	);

	const allLGA = useMemo(
		() => formatSelectItems(lgaData?.data, "name", "id"),
		[lgaData?.data]
	);

	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();
	const {
		register,
		control,
		handleSubmit,
		setValue,
		clearErrors,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			Surname: jupebData?.Lastname,
			Firstname: jupebData?.Firstname,
			Middlename: jupebData?.Middlename,
			GenderId: jupebData?.GenderId,
			DateOfBirth: jupebData?.DateOfBirth?.split("T")[0],
			BloodGroupId: jupebData?.BloodGroupId,
			GenoTypeId: jupebData?.GenoTypeId,
			CountryId: jupebData?.CountryId,
			StateId: jupebData?.StateId,
			LgaId: jupebData?.LgaId,
			Town: jupebData?.Town,
			PermanentAddress: jupebData?.PermanentAddress,
			MobileNo: jupebData?.MobileNumber,
			Email: jupebData?.Email,
			ReligionId: jupebData?.ReligionId,
			MaritalStatusId: jupebData?.MaritalStatusId,
			DepartmentId: jupebData?.DepartmentId,
			JupebOptionSubjectId: jupebData?.JupebOptionSubjectId,
			ChoiceSchoolId: jupebData?.ChoiceSchoolId,
			ChoiceDepartmentId: jupebData?.ChoiceDepartmentId,
			SponsorsFullname: jupebData?.SponsorsFullname,
			SponsorsAddress: jupebData?.SponsorsAddress,
			SponsorsMobileNo: jupebData?.SponsorsMobileNo,
			SponsorsEmail: jupebData?.SponsorsEmail,
			SponsorsRelationship: jupebData?.SponsorsRelationship
		},
		resolver: yupResolver(personalDetailsSchema),
		context: {
			isLGARequired: lgaData?.data?.length > 0 ? true : false
		}
	});

	useEffect(() => {
		setValue("JupebOptionSubjectId", jupebData?.JupebOptionSubjectId);
	}, [jupebData?.JupebOptionSubjectId, setValue, allDepartmentSubjects]);

	useEffect(() => {
		const subscription = watch(
			({ DepartmentId, CountryId, StateId, ChoiceSchoolId }) => {
				setCourseCombination(DepartmentId?.value);
				setCountryValue(CountryId?.value);
				setStateValue(StateId?.value);
				setFacultyValue(ChoiceSchoolId?.value);
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	const onCountryChange = (value) => {
		setValue("CountryId", value);
		setValue("StateId", null);
		setValue("LgaId", null);
		clearErrors("CountryId");
	};

	const onStateChange = (value) => {
		setValue("StateId", value);
		setValue("LgaId", null);
		clearErrors("StateId");
	};

	return (
		<PersonalDetailsForm
			isFormLoading={isFormLoading}
			register={register}
			handleSubmit={handleSubmit}
			errors={errors}
			allGenders={allGenders}
			bloodGroups={bloodGroups}
			allCountries={allCountries}
			allStateData={allStateData}
			allLGA={allLGA}
			allFaculties={allFaculties}
			relationships={relationships}
			countryValue={countryValue}
			loadingSubjects={loadingSubjects}
			control={control}
			courseCombination={courseCombination}
			allDepartmentSubjects={allDepartmentSubjects}
			maritalStatus={maritalStatus}
			genotypes={genotypes}
			loadingStates={loadingStates}
			stateValue={stateValue}
			loadingLga={loadingLga}
			religions={religions}
			departments={departments}
			mutate={mutate}
			dispatch={dispatch}
			replace={replace}
			state={state}
			allChoiceDepartments={allChoiceDepartments}
			loadingChoiceSubjects={loadingChoiceSubjects}
			onCountryChange={onCountryChange}
			onStateChange={onStateChange}
		/>
	);
};
