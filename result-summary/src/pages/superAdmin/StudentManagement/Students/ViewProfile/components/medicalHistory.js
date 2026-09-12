import styles from "../style.module.css";
import {
	Checkbox,
	Jumbotron,
	Spinner,
	Button
} from "../../../../../../ui_elements";
import { useState } from "react";
import { useApiGet, useApiPatch } from "../../../../../../api/apiCall";
import {
	getMedicalRecordsUrl,
	getStudentProfileUrl,
	updateStudentProfileUrl
} from "../../../../../../api/urls";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { useQueryClient } from "react-query";

export const MedicalHistory = ({ data, refCode }) => {
	const queryClient = useQueryClient();
	const { mutate, isLoading: isLoadingRequest } = useApiPatch();
	const [selectedAilMents, setSelectedAilMents] = useState(data);

	const updateAilments = (title) => {
		if (selectedAilMents?.includes(title))
			setSelectedAilMents((prev) =>
				prev.filter((item) => item !== title)
			);
		else setSelectedAilMents((prev) => [...prev, title]);
	};
	const onSubmit = () => {
		const requestBody = {
			url: updateStudentProfileUrl({ refCode }),
			data: [
				{
					op: "replace",
					path: `/MedicalRecords`,
					value: selectedAilMents
				}
			]
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getStudentProfileUrl({ refCode })
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your student profile details have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body:
						response?.data?.message ||
						`Something went wrong with this action. Check your forms and submit again`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	const {
		data: ailments,
		isLoading,
		error
	} = useApiGet(getMedicalRecordsUrl(), {
		refetchOnWindowFocus: false
	});
	const allAilments = formatSelectItems(ailments?.data, "name", "id");
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div>
			<Jumbotron
				headerText={
					<span>
						Your medical history<small>(Optional)</small>
					</span>
				}
				footerContent={
					<Button
						data-cy="submit_profile"
						label="Update"
						buttonClass="primary"
						type="button"
						onClick={onSubmit}
						loading={isLoadingRequest}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<form>
					<div className="container px-4 my-4">
						<div className="row">
							{allAilments.map((ailment, index) => (
								<div className="col-lg-6 mb-4" key={index}>
									<div
										className={`border ${styles.ailment_container}`}
									>
										<Checkbox
											label={ailment.label}
											labelClassName="ml-3"
											id={ailment.value}
											checked={selectedAilMents?.includes(
												String(ailment.value)
											)}
											onSelect={(e) =>
												updateAilments(
													String(ailment.value)
												)
											}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</form>
			</Jumbotron>
		</div>
	);
};
