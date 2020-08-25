import React, { useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

const LandingPage = (props) => {
    const { firebase } = props;

    // useEffect(() => {
    //     firebase.doSignOut();
    // }, [firebase]);

    const handleBtnClick = (pageName) => {
        props.history.push(pageName);
    }

    return (<div>
        <h1>Landing Page</h1>
        <AuthUserContext.Consumer>
            {authUser => authUser === null ? <div>
                <button onClick={() => handleBtnClick('/signin')}> Sign In </button>
                &nbsp;
                <button onClick={() => handleBtnClick('/signup')}> Sign Up </button>
            </div> : null}
        </AuthUserContext.Consumer>
    </div>
    )
}


export default withFirebase(LandingPage);