import React, { useState, useEffect, useRef } from 'react';

import { FirebaseContext, withFirebase } from '../Firebase';
import * as ROUTES from "../../constants/routes";
import { Link, withRouter } from 'react-router-dom';

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        {/* //This is one way(render prop component) to provide firebase instance as a props to use firebase API */}
        {/* <FirebaseContext.Consumer>
            {firebase => <SignUpForm firebase={firebase} />}
        </FirebaseContext.Consumer> */}
        <SignUpForm />
    </div>
);

const SignUpFormBase = (props) => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(undefined);
    const [isInvalid, setIsInvalid] = useState(true);

    useEffect(() => {
        setIsInvalid(user.email === '' || user.password === '' || user.username === '');
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.firebase
            .doCreateUserWithEmailAndPassword(user.email, user.password)
            .then((authResp) => {
                return props.firebase
                    .getUser(authResp.user.uid)
                    .set({
                        'username': user.username,
                        'email': user.email
                    });
            })
            .then(() => {
                setUser({ username: '', email: '', password: '' });
                props.history.push(ROUTES.HOME);
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
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Full Name"
                />
                <br/><br/>
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
                <br/>
                <br/>
                <button disabled={isInvalid} type="submit">Sign Up</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
};

//Using HOC to get firebase instance
const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpLink = () => {
    return (
        <p>Dont have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
    )
};

export default SignUpPage;

export { SignUpForm, SignUpLink }