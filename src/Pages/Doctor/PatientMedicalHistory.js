import React from 'react'
import { DoctorHeader, DoctorSidebar, Footer, PageLoader, TemplateSettings } from '../../Components';
// import Header from '../../Components/Header/AdminHeader';
// import Sidebar from '../../Components/Sidebar/AdminSidebar';
// import Footer from '../../Components/Footer'
// import TemplateSettings from '../../Components/TemplateSettings'
// import PageLoader from '../../Components/Loader/PageLoader'

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
                        <DoctorHeader />

                        {/* Vertical navbar */}
                        <DoctorSidebar />

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