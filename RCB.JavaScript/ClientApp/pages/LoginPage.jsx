import * as LoginStore from "@Store/loginStore";
import { connect } from "react-redux";
import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import { Redirect, withRouter } from "react-router";
import FormValidator from "@Components/shared/FormValidator";
import Button from "react-bootstrap/Button";
import { Formik, Field } from "formik";
import { FormGroup } from "react-bootstrap";
import SessionManager from "@Core/session";

const LoginPage = (props) => {

    const formValidator = useRef(null);

    const onSubmit = async (data) => {
        if (formValidator.current.isValid()) {
            await props.login(data);
        }
    };

    if (SessionManager.isAuthenticated && props.isLoginSuccess) {
        return <Redirect to="/" />;
    }

    return <div id="loginPage">

        <Helmet>
            <title>Login page - RCB.JavaScript</title>
        </Helmet>

        <div id="loginContainer">

            <p className="text-center">Type any login and password to enter.</p>

            <Formik
                enableReinitialize
                initialValues={{}}
                onSubmit={async (values, { setSubmitting }) => {
                    await onSubmit(values);
                }}
            >
                {({ values, handleSubmit }) => {

                    return <FormValidator ref={x => formValidator.current = x}>

                        <FormGroup>
                            <Field name="login">
                                {({ field }) => (
                                    <>
                                        <label className="control-label" htmlFor="login">Login</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="login"
                                            name={field.name}
                                            data-val-required="true"
                                            data-msg-required="Login is required."
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                        />
                                    </>
                                )}
                            </Field>
                        </FormGroup>

                        <FormGroup>
                            <Field name="password">
                                {({ field }) => (
                                    <>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name={field.name}
                                            data-val-required="true"
                                            data-msg-required="Password is required."
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                        />
                                    </>
                                )}
                            </Field>
                        </FormGroup>

                        <div className="form-inline">
                            <Button onClick={() => handleSubmit()}>Sign in</Button>
                        </div>

                    </FormValidator>
                }}
            </Formik>

        </div>
    </div>;
}

// Connect component with Redux store.
var connectedComponent = connect(
    state => state.login, // Selects which state properties are merged into the component's props.
    LoginStore.actionCreators, // Selects which action creators are merged into the component's props.
)(LoginPage);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components, 
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);