import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PageLoader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            endpoint: process.env.REACT_APP_API_URL,
        };

        this.logOut = this.logOut.bind(this);
    }

    logOut(props) {
        this.props.history.push('/');
        localStorage.clear();
    }

    render() {

        return (

            <>
                {/* Page Loader */}
                <div className="app-loader main-loader">
                    <div className="loader-box">
                        <div className="bounceball" />
                        <div className="text">HMS<span>app</span></div>
                    </div>
                </div>
                {/* .main-loader */}
            
            </>

        )
    }

}

export default PageLoader
