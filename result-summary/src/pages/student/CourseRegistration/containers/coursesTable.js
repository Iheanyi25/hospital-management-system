import { useHistory } from "react-router-dom";
import { PageTitle, Button } from "../../../../ui_elements";
import { Table } from "../components";

export const CoursesTable = ({ registeredCoursesTableData }) => {
	const history = useHistory();
	const registerCourses = () => {
		history.push("/course_registration/session");
	};

	return (
		<section>
			<PageTitle
				title={"Course Registration"}
				buttonGroup={
					registeredCoursesTableData.data?.length > 0 && (
						<Button
							data-cy="register_course_1"
							buttonClass={"primary"}
							label={"Register Courses"}
							onClick={registerCourses}
						/>
					)
				}
			/>
			<Table data={registeredCoursesTableData} />
		</section>
	);
};
