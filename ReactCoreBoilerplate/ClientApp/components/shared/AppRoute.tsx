import { Route, RouteProps, Redirect } from "react-router";
import * as React from "react";
import Globals from "@Globals";

export interface IProps extends RouteProps {
    layout: React.ComponentClass<any>;
}

export const AppRoute = ({ component: Component, layout: Layout, path: Path, ...rest }: IProps) => {

    var isLoginPath = Path === "/login";
    if (!Globals.isAuthenticated && !isLoginPath) {
        return <Redirect to="/login" />;
    }
    if (Globals.isAuthenticated && isLoginPath) {
        return <Redirect to="/" />;
    }

    return <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />;
}