import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { LabLayout } from '../Components/Layout'
import Dashboard from '../Pages/Lab/Dashboard'

export default function LabRoutes() {
    return (
        <BrowserRouter basename="lab">
            <LabLayout>
                <Switch>

                    <Route exact path="/LabDashboard" component={Dashboard} />

                    <Route exact path="*" render={() => <Redirect to="/LabDashboard" />} />

                </Switch>
            </LabLayout>
        </BrowserRouter>
    )
}