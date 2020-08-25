import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./app.css";

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignupPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';
import { withAuthentication } from '../Session';

const App = (props) => {

    return (
        <BrowserRouter>
            <div >
                <Navigation></Navigation>
                <hr />
                <div className="app-cls">
                    <Route exact path={ROUTES.LANDING} component={LandingPage}></Route>
                    <Route path={ROUTES.SIGN_UP} component={SignupPage}></Route>
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default withAuthentication(App);