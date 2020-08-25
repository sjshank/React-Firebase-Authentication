import React, { useEffect } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from "./context";

const withAuthorization = Component => {
    const WithAuthorization = props => {
        const { firebase, history } = props;
        useEffect(() => {
            const listner = () => {
                firebase.auth.onAuthStateChanged(authUser => {
                    if (authUser === null) {
                        history.replace(ROUTES.SIGN_IN);
                    }
                });
            };
            listner();
            //To avoid memory leaks, remove listener when unmount
            return () => {
                listner();
            }
        }, [firebase, history]);
        return (
            <AuthUserContext.Consumer>{
                authUser => authUser !== null ? <Component {...props} /> : null
            }
            </AuthUserContext.Consumer>
        )
    }
    return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;