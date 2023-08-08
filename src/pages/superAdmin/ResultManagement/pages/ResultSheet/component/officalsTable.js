import styles from "../style.module.css";

export const OfficalsTable = ({ compositeSheet }) => {
	return (
		<div className="w-100 col-5">
			<table className={`${styles.composite_table} w-100`}>
				<tr>
					<th>Vice Chancellor</th>
					<td>{compositeSheet?.data?.viceChancellor}</td>
				</tr>
				<tr>
					<th>Dean</th>
					<td>{compositeSheet?.data?.dean}</td>
				</tr>
				<tr>
					<th>Head of Department</th>
					<td>{compositeSheet?.data?.actingHeadOfDepartment}</td>
				</tr>
				<tr>
					<th>Programme</th>
					<td>{compositeSheet?.data?.programme}</td>
				</tr>
				<tr>
					<th>Degree</th>
					<td>{compositeSheet?.data?.degree}</td>
				</tr>
			</table>
			<div className={`${styles.composite_table_approval} w-100`}></div>
		</div>
	);
};
