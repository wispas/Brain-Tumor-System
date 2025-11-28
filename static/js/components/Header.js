import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "../contexts/AuthContext";
const Header = () => {
    const { currentUser } = useAuth();
    return (_jsxs("header", { className: "bg-white shadow-md py-4 px-6 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden", children: _jsx("img", { src: "/images/logo.png", alt: "logo", className: "w-5 h-5" }) }), _jsx("span", { className: "font-bold text-xl text-blue-700" })] }), _jsx("nav", { className: "flex items-center gap-6", children: currentUser && (_jsx("div", { className: "flex items-center gap-3 border-l pl-6", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center", children: _jsx("i", { className: "fas fa-user text-white text-xs" }) }), _jsx("span", { className: "text-sm text-gray-600 max-w-[200px] truncate", children: currentUser.email })] }) })) })] }));
};
export default Header;
