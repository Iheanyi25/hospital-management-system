import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLGAsUrl, getAllStatesUrl } from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { personalDetailsSchema } from "../uniTransferSchema";
import { useSelector } from "react-redux";
import { PersonalDetailsForm } from "./personalDetailsForm";

export const PersonalDetails = ({
	allCountries,
	allGenders,
	allReligions,
	allStatuses,
	relationships
}) => {
	const { personalInfoResponse } = useSelector(
		(state) => state.uniTransferData
	);

	const [countryState, setCountryState] = useState(
		personalInfoResponse?.countryId?.value
	);
	const [stateFieldState, setStateFieldState] = useState(
		personalInfoResponse?.stateId?.value
	);
	const { data: states, isFetching: isLoadingStates } = useApiGet(
		getAllStatesUrl(countryState),
		{
			refetchOnWindowFocus: false,
			enabled: !!countryState
		}
	);
	const { data: lgas, isFetching: isLoadingLGAs } = useApiGet(
		getAllLGAsUrl({ stateId: stateFieldState, countryId: countryState }),
		{
			refetchOnWindowFocus: false,
			enabled: !!(stateFieldState && countryState)
		}
	);
	const allStates = useMemo(
		() => formatSelectItems(states?.data, "name", "id"),
		[states]
	);
	const allLGAs = useMemo(
		() => formatSelectItems(lgas?.data, "name", "id"),
		[lgas]
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
			firstname: personalInfoResponse?.firstname,
			middlename: personalInfoResponse?.middlename,
			surname: personalInfoResponse?.surname,
			sexId: personalInfoResponse?.genderId,
			dateOfBirth: personalInfoResponse?.dateOfBirth,
			countryId: personalInfoResponse?.countryId,
			stateId: personalInfoResponse?.stateId,
			lgaId: personalInfoResponse?.lgaId,
			mobileNumber: personalInfoResponse?.mobileNumber,
			email: personalInfoResponse?.email,
			contactAddress: personalInfoResponse?.contactAddress,
			maritalStatusId: personalInfoResponse?.maritalStatusId
		},
		resolver: yupResolver(personalDetailsSchema),
		context: {
			isLGARequired: allLGAs?.length > 0 ? true : false
		}
	});

	useEffect(() => {
		const subscription = watch(({ countryId, stateId, dateOfBirth }) => {
			setCountryState(countryId?.value);
			setStateFieldState(stateId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onCountryChange = (value) => {
		setCountryState(value.value);
		setValue("countryId", value);
		setValue("stateId", null);
		setValue("lgaId", null);
		clearErrors("countryId");
	};

	const onStateChange = (value) => {
		setStateFieldState(value.value);
		setValue("stateId", value);
		setValue("lgaId", null);
		clearErrors("stateId");
	};

	return (
		<PersonalDetailsForm
			handleSubmit={handleSubmit}
			errors={errors}
			control={control}
			register={register}
			isLoadingStates={isLoadingStates}
			isLoadingLGAs={isLoadingLGAs}
			allStates={allStates}
			allLGAs={allLGAs}
			onCountryChange={onCountryChange}
			onStateChange={onStateChange}
			allReligions={allReligions}
			allCountries={allCountries}
			allStatuses={allStatuses}
			relationships={relationships}
			allGenders={allGenders}
		/>
	);
};
