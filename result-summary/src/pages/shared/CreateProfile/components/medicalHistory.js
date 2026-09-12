import styles from "../style.module.css";
import { Checkbox, Jumbotron, Spinner, Button } from "../../../../ui_elements";
import { useState } from "react";
import { useApiGet } from "../../../../api/apiCall";
import { getMedicalRecordsUrl } from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_STUDENT_DATA } from "../../../../store/constant";

export const MedicalHistory = ({ setOpen }) => {
	const studentState = useSelector((state) => state.studentData);
	const { MedicalRecords } = studentState;
	const dispatch = useDispatch();
	const [selectedAilMents, setSelectedAilMents] = useState(MedicalRecords);

	const updateAilments = (title) => {
		if (selectedAilMents.includes(title))
			setSelectedAilMents((prev) =>
				prev.filter((item) => item !== title)
			);
		else setSelectedAilMents((prev) => [...prev, title]);
	};
	const onSubmit = () => {
		dispatch({
			type: SAVE_STUDENT_DATA,
			payload: {
				...studentState,
				MedicalRecords: selectedAilMents
			}
		});
		setOpen(true);
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
	if (error) return "An error has occurred: " + error?.response?.data?.message;
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
						label="Submit"
						buttonClass="primary"
						type="button"
						onClick={onSubmit}
						// loading={isLoadingRequest}
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
											checked={selectedAilMents.includes(
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
