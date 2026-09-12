import { memo, useEffect, useMemo, useRef } from "react";
import { PageTitle, SideTabs, ProfileContext } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation, useHistory } from "react-router";
import { ProgrammeDetails } from "./components";
import Avatar from "react-avatar";
import { useContext } from "react";

const ChangeOfDepartmentApplication = () => {
	const ref = useRef();
	const { hash, state } = useLocation();
	const { goBack } = useHistory();

	if (!state) {
		goBack();
	}
	const data = useContext(ProfileContext);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, [hash]);

	const navs = useMemo(
		() => [
			{
				linkName: "Department Details",
				hashName: "#section_a",
				state
			}
		],
		[state]
	);

	return (
		<div className={styles.container} ref={ref}>
			<div className="row mb-3 mx-5">
				<div className="col-12 col-md-2 col-lg-2 d-flex align-items-end pb-4">
					<Avatar
						name={`${data?.profileData?.personalData?.fullname}`}
						className={styles.profile_img}
						src={data?.profileData?.personalData?.passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<div className="">
						<PageTitle title={`Change of Degree Form`} />
					</div>
				</div>
			</div>
			<div className="row mx-5">
				<div className="col-12 col-md-2 col-lg-2">
					<div className={styles.key_comes_tabs}>
						<div className={styles.key_comes_sticky}>
							<SideTabs
								navItems={navs}
								disallowForwardMovement={true}
							/>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<DisplayInformation />
				</div>
			</div>
		</div>
	);
};

const DisplayInformation = memo(() => <ProgrammeDetails />);

export default ChangeOfDepartmentApplication;
