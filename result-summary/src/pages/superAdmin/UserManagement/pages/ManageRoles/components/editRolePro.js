import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { useQueryClient } from "react-query";

import { useApiGet, useApiPost } from "../../../../../../api/apiCall";
import {
	getRoleClaimsUrl,
	getRolesUrl,
	updateRoleClaimsUrl
} from "../../../../../../api/urls";

import { Add, Minus } from "../../../../../../assets/svgs";
import {
	Button,
	Checkbox,
	Jumbotron,
	Spinner
} from "../../../../../../ui_elements";

import styles from "./componentsStyle.module.css";

export const EditRolePro = ({
	isOpen,
	closeModal,
	modalId,
	data,
	currentFilterState
}) => {
	const [currentAccordion, setcurrentAccordion] = useState(0);
	const [roleClaims, setRoleClaims] = useState("");

	const { name, data: claims } = data;

	const {
		data: roleClaimsData,
		isLoading
		// error
	} = useApiGet(
		getRoleClaimsUrl({
			role: name
		}),
		{
			refetchOnWindowFocus: false,
			enabled: !!name
		}
	);
	const { mutate, isLoading: isSubmitLoading } = useApiPost();
	const queryClient = useQueryClient();

	const flattenedClaims = () => {
		let result = [];
		for (const typeOfClaim of roleClaims) {
			result.push(...typeOfClaim?.claims);
		}
		return result;
	};

	const roleClaimChecker = useCallback(
		(claim) => {
			if (roleClaims) {
				for (const typeOfClaim of roleClaims) {
					if (typeOfClaim?.claims?.includes(claim)) {
						return true;
					}
				}
			}
			return false;
		},
		[roleClaims]
	);

	const roleMenuToggler = useCallback((menuClaims, allClaims) => {
		if (menuClaims?.length > 0) {
			return menuClaims?.every((element) => {
				return allClaims.includes(element);
			});
		}
		return false;
	}, []);

	const roleMenuChecker = (menu, claims) => {
		if (roleClaims.filter((data) => data?.menu === menu).length === 0) {
			setRoleClaims((currentRoleClaims) => [
				...currentRoleClaims,
				{ menu, claims: [...claims] }
			]);
		} else {
			setRoleClaims(roleClaims.filter((data) => data?.menu !== menu));
		}
	};

	const roleClaimUpdater = (menu, claim) => {
		if (roleClaims) {
			const selectedRoleClaimState = roleClaims?.filter(
				(data) => data?.menu === menu
			);
			const newRoleClaimState = roleClaims?.filter(
				(data) => data?.menu !== menu
			);

			if (!selectedRoleClaimState?.length) {
				setRoleClaims([
					{
						menu,
						claims: [claim]
					},
					...roleClaims
				]);
				return;
			}

			if (selectedRoleClaimState?.[0]?.claims?.includes(claim)) {
				setRoleClaims([
					{
						menu,
						claims: selectedRoleClaimState?.[0]?.claims?.filter(
							(claimItem) => claimItem !== claim
						)
					},
					...newRoleClaimState
				]);
			} else {
				setRoleClaims([
					{
						menu,
						claims: [claim, ...selectedRoleClaimState?.[0].claims]
					},
					...newRoleClaimState
				]);
			}
		}
	};

	const onSubmit = () => {
		const requestDet = {
			url: updateRoleClaimsUrl(),
			data: {
				Role: name,
				Claims: flattenedClaims()
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(getRolesUrl(currentFilterState));
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Claims updated!",
					body: "Your have successfully updated this role's claims"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Claim Update Failed!",
					body:
						response?.data?.message ||
						`Claim wasn't updated successfully`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	useEffect(() => {
		if (roleClaimsData) {
			setRoleClaims(roleClaimsData?.data);
		}
	}, [roleClaimsData]);

	return (
		<Modal
			id={modalId}
			isOpen={isOpen}
			onRequestClose={closeModal}
			closeTimeoutMS={500}
			className={`${styles.editProfileModal}`}
			overlayClassName="myoverlay"
			style={{ padding: "0px !important" }}
		>
			<Jumbotron
				headerText={name}
				footerStyle={"d-flex justify-content-end"}
				footerContent={
					<>
						<Button
							data-cy={`default_edit_role`}
							label={"Save"}
							buttonClass="primary"
							onClick={onSubmit}
							loading={isSubmitLoading}
						/>
						<Button
							data-cy={`default_edit_role`}
							label="Cancel"
							buttonClass="standard"
							onClick={closeModal}
						/>
					</>
				}
			>
				{isLoading ? (
					<Spinner />
				) : (
					<div className="p-4">
						<h5 className={`mb-3 ${styles.headerDetails}`}>
							Change {name} claims
						</h5>
						<Jumbotron headerText={"Claims or Rights"}>
							<div className="p-4">
								{claims && claims?.length > 0
									? claims?.map((claimObject, index) => (
											<section
												className={`${styles.borderBottom} mb-4 pb-2 cursor-pointer`}
												role="button"
												key={claimObject?.menu + index}
											>
												<div className="d-flex align-items-center justify-content-between">
													<Checkbox
														id={
															claimObject?.menu +
															index
														}
														label={
															claimObject?.menu
														}
														labelClassName={`${styles.topLevelLabel} ml-3`}
														checked={roleMenuToggler(
															claimObject?.claims,
															flattenedClaims()
														)}
														onSelect={() =>
															roleMenuChecker(
																claimObject?.menu,
																claimObject?.claims
															)
														}
													/>
													<span
														onClick={() =>
															setcurrentAccordion(
																currentAccordion !==
																	index
																	? index
																	: null
															)
														}
													>
														{currentAccordion !==
														index ? (
															<Add />
														) : (
															<Minus />
														)}
													</span>
												</div>
												<div
													className={`row px-4 mt-4 ${
														currentAccordion !==
														index
															? "d-none"
															: ""
													}`}
												>
													{claimObject?.claims?.map(
														(item, index) => (
															<div
																className={`col-3 mb-3`}
															>
																<Checkbox
																	id={item}
																	labelClassName={`${styles.subLevelLabel} ml-3 text-capitalize`}
																	key={
																		index +
																		item
																	}
																	label={item}
																	checked={roleClaimChecker(
																		item
																	)}
																	onSelect={() =>
																		roleClaimUpdater(
																			claimObject?.menu,
																			item
																		)
																	}
																/>
															</div>
														)
													)}
												</div>
											</section>
									  ))
									: ""}
							</div>
						</Jumbotron>
					</div>
				)}
			</Jumbotron>
		</Modal>
	);
};
