import { useState, useMemo, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalDetailsSchema } from "../cceSchema";
import { useSelector } from "react-redux";
import { PersonalDetailsForm } from "./personalDetailsForm";
import { getAllLGAsUrl, getAllStatesUrl } from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";

export const PersonalDetails = ({ allGenders, allCountries, allReligions }) => {
	const cce = useSelector((state) => state.cceData);

	const { personalInfoResponse } = cce;

	const { isPassportValid } = cce;
	const { mutate, isLoading: isFormLoading } = useApiPost();

	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/cce_login");
	}

	const [countryValue, setCountryValue] = useState(
		cce?.personalInfoResponse?.CountryId?.value
	);
	const [stateValue, setStateValue] = useState(
		cce?.personalInfoResponse?.StateId?.value
	);

	const { data: statesData, isFetching: loadingStates } = useApiGet(
		getAllStatesUrl(countryValue),
		{
			enabled: !!countryValue,
			refetchOnWindowFocus: false
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

	const {
		register,
		control,
		handleSubmit,
		setValue,
		watch,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			Surname: personalInfoResponse?.Surname,
			Firstname: personalInfoResponse?.Firstname,
			Middlename: personalInfoResponse?.Middlename,
			Religion: personalInfoResponse?.Religion,
			GenderId: personalInfoResponse?.GenderId,
			DateofBirth: personalInfoResponse?.DateofBirth,
			CountryId: personalInfoResponse?.CountryId,
			StateId: personalInfoResponse?.StateId,
			LgaId: personalInfoResponse?.LgaId,
			ContactAddress: personalInfoResponse?.ContactAddress,
			PermanentAddress: personalInfoResponse?.PermanentAddress,
			MobileNo: personalInfoResponse?.MobileNo,
			Email: personalInfoResponse?.Email,
			ReligionId: personalInfoResponse?.ReligionId
		},
		resolver: yupResolver(personalDetailsSchema),
		context: {
			isLGARequired: lgaData?.data?.length > 0 ? true : false
		}
	});
	const watchData = watch({
		country: "CountryId",
		endDate: "endDate",
		Disability: "Disability",
		middleName: "Middlename"
	});

	useEffect(() => {
		const subscription = watch(({ CountryId, StateId }) => {
			setCountryValue(CountryId?.value);
			setStateValue(StateId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onCountryChange = (value) => {
		setCountryValue(value.value);
		setValue("CountryId", value);
		setValue("StateId", null);
		setValue("LgaId", null);
		clearErrors("CountryId");
	};

	const onStateChange = (value) => {
		setStateValue(value.value);
		setValue("StateId", value);
		setValue("LgaId", null);
		clearErrors("StateId");
	};

	return (
		<PersonalDetailsForm
			replace={replace}
			state={state}
			register={register}
			errors={errors}
			control={control}
			handleSubmit={handleSubmit}
			isPassportValid={isPassportValid}
			mutate={mutate}
			isFormLoading={isFormLoading}
			allGenders={allGenders}
			allReligions={allReligions}
			countries={allCountries}
			states={allStateData}
			localGovernments={allLGA}
			watchData={watchData}
			loadingStates={loadingStates}
			loadingLga={loadingLga}
			onCountryChange={onCountryChange}
			onStateChange={onStateChange}
		/>
	);
};
