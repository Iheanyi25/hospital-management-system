import { useState, useEffect, useMemo } from "react";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalDetailsSchema } from "../centerOfSafetyApplicationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
	// getDepartmentsUrl,
	getAllLGAsUrl,
	getAllStatesUrl
	// jupebCourseOptionsSubjectUrl
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
	const { basicInformation } = useSelector((state) => state.CSPGData);

	const { mutate, isLoading: isFormLoading } = useApiPut();

	const [countryValue, setCountryValue] = useState(
		basicInformation?.countryId?.value
	);
	const [stateValue, setStateValue] = useState(
		basicInformation?.stateId?.value
	);

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
			Surname: basicInformation?.lastname,
			Firstname: basicInformation?.firstname,
			Middlename: basicInformation?.middlename,
			GenderId: basicInformation?.genderId,
			DateOfBirth: basicInformation?.dateOfBirth?.split("T")[0],
			CountryId: basicInformation?.countryId,
			StateId: basicInformation?.stateId,
			LgaId: basicInformation?.lgaId,
			MobileNo: basicInformation?.mobileNumber,
			Email: basicInformation?.email
		},
		resolver: yupResolver(personalDetailsSchema),
		context: {
			isLGARequired: lgaData?.data?.length > 0 ? true : false
		}
	});

	useEffect(() => {
		const subscription = watch(({ CountryId, StateId }) => {
			setCountryValue(CountryId?.value);
			setStateValue(StateId?.value);
		});
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
			control={control}
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
			onCountryChange={onCountryChange}
			onStateChange={onStateChange}
		/>
	);
};
