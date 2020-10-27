import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AccountantDashboard from "../Pages/Accountant/Dashboard";
import { AccountantLayout } from '../Components/Layout';

export default function AccountantRoutes() {
    return (
        <BrowserRouter basename="admin"  >
            <AccountantLayout>
                <Switch>

                    <Route exact path="/AccountantDashboard" component={AccountantDashboard} />

                    <Route exact path="*" render={() => <Redirect to="/AccountantDashboard" />} />

                </Switch>
            </AccountantLayout>
        </BrowserRouter>
    )
}