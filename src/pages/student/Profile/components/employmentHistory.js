import {
	Jumbotron,
	Button,
	// SecondaryLink
} from "../../../../ui_elements";
import styles from "../style.module.css";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employmentHistorySchema } from "./profileSchema";
import { useState } from "react";
import { WorkHistoryForm } from "./workHistoryForm";
// import { trimItem } from "../../../../utils/trimItem";
// import { useApiPatch } from "../../../../api/apiCall";
// import { useQueryClient } from "react-query";
// import {
// 	getStudentProfileUrl,
// 	updateStaffProfileUrl
// } from "../../../../api/urls";

// const initialObj = {
// 	workHistory: {
// 		employer: "",
// 		from: "",
// 		to: "",
// 		jobDescription: ""
// 	}
// };

export const EmploymentHistory = ({ employment }) => {
	const [employmentArray, setEmploymentArray] = useState(
		employment.length === 0 ? [0] : employment
	);
	const { replace } = useHistory();
	const { state } = useLocation();
	// const { mutate, isLoading } = useApiPatch();
	// const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		getValues,
		formState: { errors }
	} = useForm({
		defaultValues: { workHistory: employmentArray },
		resolver: yupResolver(employmentHistorySchema)
	});

	const onSubmit = async () => {
		// const data = [];
		// values.workHistory.map((items) =>
		// 	data.push(
		// 		Object.keys(items).map((item, index) => {
		// 			return {
		// 				op: "replace",
		// 				path: `/WorkHistory/${index}/${item}`,
		// 				value: trimItem(items[item])
		// 			};
		// 		})
		// 	)
		// );
		// const requestBody = {
		// 	url: updateStaffProfileUrl({ refCode: false }),
		// 	data
		// };
		// mutate(requestBody, {
		// 	onSuccess: () => {
		// 		queryClient.invalidateQueries(
		// 			getStudentProfileUrl({ refCode: false })
		// 		);
		// 		const successFlag = window.AJS.flag({
		// 			type: "success",
		// 			title: "Profile details updated.",
		// 			body: "Your student profile details have been successfully updated."
		// 		});
		// 		setTimeout(() => {
		// 			successFlag.close();
		// 		}, 5000);
		// 		replace({ hash: "#section_g", state });
		// 	},
		// 	onError: ({ response }) => {
		// 		const errorFlag = window.AJS.flag({
		// 			type: "error",
		// 			title: "Failed!",
		// 			body: response?.data?.message || "Something went wrong"
		// 		});
		// 		setTimeout(() => {
		// 			errorFlag.close();
		// 		}, 5000);
		// 	}
		// });
		replace({ hash: "#section_g", state });
	};

	// const handleAddAnother = () => {
	// 	setEmploymentArray([...employmentArray, initialObj.workHistory]);
	// 	setValue("workHistory", [
	// 		...getValues().workHistory,
	// 		initialObj.workHistory
	// 	]);
	// };

	const handleRemoveItem = (targetElement) => {
		let filteredArray = employmentArray.filter(
			(_, index) => index !== targetElement
		);
		setEmploymentArray(filteredArray);
		setValue(
			"workHistory",
			getValues().workHistory.filter(
				(_, index) => index !== targetElement
			)
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Employment History</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Next"
						buttonClass="primary"
						type="submit"
						// loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid my-4">
					<p className={styles.welcome_text}>
						List Employment Since Leaving
						School/University/Polytechnic
					</p>
				</div>
				{employmentArray?.map((item, index) => (
					<WorkHistoryForm
						index={index}
						errors={errors}
						register={register}
						watch={watch}
						handleRemoveItem={handleRemoveItem}
						key={index}
						item={item}
						setValue={setValue}
					/>
				))}
				<div className="container-fluid px-4 my-4">
					<div
						className={`${
							employmentArray?.length > 0 ? "" : "border-top"
						} d-flex justify-content-end pt-2`}
					>
						{/* <SecondaryLink
							label="Add another"
							onClick={() => handleAddAnother("workHistory")}
						/> */}
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
