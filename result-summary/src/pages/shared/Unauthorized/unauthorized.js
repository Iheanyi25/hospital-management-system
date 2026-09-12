import { useHistory, useLocation } from "react-router-dom";
import { UnauthorisedIcon } from "../../../assets/svgs";
import { Button, SecondaryLink } from "../../../ui_elements";
import styles from "./style.module.css";

const Unauthorized = () => {
	const { goBack, replace } = useHistory();
	const { state } = useLocation();
	if (!state?.fromError) goBack();

	return (
		<>
			<div className={`container h-100`}>
				<div
					className={`row d-flex justify-content-center align-items-center h-100`}
				>
					<div className="col-12 col-sm-6">
						<div className={`${styles.text_box}`}>
							<h1 className={`mb-3 ${styles.error_page_title}`}>
								Access Denied
							</h1>
							<div className={`${styles.description} mb-4`}>
								<p
									className={`mb-3 lh-2 ${styles.error_page_text}`}
								>
									Sorry for the inconvenience but the page
									you're trying to access has restricted
									access. Please contact the administrator
								</p>
							</div>

							<div className="d-flex align-items-center">
								<div className="ml">
									<Button
										label="Go back"
										onClick={() => goBack()}
										buttonClass="primary"
										customClass="mr-4"
									/>
								</div>
								<SecondaryLink
									label="Back to dashboard"
									onClick={() => replace("/dashboard")}
								/>
							</div>
						</div>
					</div>
					<div className={"col-12 col-sm-6 text-center"}>
						<UnauthorisedIcon
							className={`${styles.unauthorized_img_size}`}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Unauthorized;
