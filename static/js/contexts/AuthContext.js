import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
const AuthContext = createContext(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const signup = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            const authError = error;
            throw new Error(authError.message);
        }
    };
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            const authError = error;
            throw new Error(authError.message);
        }
    };
    const logout = async () => {
        try {
            await signOut(auth);
        }
        catch (error) {
            const authError = error;
            throw new Error(authError.message);
        }
    };
    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
        }
        catch (error) {
            const authError = error;
            throw new Error(authError.message);
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        loading
    };
    return (_jsx(AuthContext.Provider, { value: value, children: children }));
};
