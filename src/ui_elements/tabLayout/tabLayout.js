import { memo, useCallback } from "react";
import { NavMenuBar } from "../index";
import { Layout } from "../layout/layout";

import "./tabLayout.css";

export const TabLayout = memo(
	({ title = "Performance Management", children, paths }) => {
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
