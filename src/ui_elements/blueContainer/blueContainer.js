import "./blueContainer.css";

export const BlueContainer = ({ items , children}) => {
	return (
		<div className="blue-container">
			{items?.map((item, index) => (
				<div className="row" key={index}>
					<div className="col-lg-2">
						<p className="text-bold">{item.title}</p>
					</div>
					<div className="col-lg-9">
						<p>{item.content}</p>
					</div>
				</div>
			))}
			{children}
		</div>
	);
};
