import React from "react";
import styles from "../style.module.css";
import { Spinner } from "../../../../ui_elements";
import { useApiGet } from "../../../../api/apiCall";
import { getMedicalRecordsUrl } from "../../../../api/urls";
import CheckboxIcon from "../../../../assets/images/CheckboxIcon.png";

export default function MedicalHistoryPrintout({
	medicalRecords: selectedAilMents
}) {
	const {
		data: allAilments,
		isLoading,
		error
	} = useApiGet(getMedicalRecordsUrl(), {
		refetchOnWindowFocus: false
	});

	if (isLoading) return <Spinner />;
	if (error) return "An error has occurred: " + error?.response?.data?.message;

	const allAilmentsObj = {};
	if (allAilments?.data?.length > 0) {
		allAilments?.data.forEach(({ name, id }) => {
			allAilmentsObj[id] = name;
		});
	}

	return (
		<div className={styles.print_out__section}>
			<div className={styles.grid_header}>Medical History</div>
			<div className={styles.ailment_grid}>
				{selectedAilMents?.map((ailmentValue, index) => (
					<div className={styles.ailments_items} key={index}>
						<img src={CheckboxIcon} alt="checkbox icon" />
						<div>{allAilmentsObj[ailmentValue]}</div>
					</div>
				)) ?? []}
			</div>
		</div>
	);
}
