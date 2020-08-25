import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";

const SignOutButton = (props) => {
    const handleSignout = () => {
        props.firebase.doSignOut();
        props.history.push("/signin");
    }
    return (
        <button type="button" onClick={handleSignout}>Sign Out</button>
    )
}

export default withRouter(withFirebase(SignOutButton));