import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import TestForm from "./components/TestForm";
import UploadPage from "./components/UploadPage";
import ResultPage from "./components/Result";
import Dashboard from "./components/Dashboard";
const App = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "flex bg-gray-100 min-h-screen text-gray-800", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Header, {}), _jsx("div", { className: "flex-1 p-6", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MainContent, {}) }), _jsx(Route, { path: "/test", element: _jsx(TestForm, {}) }), _jsx(Route, { path: "/upload", element: _jsx(UploadPage, {}) }), _jsx(Route, { path: "/result", element: _jsx(ResultPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) })] }) })] })] }) }));
};
export default App;
