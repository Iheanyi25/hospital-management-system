import { useMemo } from "react";
import { Route } from "react-router-dom";
import { TabLayout } from "../../ui_elements";
import { STUDENT_TYPES, STUDENT_TYPE_HOLDER } from "../../utils/constants";
import { useCookies } from "react-cookie";

export const AcademicFeesRouter = ({
	component,
	path,
	exact,
	purpose,
	title,
	user,
	...rest
}) => {
	const Component = component;
	const [cookies] = useCookies([STUDENT_TYPE_HOLDER]);
	const { [STUDENT_TYPE_HOLDER]: studentTypeId } = cookies;
	const paths = useMemo(
		() => [
			{
				title: "School Fees",
				path: "/academic_fees/school_fees",
				disabled: false
			},
			{
				title: "Other Fees",
				path: "/academic_fees/sundry",
				disabled: false
			},
			{
				title: "Acceptance",
				path: "/academic_fees/acceptance",
				disabled: false
			}
			// {
			// 	title: "Change of Degree",
			// 	path: "/academic_fees/change_of_degree",
			// 	disabled: false
			// }
		],
		[]
	);
	const pgPathsToRemove = ["Change of Degree"];
	const jupebPathsToRemove = ["Change of Degree", "Other Fees"];

	const newPaths =
		Number(studentTypeId) === STUDENT_TYPES.POSTGRADUATE
			? paths.filter((item) => !pgPathsToRemove.includes(item.title))
			: Number(studentTypeId) === STUDENT_TYPES.JUPEB
			? paths.filter((item) => !jupebPathsToRemove.includes(item.title))
			: paths;
	return (
		<Route
			exact={exact}
			path={path}
			{...rest}
			render={(props) => {
				return (
					<TabLayout title={title} paths={newPaths}>
						<Component {...rest} {...props} />
					</TabLayout>
				);
			}}
		/>
	);
};
