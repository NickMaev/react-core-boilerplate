import AuthorizedLayout from '@Layouts/authorizedLayout';
import GuestLayout from "@Layouts/guestLayout";
import LoginPage from '@Pages/loginPage';
import { AppRoute } from "@Components/shared/AppRoute";
import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from '@Pages/HomePage';
import ExamplePage from '@Pages/ExamplePage';

export const routes = <Switch>
    <AppRoute layout={GuestLayout} exact path="/login" component={LoginPage} />
    <AppRoute layout={AuthorizedLayout} exact path="/" component={HomePage} />
    <AppRoute layout={AuthorizedLayout} exact path="/example" component={ExamplePage} />
</Switch>;