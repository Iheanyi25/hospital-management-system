import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";

export const ReportsRouter = ({
	component,
	path,
	exact,
	purpose,
	title,
	user,
	...rest
}) => {
	const Component = component;
	const paths = useMemo(
		() => [
			// {
			// 	title: "Sub-degree Reports",
			// 	path: "/reports/jupeb_reports",
			// 	disabled: false
			// },
			{
				title: "Application Payment Reports",
				path: "/reports/application_reports",
				disabled: false
			},
			{
				title: "Fees Payment Reports",
				path: "/reports/payment_reports",
				disabled: false
			},
			{
				title: "PUTME Reports",
				path: "/reports/putme_reports",
				disabled: false
			},
			{
				title: "Admission List Report",
				path: "/reports/admission_list",
				disabled: false
			},
			// {
			// 	title: "PG Reports",
			// 	path: "/reports/pg_reports",
			// 	disabled: false
			// },
			// {
			// 	title: "Course Reg. Reports",
			// 	path: "/reports/course_reg_reports",
			// 	disabled: false
			// },
			{
				title: "Matric No. Reports",
				path: "/reports/matric_number_generation_reports",
				disabled: false
			},
			{
				title: "Sundry Reports",
				path: "/reports/sundry",
				disabled: false
			},
			{
				title: "Cash Book Reports",
				path: "/reports/cash_book_reports",
				disabled: false
			}
			// {
			// 	title: "Hostel Reports",
			// 	path: "/reports/hostel_reports",
			// 	disabled: false
			// },
			// {
			// 	title: "Hostel Summary Reports",
			// 	path: "/reports/hostel_summary_reports",
			// 	disabled: false
			// }
		],
		[]
	);
	return (
		<Route
			exact={exact}
			path={path}
			{...rest}
			render={(props) => {
				return (
					<TabLayout title={title} paths={paths}>
						<Component {...rest} {...props} />
					</TabLayout>
				);
			}}
		/>
	);
};
