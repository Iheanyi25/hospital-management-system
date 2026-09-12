import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { StudentDetailsForm } from "./studentDetailsForm";

export const StudentDetails = ({ allGenders }) => {
	const { basicInformationResponse } = useSelector(
		(state) => state.staffRequestData
	);

	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/staff_request_login");
	}

	const {
		register,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			Lastname: basicInformationResponse?.Lastname,
			Firstname: basicInformationResponse?.Firstname,
			Middlename: basicInformationResponse?.Middlename,
			Gender: basicInformationResponse?.Gender,
			Department: basicInformationResponse?.Department,
			AggregateScore: basicInformationResponse?.AggregateScore,
			JambNumber: basicInformationResponse?.JambNumber,
			PutmeScore: basicInformationResponse?.PutmeScore,
			UtmeScore: basicInformationResponse?.UtmeScore
		}
	});

	return (
		<StudentDetailsForm
			replace={replace}
			state={state}
			register={register}
			errors={errors}
			control={control}
			allGenders={allGenders}
		/>
	);
};
