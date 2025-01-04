'use client';

import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, dispatch] = useReducer(authReducer, null);

    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext);
}

function authReducer(auth, action) {
    switch (action.type) {
        case 'sign-in': {
            return action.newAuth;
        }
        case 'sign-out': {
            return null;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
