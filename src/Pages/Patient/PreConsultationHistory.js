import React from 'react';
import { PageLoader } from '../../Components';


class PreConsultationHistory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<>
				<PageLoader />

				<main className="main-content">
					<div className="app-loader">
						<i className="icofont-spinner-alt-4 rotate" />
					</div>
					<div className="main-content-wrap">
						<header className="page-header">
							<h3 className="page-title">
								My PreConsultation History
							</h3>
						</header>
						<div className="page-content">
						
							<div className="row">
								<div className="col-md-12">
									<div className="card bg-light">
										<div className="card-header">24th Oct 2020</div>
										<div className="card-body">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
											dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa
											labore velit.Lorem ipsum dolor sit amet, consectetur adipisicing
											elit. Dicta, provident?
												</div>
									</div>
								</div>
								<div className="col-md-12">
									<div className="card bg-light">
										<div className="card-header">24th Oct 2020</div>
										<div className="card-body">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
											dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa
											labore velit.Lorem ipsum dolor sit amet, consectetur adipisicing
											elit. Dicta, provident?
												</div>
									</div>
								</div>
								<div className="col-md-12">
									<div className="card bg-light">
										<div className="card-header">24th Oct 2020</div>
										<div className="card-body">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
											dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa
											labore velit.Lorem ipsum dolor sit amet, consectetur adipisicing
											elit. Dicta, provident?
												</div>
									</div>
								</div>

								
							</div>

							
						</div>
					</div>
				</main>

			</>
		);
	}
}

export default PreConsultationHistory;
