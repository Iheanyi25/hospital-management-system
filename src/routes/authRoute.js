import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../Components/Layout";
import ViewResetPassword from "../Pages/Components/ViewResetPassword";
import ViewResetPasswordFromMail from "../Pages/Components/ViewResetPasswordFromMail";
import Login from "../Pages/Login/Login";

const AuthRoute = () => {

    return (
        <Router>
            <AuthLayout>
                <Switch>
                    <Route
                        exact
                        path={"/"}
                        component={Login}
                    />

                    <Route
                        exact
                        path="/ResetPasswordRedirect"
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