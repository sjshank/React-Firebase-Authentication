import React from 'react';

import { withAuthorization, AuthUserContext } from '../Session';

const HomePage = (props) => (
    <AuthUserContext.Consumer>
        {authUser => <div>
            <h1>Home Page</h1>
            <h3><i>Welcome {authUser.email} !</i></h3>
            <p>The Home Page is accessible by every signed in user. </p>
        </div>}
    </AuthUserContext.Consumer>
);


export default withAuthorization(HomePage);