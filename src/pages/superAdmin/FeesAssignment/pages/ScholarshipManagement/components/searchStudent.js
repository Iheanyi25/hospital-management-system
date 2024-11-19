import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { AsyncMultiSelect, Button } from "../../../../../../ui_elements";
import { studentsApiOptions } from "../../../../../../utils/apiOptions";

export const schema = yup.object().shape({
	matricNo: yup.mixed().required("please select a student")
});

export const SearchStudent = ({ setMatricNo, isLoading }) => {
	const {
		handleSubmit,
		setValue,
		control,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	const onSubmit = (data) => {
		const { matricNo } = data;
		setMatricNo(matricNo.value);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section>
				<div className="row">
					<div className="row col-lg-8 row align-items-center">
						<div className="col-lg-3 align-items-center">
							<label
								className="font-weight-bold"
								htmlFor="matricNo"
							>
								Matric No.
							</label>
						</div>
						<div className="col-lg-6">
							<Controller
								name="matricNo"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<AsyncMultiSelect
										placeholder="Search by matric number/name"
										id="matricNo"
										apiOptions={studentsApiOptions}
										isMulti={false}
										isClearable
										onChange={(data) =>
											setValue(
												"matricNo",
												data?.length > 0 ? data : null
											)
										}
										{...field}
										isError={!!errors.matricNo}
										required
									/>
								)}
							/>
						</div>
						<div className="col-lg-3">
							<Button
								label="View Records"
								type="submit"
								onClick={handleSubmit(onSubmit)}
								loading={isLoading}
							/>
						</div>
					</div>
				</div>
			</section>
		</form>
	);
};
