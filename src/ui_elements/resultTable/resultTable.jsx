import "./style.css";


export const ResultTable = ({
	semester = "2",
	subjects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	creditUnit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	students = [
		{
			name: "NWANKWO CHIDIMMA JUDITH",
			reg: 2013316001,
			subjects: [
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
				{
					gr: "A",
					gp: "11.00"
				},
                {
					gr: "A",
					gp: "11.00"
				},
                {
					gr: "A",
					gp: "11.00"
				},
                {
					gr: "A",
					gp: "11.00"
				}
			]
		}
	]
}) => {
	return (
		<table className="result-table-th">
			<thead>
				<tr>
					<td></td>
					<td></td>
					{subjects.map((sub, i) => (
						<td colspan="2" className="vertical-td" key={i}>
							CURRENT SEMESTERCURRENT SEMESTER
						</td>
					))}

					<td colspan="3" rowspan="1" className="td-align-center">
						CURRENT SEMESTER
					</td>

					{semester !== "1" && (
						<td colspan="3" rowspan="1" className="td-align-center">
							PREVIOUS SEMESTER
						</td>
					)}
					<td colspan="3" rowspan="1" className="td-align-center">
						CUMULATIVE
					</td>
				</tr>
				<tr>
					<td></td>
					<td>CREDIT UNIT</td>
					{creditUnit.map((cred, i) => (
						<td className="td-align-center" colspan="2" key={i}>
							{cred}
						</td>
					))}

					<td rowspan="2" className="vertical-td">
						CURRENT SEMESTER
					</td>
					<td rowspan="2" className="vertical-td">
						CUMULATIVE
					</td>
					<td rowspan="2" className="vertical-td">
						CURRENT SEMESTER
					</td>

					{semester !== "1" && (
						<>
							<td rowspan="2" className="vertical-td">
								CUMULATIVE
							</td>
							<td rowspan="2" className="vertical-td">
								CURRENT SEMESTER
							</td>
							<td rowspan="2" className="vertical-td">
								CUMULATIVE
							</td>
						</>
					)}

					<td rowspan="2" className="vertical-td">
						CUMULATIVE
					</td>
					<td rowspan="2" className="vertical-td">
						CURRENT SEMESTER
					</td>
					<td rowspan="2" className="vertical-td">
						CUMULATIVE
					</td>
				</tr>
				<tr>
					<td>SN</td>
					<td>STUDENT NAME AND REG NO</td>
					{creditUnit.map((cred, i) => (
						<>
							<td className="td-align-center">GR</td>
							<td className="td-align-center">GP</td>
						</>
					))}
				</tr>
			</thead>
			<tbody>
				{students.map((students, i) => (
					<tr>
						<td>{i + 1}</td>
						<td>
							{students.name}
							<br /> {students.reg}
						</td>
						{students?.subjects?.map((stud) => (
							<>
								<td>{stud.gr}</td>
								<td>{stud.gp}</td>
							</>
						))}
						<td>1</td>
						<td>2</td>
						<td>3</td>
						{semester !== "1" && (
							<>
								<td>7</td>
								<td>8</td>
								<td>9</td>
							</>
						)}
						<td>4</td>
						<td>5</td>
						<td>6</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
