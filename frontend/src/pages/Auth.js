import React, { useState } from 'react';
import './Auth.css';

export const Auth = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [isLogin, setIsLogin] = useState(true);

    const isInvalid =
        password.trim().length === 0 || emailAddress.trim().length === 0;

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

            if (response.status !== 200 && response.status !== 201) {
                console.error('Failed!');
            }

            const data = await response.json();
            console.log(data);
        } catch (err) {
            // throw new Error(err);
            console.error(err);
        }
    };

    return (
        <form onSubmit={submitHandler} method="POST" className="auth-form">
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={emailAddress}
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
                    onChange={({ target }) => {
                        setPassword(target.value);
                    }}
                />
            </div>
            <div className="form-actions">
                <button disabled={isInvalid} type="submit">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </button>
                <button type="button" onClick={switchModehandler}>
                    Go to {!isLogin ? 'Log In' : 'Sign Up'}
                </button>
            </div>
        </form>
    );
};
