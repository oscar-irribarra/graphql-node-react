import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    token: null,
    userId: null
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        userId: null
    });
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
