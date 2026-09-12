import { useCookies } from "react-cookie";
import { CenteredDialog, Button } from "../../../ui_elements";
import { TOKEN_HOLDER, USER_NAME_HOLDER, USER_ROLE_HOLDER } from "../../../utils/constants";

export const Logout = ({ isOpen, closeModal }) => {
	const removeCookie = useCookies()[2];
	const logout = () => {
		removeCookie(TOKEN_HOLDER, { path: "/" });
		removeCookie(USER_ROLE_HOLDER, { path: "/" });
		removeCookie(USER_NAME_HOLDER, { path: "/" });
	};

	return (
		<CenteredDialog
			title="Sign out"
			isOpen={isOpen}
			closeModal={closeModal}
			customStyles="p-0"
			width={584}
			footerData={
				<>
					<Button
						data-cy="sign_out"
						label="Sign out"
						buttonClass="primary"
						data-dismiss="modal"
						onClick={logout}
					/>
					<Button
						data-cy="cancel_sign_out"
						label="Cancel"
						buttonClass="secondary"
						data-dismiss="modal"
						onClick={closeModal}
					/>
				</>
			}
		>
			<p className="mb-4">
				Are you sure you want to sign out of the portal?
			</p>
		</CenteredDialog>
	);
};
