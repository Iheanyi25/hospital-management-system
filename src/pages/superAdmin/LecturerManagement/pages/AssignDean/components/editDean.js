import {
	AsyncMultiSelect,
	Button,
	TextField
} from "../../../../../../ui_elements";
import { useApiPut } from "../../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import {
	assignDeantoFacultyUrl,
	getAllDeansUrl
} from "../../../../../../api/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import { lecturersApiOptions } from "../../../../../../utils/apiOptions";

export const schema = yup.object().shape({
	lecturerId: yup.mixed().required("please select a lecturer")
});
export const EditDean = ({ data, filter, currentState, closeModal }) => {
	const { facultyId } = data;
	const queryClient = useQueryClient();
	const { mutate, isLoading } = useApiPut();
	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({ resolver: yupResolver(schema) });
	const onSubmit = (data) => {
		const requestDet = {
			url: assignDeantoFacultyUrl(),
			data: {
				lecturerId: data?.lecturerId.value,
				facultyId,
				sessionId: filter?.sessionId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(getAllDeansUrl(currentState));
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "HOD Assingment Successful!",
					body: "You successfully assigned HOD to department"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "HOD Assignment Failure",
					body: response?.data?.message || `Operation Failure`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	return (
		<form className={`w-100 mt-5`} onSubmit={handleSubmit(onSubmit)}>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="faculty">Faculty</label>
				</div>
				<div className="col-lg-9">
					<TextField
						type="text"
						placeholder="Enter faculty"
						id="faculty"
						value={data?.faculty}
						disabled
					/>
				</div>
			</div>
			{data.deanOfFaculty && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="department">Current Dean</label>
					</div>
					<div className="col-lg-9">
						<TextField
							type="text"
							placeholder="Enter department"
							id="department"
							value={data?.deanOfFaculty}
							disabled
						/>
					</div>
				</div>
			)}

			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="lecturerId">New Dean</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="lecturerId"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<AsyncMultiSelect
								placeholder="Search by lecturer name/email"
								id="lecturerId"
								apiOptions={lecturersApiOptions}
								isMulti={false}
								isClearable
								onChange={(data) =>
									setValue(
										"lecturerId",
										data?.length > 0 ? data : null
									)
								}
								{...field}
								isError={!!errors.lecturerId}
								errorText={
									errors.lecturerId &&
									errors.lecturerId.message
								}
								required
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					label={data?.headOfDepartment ? "Update" : "Assign"}
					data-cy="update_hod"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
