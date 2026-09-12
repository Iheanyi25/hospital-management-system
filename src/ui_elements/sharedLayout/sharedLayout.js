import { createRef, memo, useCallback } from "react";
import { NavMenuBar } from "../index";
import logo from "../../assets/images/sideLogo.png";
import christmasLogo from "../../assets/images/christmasLogo.png";
import "./sharedLayout.css";
import { useHistory } from "react-router-dom";
import { checkIfChristmasPeriod } from "../../utils/checkIfChristmasPeriod";
export const sharedParent = createRef(null);

export const SharedLayout = memo(({ subMenus, children }) => {
	const { push } = useHistory();

	const renderModuleHeader = useCallback(() => {
		return (
			<div className="shared-header mb-5">
				<div className="d-flex justify-content-center align-items-center shared_img_container">
					<img
						src={checkIfChristmasPeriod() ? christmasLogo : logo}
						alt="Logo"
						onClick={() => push("/")}
					/>
				</div>
				{subMenus && (
					<div className="mt-5">
						<NavMenuBar
							navMenuItems={subMenus}
							customStyles="center-nav-menu"
						/>
					</div>
				)}
			</div>
		);
	}, [subMenus, push]);

	const renderModule = useCallback(() => {
		return (
			<section className="res-module">
				{renderModuleHeader()}
				<div
					className="shared-module-children position-relative"
					ref={sharedParent}
				>
					{children}
				</div>
			</section>
		);
	}, [renderModuleHeader, children]);
	return (
		<div className="shared-container">
			<div className="shared-children">{renderModule()}</div>
		</div>
	);
});
