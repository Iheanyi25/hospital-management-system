export function formatCourses({ courses, value, courseCode, couseTitle }) {
	return courses?.length > 0
		? courses.map((course) => {
				return {
					value: course[value],
					label: `${course[courseCode]} - ${course[couseTitle]}`
				};
		  })
		: [];
}
