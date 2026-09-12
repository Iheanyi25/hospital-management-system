import styles from "../style.module.css";

export const UnregisteredTable = ({ data }) => {
	return (
		<table className={`${styles.unregistered_table} mt-4`}>
			<thead>
				<tr>
					<th colSpan={3}>UNREGISTERED STUDENTS</th>
				</tr>
			</thead>
			<tbody>
				<tr className={styles.unregistered_table_head}>
					<td>SN</td>
					<td>FULL NAME</td>
					<td>MATRIC NO</td>
				</tr>
				{data?.map((data, i) => (
					<tr key={i + 1}>
						<td>{i + 1}</td>
						<td>{data.fullName}</td>
						<td>{data.registrationNumber}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
