import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PharmacyDashboard from "../Pages/Pharmacy/Dashboard";
import PharmacyCreateDrugCategories from "../Pages/Pharmacy/CreateCategories";
import PharmacyManageDrugCategories from "../Pages/Pharmacy/ManageCategories";
import PharmacyCreateDrugSubCategories from "../Pages/Pharmacy/CreateSubCategories";
import PharmacyManageDrugSubCategories from "../Pages/Pharmacy/ManageSubCategories";
import PharmacyCreateDrug from "../Pages/Pharmacy/CreateDrug";
import PharmacyManageDrugs from "../Pages/Pharmacy/ManageDrugs";
import { PharmacyLayout } from '../Components/Layout';


export default function PharmacyRoutes() {
    return (
        <BrowserRouter basename="pharmacy"  >
            <PharmacyLayout>
                <Switch >

                    <Route exact path="/PharmacyDashboard" component={PharmacyDashboard} />
                    <Route exact path="/PharmacyCreateDrugCategories" component={PharmacyCreateDrugCategories} />
                    <Route exact path="/PharmacyManageDrugCategories" component={PharmacyManageDrugCategories} />
                    <Route exact path="/PharmacyCreateDrugSubCategories" component={PharmacyCreateDrugSubCategories} />
                    <Route exact path="/PharmacyManageDrugSubCategories" component={PharmacyManageDrugSubCategories} />
                    <Route exact path="/PharmacyCreateDrug" component={PharmacyCreateDrug} />
                    <Route exact path="/PharmacyManageDrugs" component={PharmacyManageDrugs} />

                    <Route exact path="*" render={() => <Redirect to="/PharmacyDashboard" />} />

                </Switch>
            </PharmacyLayout>
        </BrowserRouter>
    )
}