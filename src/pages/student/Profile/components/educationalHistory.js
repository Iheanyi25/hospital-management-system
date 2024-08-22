import {
	Jumbotron,
	Button
	// SecondaryLink
} from "../../../../ui_elements";
import styles from "../style.module.css";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationalRecordsSchema } from "./profileSchema";
import { PostPrimaryInstitutions } from "./postPrimaryInstitutions";
import { useState } from "react";
// import { useApiPatch } from "../../../../api/apiCall";
// import { useQueryClient } from "react-query";
// import {
// 	getStudentProfileUrl,
// 	updateStaffProfileUrl
// } from "../../../../api/urls";
// import { trimItem } from "../../../../utils/trimItem";

// const initialObj = {
// 	educationalRecords: {
// 		school: "",
// 		place: "",
// 		yearFrom: "",
// 		yearTo: "",
// 		certificate: ""
// 	}
// };

export const EducationHistory = ({ education }) => {
	const [educationArray, setEducationArray] = useState(
		education.length === 0 ? [0] : education
	);
	const { replace } = useHistory();
	// const { mutate, isLoading } = useApiPatch();
	// const queryClient = useQueryClient();
	const { state } = useLocation();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		getValues,
		formState: { errors }
	} = useForm({
		defaultValues: { educationalRecords: education },
		resolver: yupResolver(educationalRecordsSchema)
	});

	const onSubmit = async () => {
		// const data = [];
		// values.educationalRecords.map((items) =>
		// 	data.push(
		// 		Object.keys(items).map((item, index) => {
		// 			return {
		// 				op: "replace",
		// 				path: `/EducationalRecords/${index}/${item}`,
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
		// 		replace({ hash: "#section_f", state });
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
		replace({ hash: "#section_f", state });
	};

	// const handleAddAnother = () => {
	// 	setEducationArray([...educationArray, initialObj.educationalRecords]);

	// 	setValue("educationalRecords", [
	// 		...getValues().educationalRecords,
	// 		initialObj.educationalRecords
	// 	]);
	// };

	const handleRemoveItem = (targetElement) => {
		let filteredArray = educationArray.filter(
			(_, index) => index !== targetElement
		);
		setEducationArray(filteredArray);
		setValue(
			"educationalRecords",
			getValues().educationalRecords.filter(
				(_, index) => index !== targetElement
			)
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						Tertiary Institutions and qualifications Obtained
					</span>
				}
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
						Please List al Post Primary Institutions Attended: *
					</p>
				</div>
				{educationArray?.map((_, index) => (
					<PostPrimaryInstitutions
						index={index}
						errors={errors}
						register={register}
						watch={watch}
						handleRemoveItem={handleRemoveItem}
						key={index}
					/>
				))}
				<div className="container-fluid px-4 my-4">
					<div
						className={`${
							educationArray?.length > 0 ? "" : "border-top"
						} d-flex justify-content-end pt-2`}
					>
						{/* <SecondaryLink
							label="Add another"
							onClick={() =>
								handleAddAnother("educationalRecords")
							}
						/> */}
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
