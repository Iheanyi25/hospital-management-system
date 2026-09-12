import "./previewLayout.css";

export const PreviewLayout = ({ children, noHeader }) => {
	return (
		<div className="app-container">
			<div className={`preview-children ${noHeader ? "no-header-tab" : ""}`}>
				{children}
			</div>
		</div>
	);
};
