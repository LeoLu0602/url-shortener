'use client';

import {
    Context,
    createContext,
    Dispatch,
    JSX,
    useContext,
    useReducer,
} from 'react';
import { ActionType, UserType } from '@/types';

const AuthContext: Context<UserType | null> = createContext<UserType | null>(
    null
);
const AuthDispatchContext: Context<Dispatch<ActionType> | null> =
    createContext<Dispatch<ActionType> | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const [auth, dispatch] = useReducer(authReducer, null);

    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

export function useAuth(): UserType | null {
    return useContext(AuthContext);
}

export function useAuthDispatch(): Dispatch<ActionType> | null {
    return useContext(AuthDispatchContext);
}

function authReducer(auth: UserType | null, action: ActionType) {
    if (action.type === 'sign-in' || action.type === 'sign-out') {
        return action.newAuth;
    }

    throw Error('Unknown action: ' + action.type);
}
