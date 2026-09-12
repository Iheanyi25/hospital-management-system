import { DefaultScreen, Button, PageTitle } from "../../../../ui_elements";

import styles from "../style.module.css";

export const EmptyState = ({ registerCourses }) => {
	return (
		<section>
			<PageTitle title={"Course Registration"} />
			<div className={styles.container}>
				<DefaultScreen
					title={"Register your courses"}
					message={
						"Welcome, You have no registered courses. Start by clicking on the button to register."
					}
					buttonGroup={
						<Button
							data-cy="register_course_2"
							label={"Register Courses"}
							buttonClass={"primary"}
							onClick={registerCourses}
						/>
					}
				/>
			</div>
		</section>
	);
};
