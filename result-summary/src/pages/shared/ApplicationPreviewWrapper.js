import styles from "./application_wrapper.module.css";
import logo from "../../assets/images/sideLogo.png";
import Avatar from "react-avatar";
import { Button, CopyrightText, PageTitle } from "../../ui_elements";
import { useReactToPrint } from "react-to-print";
import watermark from "../../assets/images/invoice-logo.png";

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

export const ApplicationPreviewWrapper = ({
	children,
	footerContent,
	footerStyle,
	userDetails = { fullname: "Federal University", passport: "" },
	componentRef,
	noHeader,
	previewHeader = "Application Preview"
}) => {
	const handlePrint = useReactToPrint({
		content: () => componentRef?.current,
		pageStyle
	});
	return (
		<div className={styles.container}>
			{!noHeader && (
				<PageTitle
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
				<div className="pb-4">
					<div className="d-flex justify-content-center align-items-center shared_img_container">
						<img src={logo} alt="Logo" />
					</div>
				</div>
				<div className="py-2 text-center text-capitalize border-top border-bottom">
					<h4>{previewHeader}</h4>
				</div>
				<div className="d-flex justify-content-center align-items-center my-3">
					<Avatar
						name={userDetails?.fullname}
						size={240}
						round={false}
						className={styles.avatar}
						src={userDetails?.passport}
					/>
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
