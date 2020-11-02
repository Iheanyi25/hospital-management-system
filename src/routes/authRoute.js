import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../Components/Layout";

const AuthRoute = ({ Component, path, exact, purpose, isAuthenticated, ...rest }) => {

    return (
        <Router>
            <Switch>
                <Route
                    exact={exact}
                    path={path}
                    render={(props) => {
                        return (
                            <AuthLayout history={props.history} isAuthenticated={isAuthenticated}>
                                <Component {...rest} {...props} />
                            </AuthLayout>
                        );
                    }}
                />
                <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    );
};

export { AuthRoute }