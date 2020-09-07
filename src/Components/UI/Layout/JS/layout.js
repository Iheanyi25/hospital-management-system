import React, { Component } from "react";
import Sidebar from "./sidebar";
import styles from "../CSS/layout.module.css";
import Backdrop from "./backdrop";
import LeftDrawer from "./left_drawer";

class Layout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			drawerOpen: false
		};

		this.toggleDrawer = this.toggleDrawer.bind(this);
	}

	toggleDrawer() {
		this.setState((state) => ({
			drawerOpen: !state.drawerOpen
		}));
	}

	render() {
		const { drawerOpen } = this.state;

		return (
			<main className={styles.main}>
				<div className={styles.left}>
					<Sidebar />
				</div>
				{drawerOpen ? (
					<>
						<Backdrop onClick={this.toggleDrawer} />
						<LeftDrawer open={drawerOpen}>
							<Sidebar />
						</LeftDrawer>
					</>
				) : null}
				<section>
					<header>
						<button onClick={() => this.toggleDrawer()}>
							<svg
								width="20"
								height="14"
								viewBox="0 0 20 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 7H19M1 1H19M1 13H19"
									stroke="#26422D"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</header>
					<div>{this.props.children}</div>
				</section>
			</main>
		);
	}
}

export default Layout;
