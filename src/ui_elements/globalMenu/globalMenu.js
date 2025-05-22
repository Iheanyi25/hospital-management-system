import { useState } from "react";
import logo from "../../assets/images/sideLogo.png";
import globalMenuIcon from "../../assets/svgs/globalMenuIcon.svg";
import cancel from "../../assets/svgs/cancel.svg";
import Avatar from "react-avatar";
import "./globalMenu.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../button/Button";
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
			name: "Verify Admission Status",
			route: "/verify_account"
		},
		{
			name: "Check Admission No",
			route: "/prospective_students"
		},
		{
			name: "Verify Payment Status",
			route: "/verify_remita_status"
		},
		{
			name: "E-learning",
			route: "/prospective_students"
		},
		{
			name: "E-Voting",
			route: "http://evoting.akwaibompoly.edu.ng/akwapoly/evoting"
		}
	];

	// const buttonGroupData = [
	// 	{ name: "Home", link: "/home" },
	// 	{ name: "About Us", link: "/about" },
	// 	{ name: "Services", link: "/services" },
	// 	{ name: "Contact Us", link: "/contact" }
	// ];

	return (
		<section className="red-global-menu">
			<div className={`d-flex align-items-center`}>
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
						<div
							className={`d-flex align-items-center gap-2  logo`}
							onClick={() => push("/")}
						>
							<img
								className="xmas-logo"
								src={ChristmasLogo}
								alt="akwapoly logo"
							/>
							{/* <img src={ChristmasLogo} alt="akwapoly logo" /> */}
						</div>
					) : (
						<div
							className={`d-flex align-items-center gap-2 logo`}
							onClick={() => push("/")}
						>
							<img src={logo} alt="akwapoly logo" />
						</div>
					)}
				</div>
			</div>
			<div className={`w-100 d-flex align-items-center py-3`}>
				{isLanding === "unAuthenticated" ? (
					<div
						className={`global-landing-page-link-container ${
							menu && `retract-navigation`
						}`}
					>
						<button
							onClick={() => setMenu(false)}
							className="cancel-button"
						>
							<img src={cancel} alt="" />
						</button>

						{linkOptions.map((link, i) =>
							link.route.includes("http") ? (
								<a
									key={i}
									className="global-landing-page-links"
									href={link.route}
									target="_blank"
									rel="noreferrer"
								>
									{link.name}
								</a>
							) : (
								<button
									key={i}
									className="global-landing-page-links"
									onClick={() => push(link.route)}
								>
									{link.name}
								</button>
							)
						)}
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
