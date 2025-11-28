import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, currentUser, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!authLoading && currentUser) {
            navigate('/', { replace: true });
        }
    }, [currentUser, authLoading, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        }
        catch (err) {
            setError(err.message || 'Failed to log in');
        }
        finally {
            setLoading(false);
        }
    };
    if (authLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-white", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading..." })] }) }));
    }
    if (currentUser) {
        return null;
    }
    return (_jsxs("div", { className: "min-h-screen flex bg-white", children: [_jsx("div", { className: "hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center p-8", children: _jsxs("div", { className: "text-center max-w-md", children: [_jsx("img", { src: "images/doctor.png", alt: "Brain Tumor System", className: "w-64 h-64 mx-auto rounded-xl shadow-md object-cover" }), _jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Welcome to Brain Tumor System" }), _jsx("p", { className: "text-gray-600", children: "Medical Assistant" })] })] }) }), _jsx("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8", children: _jsxs("div", { className: "w-full max-w-md", children: [" ", _jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "lg:hidden mb-6", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("img", { src: "images/doctor.png", alt: "Brain Tumor System", className: "w-16 h-16 rounded-lg shadow-sm mb-3" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-1", children: "Welcome to Brain Tumor System" }), _jsx("p", { className: "text-sm text-gray-600", children: "Medical Assistant" })] }) }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Brain Tumor System" }), _jsx("p", { className: "text-lg text-gray-600 mb-2", children: "Start your journey" }), _jsx("h2", { className: "text-2xl font-semibold text-gray-900", children: "Sign In" })] }), _jsxs("div", { className: "bg-white rounded-lg", children: [error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-2", children: "E-mail" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all", placeholder: "example@email.com", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-2", children: "Password" }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all", placeholder: "**********", required: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-700", children: "Remember me" })] }), _jsx(Link, { to: "/forgot-password", className: "text-sm text-gray-600 hover:text-gray-900 transition-colors", children: "Forgot password?" })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2", children: loading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white" }), _jsx("span", { children: "Signing in..." })] })) : (_jsx("span", { children: "Sign In" })) })] }), _jsx("div", { className: "mt-8", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "or sign in with" }) })] }) }), _jsx("div", { className: "mt-6 grid grid-cols-2 gap-3" }), _jsx("div", { className: "mt-8 text-center", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/signup", className: "font-medium text-gray-900 hover:text-gray-700 transition-colors", children: "Sign up" })] }) })] }), _jsx("div", { className: "mt-12 text-center", children: _jsx("p", { className: "text-xs text-gray-500", children: "\u00A9 2025. All rights reserved." }) })] }) })] }));
};
export default Login;
