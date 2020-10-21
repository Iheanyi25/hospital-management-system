import React from 'react'
import Header from '../../Components/Admin/Header';
import Sidebar from '../../Components/Admin/Sidebar';
import Footer from '../../Components/Footer'
import TemplateSettings from '../../Components/TemplateSettings'
import PageLoader from '../../Components/PageLoader'

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