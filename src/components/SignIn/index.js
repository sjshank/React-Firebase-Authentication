import React, { useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';
import * as ROUTES from "../../constants/routes";
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp';

const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm />
        <SignUpLink />
    </div>
);

const SignInFormBase = (props) => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState(undefined);
    const [isInvalid, setIsInvalid] = useState(true);

    useEffect(() => {
        setIsInvalid(user.email === '' || user.password === '');
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.firebase
            .doSignInWithEmailAndPassword(user.email, user.password)
            .then(authResp => {
                if (authResp) {
                    props.history.push(ROUTES.HOME);
                }
            })
            .catch(err => {
                setError(err.message);
            })
    }

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    type="text"
                    placeholder="Email Address"
                />
                <br/><br/>
                <input
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                />
                <br/><br/>
                <button disabled={isInvalid} type="submit">Sign In</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
};

//Using HOC to get firebase instance
const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm }