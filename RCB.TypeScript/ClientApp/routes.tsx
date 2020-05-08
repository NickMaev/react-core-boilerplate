import * as React from 'react';
import GuestLayout from "@Layouts/GuestLayout";
import AuthorizedLayout from '@Layouts/AuthorizedLayout';
import LoginPage from '@Pages/LoginPage';
import AppRoute from "@Components/shared/AppRoute";
import HomePage from '@Pages/HomePage';
import ExamplesPage from '@Pages/ExamplesPage';
import { Switch } from 'react-router-dom';
import NotFoundPage from '@Pages/NotFoundPage';

export const routes = <Switch>
    <AppRoute layout={GuestLayout} exact path="/login" component={LoginPage} />
    <AppRoute layout={AuthorizedLayout} exact path="/" component={HomePage} />
    <AppRoute layout={AuthorizedLayout} exact path="/example" component={ExamplesPage} />
    <AppRoute layout={GuestLayout} path="*" component={NotFoundPage} statusCode={404} />
</Switch>;