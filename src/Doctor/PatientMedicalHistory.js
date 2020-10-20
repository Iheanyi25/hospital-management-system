import React from 'react'
import Header from '../Partials/Admin/Header';
import Sidebar from '../Partials/Admin/Sidebar';
import Footer from '../Partials/Footer'
import TemplateSettings from '../Partials/TemplateSettings'
import PageLoader from '../Partials/PageLoader'

class PatientMedicalHistory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render() {

        return (

            <>

                <PageLoader />
                <div className="page-box">
                    <div className="app-container">
                        {/* Horizontal navbar---Header */}
                        <Header></Header>

                        {/* Vertical navbar */}
                        <Sidebar></Sidebar>

                        {/* Add Content Here */}

                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
               
                <TemplateSettings />

            </>


        )
    }
}

export default PatientMedicalHistory;