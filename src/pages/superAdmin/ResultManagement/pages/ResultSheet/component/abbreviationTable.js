import styles from "../style.module.css";

export const AbbreviationTable = () => {
	return (
		<div className="w-100 col-3">
			<table className={styles.composite_table}>
				<tr>
					<th className={styles.composite_table_max_width}>TCP</th>
					<td>Total Credit Points</td>
				</tr>
				<tr>
					<th className={styles.composite_table_max_width}>TNU</th>
					<td>Total Number of Units</td>
				</tr>
				<tr>
					<th className={styles.composite_table_max_width}>GPA</th>
					<td>Grade Point Average</td>
				</tr>
				<tr>
					<th className={styles.composite_table_max_width}>NGS</th>
					<td>Non Good Stand</td>
				</tr>
				<tr>
					<th className={styles.composite_table_max_width}>PB</th>
					<td>Probation</td>
				</tr>
				<tr>
					<th className={styles.composite_table_max_width}>WD</th>
					<td>Withdrawal</td>
				</tr>
				<tr>
					<th className={styles.composite_table_max_width}>EM</th>
					<td>Exam Malpractice</td>
				</tr>
				<tr>
					<th className={styles.composite_table_max_width}>NR</th>
					<td>Not Registered</td>
				</tr>
			</table>
		</div>
	);
};
