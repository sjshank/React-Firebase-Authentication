import React from 'react';

const FirebaseContext = React.createContext(null);

//Using Higher order component
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;