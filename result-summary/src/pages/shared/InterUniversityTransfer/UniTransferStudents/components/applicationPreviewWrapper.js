import styles from "../../style.module.css";
import logo from "../../../../../assets/images/sideLogo.png";
import { useReactToPrint } from "react-to-print";
import watermark from "../../../../../assets/images/invoice-logo.png";
import {
	PageTitle,
	Button,
	CopyrightText,
	Breadcrumbs
} from "../../../../../ui_elements";

const pageStyle = `
  @page {
    // size: 80mm 50mm;
    margin-top: 10rem;
    margin-left: 3rem;
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

export const TransferApplicationPreviewWrapper = ({
	children,
	footerContent,
	footerStyle,
	componentRef,
	noHeader,
	previewHeader = "Application Preview"
}) => {
	const crumbItems = [
		{
			name: `Inter University Transfer Login`,
			path: "/uni_transfer_login"
		},
		{
			name: "Acknowledge Slip"
			// path: "/"
		}
	];

	const titleComponent = () => (
		<div>
			<Breadcrumbs crumbs={crumbItems} />
			<p className={styles.main_title}>Acknowledgement Slip</p>
		</div>
	);

	const handlePrint = useReactToPrint({
		content: () => componentRef?.current,
		pageStyle
	});
	return (
		<div className={styles.container}>
			{!noHeader && (
				<PageTitle
					title={titleComponent()}
					buttonGroup={
						<>
							<Button
								data-cy="default"
								buttonClass="primary m-4"
								label="Print"
								onClick={handlePrint}
							/>
						</>
					}
				/>
			)}
			<section ref={componentRef}>
				<div className={styles.watermark}>
					<img src={watermark} alt="logo" />
				</div>
				<div className={`pb-5 ${styles.logo_wrapper}`}>
					<div className="d-flex justify-content-center align-items-center shared_img_container">
						<img src={logo} alt="Logo" />
					</div>
				</div>
				<div className={`py-4 text-center text-capitalize`}>
					<h4 className={styles.preview_header}>{previewHeader}</h4>
				</div>
				<div>{children}</div>
				{footerContent && (
					<div
						className={`border-top px-4 py-3 d-flex justify-content-end  ${
							footerStyle ? footerStyle : ""
						}`}
					>
						{footerContent}
					</div>
				)}
				<div className="border-top py-4 d-flex justify-content-center">
					<CopyrightText />
				</div>
			</section>
		</div>
	);
};
