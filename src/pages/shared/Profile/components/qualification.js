import { useForm } from "react-hook-form";
import { Jumbotron, TextField, Button } from "../../../../ui_elements";
import {
	formatDateFromAPI,
	formatInputDate
} from "../../../../utils/formatDate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { useApiEdit } from "../../../../api/apiCall";
import { getUserProfileUrl, updateStaffProfileUrl } from "../../../../api/urls";
import { trimItem } from "../../../../utils/trimItem";
import { qualificationDetailsSchema } from "./schema";
import styles from "../style.module.css";
import { useHistory } from "react-router-dom";

export const Qualification = ({ programmeDetail }) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiEdit();
	const queryClient = useQueryClient();

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			HighestQualification: programmeDetail.highestQualification,
			HighestQualificationDate: formatDateFromAPI(
				programmeDetail.highestQualificationDate
			)
		},
		resolver: yupResolver(qualificationDetailsSchema)
	});

	const onSubmit = (values) => {
		const data = [];
		Object.keys(values).map((item) =>
			data.push({
				op: "replace",
				path: `/ProgrammeDetail/${item}`,
				value: trimItem(values[item])
			})
		);
		const requestBody = {
			url: updateStaffProfileUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(getUserProfileUrl());
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your profile details has been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace("#section_f");
			},
			onError: () => {
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
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={"Qualification"}
				footerContent={
					<>
						<Button
							data-cy="submit_qualification"
							label="Submit"
							buttonClass="primary"
							type="submit"
							loading={isLoading}
						/>
					</>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid my-4">
					<p className={styles.welcome_text}>
						Please List all Post Primary Institutions Attended: *
					</p>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor={`Qualification`}>
								Qualification(s) Obtained
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="What qualification did you obtain?"
								type="text"
								id={`HighestQualification`}
								name={`HighestQualification`}
								register={register}
								required
								error={
									errors?.HighestQualification &&
									errors?.HighestQualification
								}
								errorText={
									errors?.HighestQualification &&
									errors?.HighestQualification &&
									errors?.HighestQualification?.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="DateAttended">Date Attended</label>
						</div>
						<div className="col-lg-9">
							<TextField
								type="date"
								className="w-100"
								name={`HighestQualificationDate`}
								register={register}
								required
								max={formatInputDate(new Date())}
								error={
									errors?.HighestQualificationDate &&
									errors?.HighestQualificationDate
								}
								errorText={
									errors?.HighestQualificationDate &&
									errors?.HighestQualificationDate &&
									errors?.HighestQualificationDate?.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
