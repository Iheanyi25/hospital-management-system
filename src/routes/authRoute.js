import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../Components/Layout";
import ViewResetPassword from "../Pages/Components/ViewResetPassword";
import ViewResetPasswordFromMail from "../Pages/Components/ViewResetPasswordFromMail";
import Login from "../Pages/Login/Login";
import {useRouteMatch, useLocation} from 'react-router-dom'

const AuthRoute = (props) => {
    const {path} = useRouteMatch();
    const {pathname} = useLocation();
    console.log("path in route", pathname)
    if(pathname === "/"){
        window.location.href = "/login"
    }
    return (
        <Router>
            <AuthLayout>
                <Switch>
                    <Route
                        exact
                        path={"/login"}
                        component={Login}
                    />
                    <Route
                        exact
                        path="/resetmypassword"
                        component={ViewResetPassword}
                    />

                    <Route
                        exact
                        path="/ResetPassword"
                        component={ViewResetPasswordFromMail}
                    />

                    <Route path="*" render={() => <Redirect to="/" />} />
                </Switch>
            </AuthLayout>
        </Router>
    );
};

export { AuthRoute }