import styles from "../../../ResultSheet/style.module.css";

export const GradeSummary = ({ resultData }) => {
	return (
		<div className="w-100 mt-5 d-flex justify-content-end">
			<table className={`col-3 ${styles.result_summary_table} ${styles.altBgTH}`}>
				<thead>
					<tr>
						<th colSpan={2}>RESULT SUMMARY</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>A</td>
						<td>{resultData?.totalGradeACount}</td>
					</tr>
					<tr>
						<td>B</td>
						<td>{resultData?.totalGradeBCount}</td>
					</tr>
					<tr>
						<td>C</td>
						<td>{resultData?.totalGradeCCount}</td>
					</tr>
					<tr>
						<td>D</td>
						<td>{resultData?.totalGradeDCount}</td>
					</tr>
					<tr>
						<td>E</td>
						<td>{resultData?.totalGradeECount}</td>
					</tr>
					<tr>
						<td>F</td>
						<td>{resultData?.totalGradeFCount}</td>
					</tr>
					<tr>
						<td>Total</td>
						<td>{resultData?.totalClassCount}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
