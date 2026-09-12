import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	getAllLGAsUrl,
	getAllStatesUrl,
	getGendersUrl
} from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { personalDetailsSchema } from "../diplomaSchema";
import { useSelector } from "react-redux";
import { PersonalDetailsForm } from "./personalDetailsForm";
import { formatDateFromAPI } from "../../../../utils/formatDate";

export const PersonalDetails = ({
	allCountries,
	allStatuses,
	relationships
}) => {
	const { data: genders } = useApiGet(getGendersUrl(), {
		refetchOnWindowFocus: false
	});
	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const { basicInformation } = useSelector((state) => state.diplomaData);

	const [countryState, setCountryState] = useState(
		basicInformation?.countryId?.value
	);
	const [stateFieldState, setStateFieldState] = useState(
		basicInformation?.stateId?.value
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
			passportAsBase64: basicInformation?.passport,
			firstname: basicInformation?.firstname,
			middlename: basicInformation?.middlename,
			surname: basicInformation?.surname,
			sexId: basicInformation?.gender,
			dateOfBirth: basicInformation?.dateOfBirth
				? formatDateFromAPI(basicInformation?.dateOfBirth)
				: "",
			countryId: basicInformation?.country,
			stateId: basicInformation?.state,
			lgaId: basicInformation?.lga,
			mobileNumber: basicInformation?.mobileNumber,
			email: basicInformation?.email,
			contactAddress: basicInformation?.contactAddress,
			permanentAddress: basicInformation?.permanentAddress,
			maritalStatusId: basicInformation?.maritalStatus,
			fullname: basicInformation?.sponsorFullName,
			address: basicInformation?.sponsorContactAddress,
			phoneNo: basicInformation?.sponsorMobileNumber,
			relationshipId: basicInformation?.sponsorRelationship
		},
		resolver: yupResolver(personalDetailsSchema),
		context: {
			isLGARequired: allLGAs?.length > 0 ? true : false
		}
	});

	useEffect(() => {
		const subscription = watch(({ countryId, stateId }) => {
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
			allCountries={allCountries}
			allStatuses={allStatuses}
			relationships={relationships}
			allGenders={allGenders}
		/>
	);
};
