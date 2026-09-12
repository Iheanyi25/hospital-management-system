import React, { forwardRef } from "react";
import AsyncSelect from "react-select/async";
import { selectStyles, ValidationText } from "..";

export const AsyncMultiSelect = forwardRef(
	(
		{
			onChange = () => {},
			placeholder = "Hello",
			disabled,
			loading,
			defaultInputValue,
			value,
			searchable,
			id,
			apiOptions,
			isError = false,
			errorText = "",
			...field
		},
		ref
	) => {
		return (
			<>
				<AsyncSelect
					{...field}
					placeholder={placeholder}
					onChange={onChange}
					isDisabled={disabled}
					isLoading={loading}
					loadOptions={apiOptions}
					styles={selectStyles({ isError })}
					ref={ref}
				/>
				<div>
					{errorText.length > 0 && (
						<ValidationText status={"error"} message={errorText} />
					)}
				</div>
			</>
		);
	}
);
