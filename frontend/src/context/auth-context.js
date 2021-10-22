import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));

    const logIn = (token, userId) => {
        setAuth({ token, userId });
    };

    const logOut = () => {
        setAuth(null);
    };

    useEffect(() => {
        if (auth) {
            localStorage.setItem('auth', JSON.stringify(auth));
            setAuth(auth);
        } else {
            window.localStorage.removeItem('auth');
            setAuth(null);
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
