import { memo, useCallback, useMemo } from "react";
import { NavMenuBar } from "../index";
import { Layout } from "../layout/layout";

import "./admissionListLayout.css";

export const AdmissionListLayout = memo(
	({ title = "Performance Management", children }) => {
		const paths = useMemo(
			() => [
				{
					title: "Manage Course",
					path: "/course_management/manage_course",
					disabled: false
				},
				{
					title: "Assign Course",
					path: "/course_management/assign_course",
					disabled: false
				},
			],
			[]
		);

		const renderModuleHeader = useCallback(() => {
			return (
				<div className="res-module-header mb-5">
					<NavMenuBar navMenuItems={paths} />
				</div>
			);
		}, [paths]);

		const renderModule = useCallback(() => {
			return (
				<section className="res-module">
					{renderModuleHeader()}
					<div className="module-children position-relative">
						{children}
					</div>
				</section>
			);
		}, [renderModuleHeader, children]);
		return (
			<>
				<Layout title={title}>{renderModule()}</Layout>
			</>
		);
	}
);
