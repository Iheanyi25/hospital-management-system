import { memo, useEffect, useMemo, useRef } from "react";
import { PageTitle, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";

import { StudentDetails, StaffDetails } from "./components";

import { parent } from "../../../ui_elements/layout/layout";

import { useApiGet } from "../../../api/apiCall";
import { getDepartmentsUrl, getRelationshipsUrl } from "../../../api/urls";

import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const StaffRequestApplication = () => {
	const { basicInformationResponse } = useSelector(
		(state) => state.staffRequestData
	);
	const ref = useRef();

	const { hash, state } = useLocation();

	const { push } = useHistory();

	if (!state?.fromVerify) {
		push("/staff_request_login");
	}

	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);

	const { data: departments, isLoading: isLoadingDepartments } = useApiGet(
		getDepartmentsUrl(basicInformationResponse?.StudentType?.value),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: relationships, isLoading: isLoadingRelationShips } =
		useApiGet(getRelationshipsUrl(), {
			refetchOnWindowFocus: false
		});

	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);

	const allRelationships = formatSelectItems(
		relationships?.data,
		"name",
		"id"
	);

	const navs = useMemo(
		() => [
			{
				linkName: "Student Details",
				hashName: "#section_a",
				state
			},
			{
				linkName: "Staff Details",
				hashName: "#section_b",
				state
			}
		],
		[state]
	);

	if (isLoadingDepartments || isLoadingRelationShips) return <Spinner />;

	return (
		<div className={styles.container} ref={ref}>
			<div className="row mb-3 mx-5">
				<div className="col-12 col-md-2 col-lg-2 d-flex align-items-end">
					<Avatar
						name={`${basicInformationResponse?.Firstname} ${basicInformationResponse?.Lastname}`}
						className={styles.profile_img}
						src={basicInformationResponse?.Passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<div className="">
						<PageTitle
							title={`${basicInformationResponse?.Firstname} ${basicInformationResponse?.Lastname}`}
						/>
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
					<DisplayInformation
						allDepartments={allDepartments}
						allRelationships={allRelationships}
					/>
				</div>
			</div>
		</div>
	);
};

export default StaffRequestApplication;

const DisplayInformation = memo(({ allDepartments, allRelationships }) => {
	const location = useLocation();
	switch (location.hash) {
		case "#section_a":
			return <StudentDetails />;
		case "#section_b":
			return (
				<StaffDetails
					allDepartments={allDepartments}
					allRelationships={allRelationships}
				/>
			);
		default:
			return <StudentDetails />;
	}
});
