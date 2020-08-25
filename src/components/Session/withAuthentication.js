import React, { useState, useEffect } from 'react';
import { AuthUserContext } from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = (Component) => {
    const WithAuthenticated = (props) => {

        const [authUser, setAuthUser] = useState(null);
        const { firebase } = props;

        useEffect(() => {
            const listner = () => {
                firebase.auth.onAuthStateChanged(user => {
                    user
                        ? setAuthUser(user)
                        : setAuthUser(null);
                });
            };
            listner();
            //To avoid memory leaks, remove listener when unmount
            return () => {
                listner();
            }
        });

        return (<AuthUserContext.Provider value={authUser}>
            <Component {...props} />
        </AuthUserContext.Provider>
        )
    }
    return withFirebase(WithAuthenticated);
}

export default withAuthentication;