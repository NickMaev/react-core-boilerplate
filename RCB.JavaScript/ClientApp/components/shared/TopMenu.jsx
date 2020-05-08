import React, { useState } from "react";
import { withRouter } from "react-router";
import { Redirect, NavLink } from "react-router-dom";
import AccountService from "@Services/AccountService";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import SessionManager from "@Core/session";

const TopMenu = () => {

    const [isLogout, setLogout] = useState(false);

    const onClickSignOut = async () => {
        var accountService = new AccountService();
        await accountService.logout();
        setLogout(true);
    }

    if (isLogout) {
        return <Redirect to="/login" />;
    }

    return <Navbar bg="light" expand="lg">
        <LinkContainer exact to={'/'}>
            <Navbar.Brand>RCB.JavaScript</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <LinkContainer exact to={'/'}>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer exact to={'/example'}>
                    <Nav.Link>Example</Nav.Link>
                </LinkContainer>
            </Nav>

            <Nav>
                <Dropdown alignRight>
                    <Dropdown.Toggle id="user-menu" to="#" as={NavLink}>
                        {SessionManager.isAuthenticated ? SessionManager.getServiceUser().login : null}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onClickSignOut()}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>

        </Navbar.Collapse>
    </Navbar>;
}

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components, 
// have an access to React Router fields in the component's props, etc.
export default withRouter(TopMenu);