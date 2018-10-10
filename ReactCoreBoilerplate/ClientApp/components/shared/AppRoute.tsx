import { Route, RouteProps, Redirect } from "react-router";
import * as React from "react";
import AccountService from "@Services/AccountService";
import Globals from "@Globals";

type Props = {layout: React.ComponentClass<any>;} & RouteProps;

export default class AppRoute extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        var isLoginPath = this.props.path === "/login";
        if (!Globals.isAuthenticated && !isLoginPath) {
            return <Redirect to="/login"/>;
        }
        if (Globals.isAuthenticated && isLoginPath) {
            return <Redirect to="/"/>;
        }
        var getChildrenFn = 
            (props) => 
                React.createElement(
                    this.props.component as any, 
                    React.createElement(this.props.component as any, props)
                );

        return <Route render={(props) => React.createElement(this.props.layout, props, getChildrenFn(props))} />;
    }
}