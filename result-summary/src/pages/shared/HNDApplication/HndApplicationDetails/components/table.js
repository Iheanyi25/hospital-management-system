import styles from "../../style.module.css";

export const Table = ({ rows, sittingScore, total }) => {
	return (
		<table className={styles.table_container}>
			<thead>
				<tr>
					<th>S/N</th>
					<th>Subject</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((item, i) => (
					<tr key={i}>
						<td>{i + 1}</td>
						<td>{item.split(": ")[0]}</td>
						<td>{item.split(": ")[1]}</td>
					</tr>
				))}
				<tr>
					<td></td>
					<td>O’L Sitting Score</td>
					<td>{sittingScore}</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<h5>TOTAL</h5>
					</td>
					<td>
						<h5>{total}/400</h5>
					</td>
				</tr>
			</tbody>
		</table>
	);
};
