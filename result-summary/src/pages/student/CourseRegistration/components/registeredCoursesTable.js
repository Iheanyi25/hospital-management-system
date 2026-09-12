import { TMTable } from "../../../../ui_elements";

export const Table = ({ data }) => {
	return (
		<div className="mt-5">
			<TMTable
				columns={data.header}
				data={data.data}
				title={"Registered Courses History"}
			/>
		</div>
	);
};
