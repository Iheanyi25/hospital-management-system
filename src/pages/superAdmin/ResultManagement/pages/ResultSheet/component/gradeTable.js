import styles from "../style.module.css";

export const GradeTade = () => {
	return (
		<div className="w-100 col-4">
			<table className={styles.composite_table}>
				<tr>
					<th colSpan={3}>GRADE ANALYSIS</th>
				</tr>
				<tr>
					<th>Range of Score</th>
					<td>Grade</td>
					<td>Point</td>
				</tr>
				<tr>
					<td>70 - 100</td>
					<td>A</td>
					<td>5.0</td>
				</tr>
				<tr>
					<td>60 - 69</td>
					<td>B</td>
					<td>4.0</td>
				</tr>
				<tr>
					<td>50 -59</td>
					<td>C</td>
					<td>3.0</td>
				</tr>
				<tr>
					<td>45 - 49</td>
					<td>D</td>
					<td>2.0</td>
				</tr>
				<tr>
					<td>40 - 44</td>
					<td>E</td>
					<td>1.0</td>
				</tr>
				<tr>
					<td>0 - 39</td>
					<td>F</td>
					<td>0.0</td>
				</tr>
			</table>
		</div>
	);
};
