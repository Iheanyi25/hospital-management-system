import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useApiGet, useApiPost } from "../../../../../api/apiCall";
import {
	generateApplicationInvoiceUrl,
	getApplicationInvoiceData
} from "../../../../../api/urls";
import { ApplicationCard, Spinner } from "../../../../../ui_elements";
import { APPLICATION_ID } from "../../../../../utils/constants";
import NDPreview from "../../ndPreview";
import { NDResult } from "../../ndResult";
import { NDResultSlip } from "../../ndResultSlip";

const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 1rem;
}

// @media all {
//   .pagebreak {
//     display: none;
//   }
// }

@media print {
.pagebreak {
// page-break-before: always;

}
}
`;

const requestFormPageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 0rem;
}

// @media all {
//   .pagebreak {
//     display: none;
//   }
// }

@media print {
.pagebreak {
// page-break-before: always;

}
}
`;

export const Cards = ({ details }) => {
	const componentRef = useRef();
	const requestFormRef = useRef();
	const resultRef = useRef();
	const handleNDPrintOut = useReactToPrint({
		content: () => componentRef.current,
		pageStyle
	});
	const handleScreeningPrintOut = useReactToPrint({
		content: () => requestFormRef.current,
		pageStyle: requestFormPageStyle
	});
	const handleResultPrintOut = useReactToPrint({
		content: () => resultRef.current,
		pageStyle: requestFormPageStyle
	});

	const { push } = useHistory();

	const { mutate, isLoading: isPosting } = useApiPost();

	const {
		data: invoiceData,
		isFetching: isLoading,
		error: requestError
	} = useApiGet(
		getApplicationInvoiceData({
			ApplicationTypeId: 3,
			RegNumber: details?.regNumber
		}),
		{
			refetchOnWindowFocus: false
		}
	);

	const handleNDResultWhenIsNull = () => {
		const errorFlag = window.AJS.flag({
			type: "error",
			title: "Invalid Action!",
			body: "Your Jamb Registration Number is not Found in the Result Database"
		});
		setTimeout(() => {
			errorFlag.close();
		}, 3000);
	};

	const handleGenerateInvoice = () => {
		const requestDet = {
			url: generateApplicationInvoiceUrl(),
			data: {
				Lastname: details?.personalInfoResponse?.surname,
				FirstName: details?.personalInfoResponse?.firstname,
				MiddleName: details?.personalInfoResponse?.middlename,
				MobileNumber: details?.personalInfoResponse?.mobileNumber,
				RegNumber: details?.regNumber,
				Email: details?.personalInfoResponse?.email,
				SessionId: details?.personalInfoResponse?.sessionId,
				Amount: invoiceData?.data?.amount,
				ApplicationTypeId: 3
			}
		};

		mutate(requestDet, {
			onSuccess: (data) => {
				push({
					pathname: `/invoice_generate_putme_slip`,
					state: { data: data?.data?.data }
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice Action Successful!",
					body: "Invoice generated successfully!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 3000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice Action Failed!",
					body:
						response?.data?.message || `Invoice generated failed!!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 3000);
			}
		});
	};

	const ifHasGeneratedPostUtmeResultCheckingInvoice = [
		{
			title: "Screening Result Slip",
			description: "Click the button below to generate your invoice",
			linkTitle: "Generate Invoice",
			onClick: () => handleGenerateInvoice(),
			isLoading: isPosting
		}
	];

	const ifHasPaidForPostUtmeResultCheckingInvoice = [
		{
			title: "Screening Result Slip",
			description: "Click the button below to generate your invoice",
			linkTitle: "Print Screening Result Slip",
			onClick: () =>
				details.postUtmeResponse === null
					? handleNDResultWhenIsNull()
					: handleScreeningPrintOut()
		}
	];

	const items = [
		{
			title: "ND Print Out",
			description:
				"Click the link below to print out your ND slip.",
			linkTitle: "Print ND Slip",
			onClick: () => handleNDPrintOut()
		},

		...(details?.hasPaidForPostUtmeResultCheckingInvoice
			? ifHasPaidForPostUtmeResultCheckingInvoice
			: ifHasGeneratedPostUtmeResultCheckingInvoice),
		{
			title: "PUTME Result",
			description:
				"Click the link below to print your pre-admission screening result",
			linkTitle: "Print Result",
			onClick: () => handleResultPrintOut(),
			disabled: true // disabled on demand by Iheanyi
		}
	];

	if (isLoading)
		return (
			<div className="mt-5">
				<Spinner />
			</div>
		);

	if (requestError) return <p>{"An error occured, please contact admin"}</p>;

	return (
		<>
			<div className="d-none">
				<NDPreview componentRef={componentRef} details={details} />
			</div>
			<div className="d-none">
				<NDResultSlip
					componentRef={requestFormRef}
					details={details}
				/>
			</div>
			<div className="d-none">
				<NDResult componentRef={resultRef} details={details} />
			</div>
			<div className="row justify-content-center mt-5">
				<div className={`col-12 col-lg-10 px-0`}>
					<div className="row">
						{items.map(
							(
								{
									title,
									description,
									linkTitle,
									onClick,
									disabled,
									isLoading
								},
								index
							) => (
								<div className="col-12 col-md-4" key={index}>
									<ApplicationCard
										title={title}
										info={description}
										label={linkTitle}
										onClick={onClick}
										disabled={disabled}
										isLoading={isLoading}
									/>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
};
