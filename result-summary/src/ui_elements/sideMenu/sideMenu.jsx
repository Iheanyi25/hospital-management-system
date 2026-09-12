import logo from "../../assets/images/sideLogo.png";
import christmasLogo from "../../assets/images/christmasLogo.png";
import { useHistory } from "react-router-dom";
import "./sideMenu.css";
import { sorter } from "../../utils/sorter";
import { checkIfChristmasPeriod } from "../../utils/checkIfChristmasPeriod";

const SideMenu = ({ paths, closeSide = () => {}, setSignOutModal }) => {
	const history = useHistory();
	const { location } = useHistory();
	const openPath = (path) => {
		history.push(path);
	};
	const activateLink = (root) => {
		return location.pathname.split("/")[1] === root.split("/")[1];
	};

	const openModal = () => {
		closeSide();
		setSignOutModal(true);
	};

	return (
		<div className="res-side-menu--wrapper">
			<div className="red-side-menu">
				<section className="red-side-menu-head d-flex align-items-center">
					<button
						className="aui-icon aui-icon-small aui-iconfont-cross"
						onClick={closeSide}
					>
						close side menu
					</button>
					<img
						src={checkIfChristmasPeriod() ? christmasLogo : logo}
						alt="school logo"
						className="red-logo-side"
					/>
				</section>
				<section className="red-side-module">
					{/* <header className="red-module-title">MODULES</header> */}
					<ul>
						{paths?.sort(sorter("name"))?.map((link, i) => {
							if (link.disabled) {
								return (
									<li
										className={`red-side-module-disabled active`}
										key={i}
									>
										Nav Item
									</li>
								);
							} else {
								return (
									<li
										onClick={() => {
											closeSide();
											openPath(link.path);
										}}
										tabIndex={-1}
										className={`${
											activateLink(link.path)
												? "activate_nav"
												: "inactive_nav"
										}`}
										key={i}
									>
										{link.name}
									</li>
								);
							}
						})}
						{/* <li
							onClick={openModal}
							tabIndex={-1}
							className="inactive_nav"
						>
							Sign Out
						</li> */}
					</ul>
				</section>
			</div>
		</div>
	);
};

export { SideMenu };
