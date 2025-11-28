import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Sidebar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        }
        catch (error) {
            console.error("Failed to log out:", error);
        }
    };
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const menuItems = [
        { to: "/", label: "Home", icon: "fa-home" },
        { to: "/test", label: "Test Form", icon: "fa-clipboard" },
        { to: "/upload", label: "Upload", icon: "fa-cloud-upload-alt" },
        { to: "/records", label: "Patient Records", icon: "fa-folder-open" },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "lg:hidden bg-gray-900 text-white p-4 border-b border-gray-700", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center", children: _jsx("i", { className: "fas fa-user text-lg text-white" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold", children: "Profile" }), _jsx("p", { className: "text-green-400 text-xs", children: "Online" })] })] }), _jsx("button", { onClick: toggleMobileMenu, className: "p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors", children: _jsx("i", { className: `fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-lg` }) })] }), currentUser && (_jsx("p", { className: "text-gray-400 text-xs mt-2 truncate", children: currentUser.email }))] }), _jsxs("aside", { className: `
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 text-gray-100 flex flex-col justify-between p-6
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:translate-x-0
      `, children: [_jsx("button", { onClick: toggleMobileMenu, className: "lg:hidden absolute top-4 right-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors", children: _jsx("i", { className: "fas fa-times text-lg" }) }), _jsxs("div", { children: [_jsxs("div", { className: "hidden lg:block text-center mb-6", children: [_jsx("div", { className: "w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2", children: _jsx("i", { className: "fas fa-user text-2xl text-white" }) }), _jsx("h2", { className: "text-xl font-bold text-white", children: "Profile" }), currentUser && (_jsx("p", { className: "text-gray-400 text-xs mt-1 truncate px-2", children: currentUser.email })), _jsx("p", { className: "text-green-400 text-sm mt-1", children: "Online" })] }), _jsx("nav", { children: _jsx("ul", { className: "space-y-2", children: menuItems.map((item) => {
                                        const isActive = location.pathname === item.to;
                                        const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm lg:text-base";
                                        const activeClasses = "bg-blue-600 text-white shadow";
                                        const inactiveClasses = "hover:bg-gray-800 hover:text-white text-gray-200";
                                        return (_jsx("li", { children: _jsxs(Link, { to: item.to, onClick: () => setIsMobileMenuOpen(false), className: `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`, children: [_jsx("i", { className: `fas ${item.icon} w-5 text-center` }), _jsx("span", { children: item.label })] }) }, item.to));
                                    }) }) })] }), _jsxs("div", { className: "mt-auto border-t border-gray-700 pt-4", children: [_jsxs("button", { onClick: handleLogout, className: "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all mb-4 text-sm lg:text-base", children: [_jsx("i", { className: "fas fa-sign-out-alt" }), _jsx("span", { children: "Sign Out" })] }), _jsx("div", { className: "border-t border-gray-700 pt-4", children: _jsx("p", { className: "text-gray-500 text-xs text-center lg:text-left", children: "\u00A9 2025 Medical Assistant" }) })] })] }), isMobileMenuOpen && (_jsx("div", { className: "lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40", onClick: () => setIsMobileMenuOpen(false) }))] }));
};
export default Sidebar;
