import styles from "../style.module.css";

export const ResultSummary = ({ data }) => {
	return (
		<div className="w-100 col-3 mt-5">
			<table className={styles.result_summary_table}>
				<thead>
					<tr>
						<th colSpan={2}>RESULT SUMMARY</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Good Stand [GS]</td>
						<td>{data?.gs}</td>
					</tr>
					<tr>
						<td>Non Good Stand [NGS]</td>
						<td>{data?.ngs}</td>
					</tr>
					<tr>
						<td>Probation [PB]</td>
						<td>{data?.pb}</td>
					</tr>
					<tr>
						<td>Withdrawal [WD]</td>
						<td>{data?.wd}</td>
					</tr>
					<tr>
						<td>Not Registered [NR]</td>
						<td>{data?.nr}</td>
					</tr>
					<tr>
						<td>Exam Malpractice [EM]</td>
						<td>{data?.em}</td>
					</tr>
					<tr>
						<td>Total</td>
						<td>{data?.total}</td>
					</tr>
				</tbody>
			</table>
			<p className={styles.range_current_text}>
				<span>Range of Current GPA:</span> {data?.currentGPARange}
			</p>
			<p className={styles.range_current_text}>
				<span>Range of Current CGPA:</span> {data?.currentCGPARange}
			</p>
		</div>
	);
};
