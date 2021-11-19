import React, { useEffect, useState } from 'react';
import './Auth.css';

import { useAuth } from '../context/auth-context';
import { useHistory } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

const Auth = () => {
    const { logIn } = useAuth();
    const history = useHistory();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const formIsInvalid =
        password.trim().length === 0 || emailAddress.trim().length === 0;

    const [isLogin, setIsLogin] = useState(true);

    const switchModehandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const logInQuery = {
            query: `
                query{
                    login(email: "${emailAddress}" password: "${password}"){
                        token
                        userId
                    }
                }
            
            `
        };

        const signUpQuery = {
            query: `
                mutation {
                    createUser(userInput: { email:"${emailAddress}", password:"${password}" }){
                        _id,
                        email
                    }
                }
            `
        };

        try {
            const response = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(isLogin ? logInQuery : signUpQuery),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { data, errors } = await response.json();

            if (response.status !== 200 && response.status !== 201) {
                throw new Error(errors[0]?.message);
            }

            if (data.login.token) {
                logIn(data.login.token, data.login.userId);
                history.replace(ROUTES.EVENTS);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        document.title = isLogin ? 'Log In' : 'Sign Up';
    }, [isLogin]);

    return (
        <>
            <form onSubmit={submitHandler} method="POST" className="auth-form">
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={emailAddress}
                        autoComplete="current-username"
                        onChange={({ target }) => {
                            setEmailAddress(target.value);
                        }}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={({ target }) => {
                            setPassword(target.value);
                        }}
                    />
                </div>
                <div className="form-actions">
                    <button disabled={formIsInvalid} type="submit">
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                    <button type="button" onClick={switchModehandler}>
                        Go to {!isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>
        </>
    );
};

export default Auth;
