import React, { useEffect, useReducer } from 'react';

import { withAuthorization } from '../Session';

const httpStateReducer = (httpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { ...httpState, loading: true }
        case 'RESPONSE':
            return { ...httpState, loading: false, users: action.userList }
        default:
            return {
                ...httpState
            }
    }
}

const AccountPage = (props) => {
    const [httpState, dispatchHttpStateAction] = useReducer(httpStateReducer, { loading: false, users: [] });

    const { firebase } = props;
    useEffect(() => {
        dispatchHttpStateAction({ type: 'SEND' });
        firebase.getUsers().once('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            dispatchHttpStateAction({ type: 'RESPONSE', userList: usersList });
        })
        return () => {
            firebase.getUsers().off();
        }
    }, [firebase]);

    return (
        <div>
            <h1>Account Page</h1>
            {httpState.loading && <p>Fetching User list.....</p>}
            <ul>
                {httpState.users.length > 0 && httpState.users.map(user => (
                    <li key={user.uid}>
                        <span>
                            <strong>ID:</strong> {user.uid}
                        </span>
                        &nbsp;
                        <span>
                            <strong>E-Mail:</strong> {user.email}
                        </span>
                        &nbsp;
                        <span>
                            <strong>Username:</strong> {user.username}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default withAuthorization(AccountPage);