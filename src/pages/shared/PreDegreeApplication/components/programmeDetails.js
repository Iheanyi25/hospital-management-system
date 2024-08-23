import { useEffect } from "react";
import { Jumbotron, Button, SMSelect } from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PRE_DEGREE_INFO } from "../../../../store/constant";
import { ProgrammeDetailsSchema } from "../predegreeSchema";
import { useApiPost } from "../../../../api/apiCall";
import { updatePredegreeProgrammeFormUrl } from "../../../../api/urls";

export const ProgrammeDetails = ({ allDepartments }) => {
	const predegreeData = useSelector((state) => state.predegreeData);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/pre_degree_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			department: predegreeData?.programmeInfo?.department
		},
		resolver: yupResolver(ProgrammeDetailsSchema)
	});
	const onSubmit = (programmeInfo) => {
		const requestBody = {
			url: updatePredegreeProgrammeFormUrl(),
			data: {
				applicantId: predegreeData?.applicantId,
				rrr: predegreeData?.personalInfo?.rrr,
				departmentId: programmeInfo?.department.value
			}
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Details saved successfully",
					body: "Your programme details has been successfully saved"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: SAVE_PRE_DEGREE_INFO,
					payload: {
						...predegreeData,
						programmeInfo
					}
				});
				replace({ hash: "#section_c", state });
			},
			onError: () => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: "Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	useEffect(() => {
		if (errors?.utmeResultSlip) {
			const successFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "You have to upload your UTME slip!"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	}, [errors]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={"Programme Details"}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Next"
						buttonClass="primary"
						type="submit"
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="department">
								Department Applying to
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="department"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a department"
										searchable={false}
										options={allDepartments}
										isError={errors?.department}
										errorText={
											errors?.department &&
											errors?.department?.message
										}
										id="department"
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
