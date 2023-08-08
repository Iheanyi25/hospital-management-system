import { useState } from "react";
import logo from "../../assets/images/sideLogo.png";
import globalMenuIcon from "../../assets/svgs/globalMenuIcon.svg";
import cancel from "../../assets/svgs/cancel.svg";
import Avatar from "react-avatar";
import "./globalMenu.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import { TENECE_SUPPORT_URL } from "../../utils/constants";
import { checkIfChristmasPeriod } from "../../utils/checkIfChristmasPeriod";
import ChristmasLogo from "../../assets/images/christmasLogo.png";

const GlobalMenu = ({
	title = "Components",
	openSide = () => {},
	setSignOutModal,
	userName,
	isLanding
}) => {
	const { push } = useHistory();
	const [menu, setMenu] = useState(false);

	const linkOptions = [
		{
			name: "Home",
			route: "/"
		}
		// {
		// 	name: "Check Admission Status",
		// 	route: "/prospective_students"
		// }
	];

	return (
		<section className="red-global-menu">
			<div className="d-flex align-items-center">
				{isLanding !== "unAuthenticated" ? (
					<button className="red-hamburger-menu" onClick={openSide}>
						<img src={globalMenuIcon} alt="open side menu" />
					</button>
				) : (
					<button
						className="red-hamburger-menu responsive-hamburger-menu"
						onClick={() => setMenu(true)}
					>
						<img src={globalMenuIcon} alt="open side menu" />
					</button>
				)}
				<div className="red-global-logo">
					{checkIfChristmasPeriod() ? (
						<>
							<img src={ChristmasLogo} alt="fupre logo" />
							<img src={ChristmasLogo} alt="fupre logo" />
						</>
					) : (
						<>
							<img src={logo} alt="fupre logo" />
							<img src={logo} alt="fupre logo" />
						</>
					)}
				</div>
				{isLanding === "unAuthenticated" ? (
					<div
						className={`red-current-module global-landing-page-link-container ${
							menu && `retract-navigation`
						}`}
					>
						<button
							onClick={() => setMenu(false)}
							className="cancel-button"
						>
							<img src={cancel} alt="" />
						</button>

						{linkOptions.map((link, i) => (
							<button
								key={i}
								className="global-landing-page-links"
								onClick={() => push(link.route)}
							>
								{link.name}
							</button>
						))}

						<a href={TENECE_SUPPORT_URL}>
							<button className="global-landing-page-links">
								Support
							</button>
						</a>
					</div>
				) : (
					<div className="red-current-module">{title}</div>
				)}
			</div>
			{isLanding !== "unAuthenticated" ? (
				<div className="dropdown">
					<section
						id="navDrop"
						data-toggle="dropdown"
						role="button"
						data-cy="open_avatat"
					>
						<Avatar
							name={userName ?? "Guest"}
							round
							size="32"
							className="global-avatar"
							maxInitials={2}
						/>
					</section>
					<section className="dropdown-menu res-role">
						<h3 className="res-user">
							{userName?.toUpperCase() ?? "guest"}
						</h3>
						<Link
							data-cy="profile"
							className="mb-0 res-role-txt"
							to="/profile"
						>
							Profile
						</Link>

						<section className="res-wrapper">
							<h3 className="res-user">Settings</h3>
							<div className="d-flex align-items-center justify-content-between res-roles">
								<div
									className="d-flex align-items-center"
									onClick={() => push("/change_password")}
								>
									<p className="mb-0 mx-0">Change Password</p>
								</div>
							</div>
						</section>

						<section>
							<p
								className="mb-0 res-role-txt mt-3"
								onClick={() => setSignOutModal(true)}
							>
								Logout
							</p>
						</section>
					</section>
				</div>
			) : (
				<Button
					onClick={() => push("/login")}
					data-cy="default"
					buttonClass="primary"
					label="Login"
				/>
			)}
		</section>
	);
};

export { GlobalMenu };
