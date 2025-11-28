import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query, where, } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
const RESULT_FILTERS = [
    { label: "All Results", value: "" },
    { label: "Glioma Tumor", value: "Glioma Tumor" },
    { label: "Meningioma Tumor", value: "Meningioma Tumor" },
    { label: "No Tumor", value: "No Tumor" },
    { label: "Pituitary Tumor", value: "Pituitary Tumor" },
];
const MODALITY_FILTERS = [
    { label: "All Modalities", value: "" },
    { label: "MRI", value: "MRI" },
    { label: "CT", value: "CT" },
    { label: "PET-CT", value: "PET-CT" },
];
const PatientRecords = () => {
    const { currentUser } = useAuth();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResult, setSelectedResult] = useState("");
    const [selectedModality, setSelectedModality] = useState("");
    useEffect(() => {
        if (!currentUser) {
            setRecords([]);
            setLoading(false);
            return;
        }
        const q = query(collection(db, "testRecords"), where("userId", "==", currentUser.uid), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRecords(docs);
            setLoading(false);
        }, (err) => {
            console.error("Failed to fetch patient records:", err);
            setError("Unable to load patient records. Please try again later.");
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);
    const filteredRecords = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return records.filter((record) => {
            const matchesResult = selectedResult
                ? record.result === selectedResult
                : true;
            const matchesModality = selectedModality
                ? record.modality === selectedModality
                : true;
            const matchesSearch = term
                ? [record.fullname, record.email, record.patient_id]
                    .filter(Boolean)
                    .some((field) => field.toLowerCase().includes(term))
                : true;
            return matchesResult && matchesModality && matchesSearch;
        });
    }, [records, searchTerm, selectedResult, selectedModality]);
    const formatTimestamp = (timestamp) => {
        if (!timestamp)
            return "Pending";
        const date = timestamp.toDate();
        return date.toLocaleString();
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Patient Records" }), _jsx("p", { className: "text-gray-500", children: "Review your submitted patient cases, filter by diagnosis, and search by name or ID." })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full md:w-auto", children: [_jsx("input", { type: "search", placeholder: "Search by patient name, email, or ID", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "input sm:w-72" }), _jsx("select", { className: "input", value: selectedResult, onChange: (e) => setSelectedResult(e.target.value), children: RESULT_FILTERS.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) }), _jsx("select", { className: "input", value: selectedModality, onChange: (e) => setSelectedModality(e.target.value), children: MODALITY_FILTERS.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] })] }), error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg", children: error })), loading ? (_jsx("div", { className: "flex items-center justify-center py-20", children: _jsxs("div", { className: "inline-flex items-center gap-3 text-gray-500", children: [_jsx("div", { className: "h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Loading patient records\u2026" })] }) })) : filteredRecords.length === 0 ? (_jsxs("div", { className: "bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-500", children: [_jsx("i", { className: "fas fa-folder-open text-4xl mb-3 text-gray-400" }), _jsx("p", { className: "font-semibold", children: "No patient records found" }), _jsx("p", { className: "text-sm", children: "Try adjusting your filters or add a new patient record from the Test Form." })] })) : (_jsx("div", { className: "bg-white rounded-xl shadow overflow-hidden", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Patient" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Diagnosis" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Imaging" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Confidence" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Submitted" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Image" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredRecords.map((record) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsxs("td", { className: "px-6 py-4", children: [_jsx("div", { className: "font-semibold text-gray-800", children: record.fullname || "—" }), _jsxs("div", { className: "text-sm text-gray-500 flex items-center gap-2", children: [record.patient_id && (_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx("i", { className: "fas fa-id-card" }), record.patient_id] })), record.email && (_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx("i", { className: "fas fa-envelope" }), record.email] }))] })] }), _jsxs("td", { className: "px-6 py-4", children: [_jsxs("div", { className: `inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${typeof record.confidence === "number" && record.confidence >= 90
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-emerald-100 text-emerald-700"}`, children: [_jsx("i", { className: typeof record.confidence === "number" && record.confidence >= 90
                                                            ? "fas fa-exclamation-triangle"
                                                            : "fas fa-check-circle" }), typeof record.confidence === "number" && record.confidence >= 90
                                                        ? "Tumor suspected"
                                                        : "No tumor", typeof record.confidence === "number" && (_jsxs("span", { className: "font-normal", children: ["\u00A0(", record.confidence.toFixed(0), "% confidence)"] }))] }), record.result && (_jsxs("div", { className: "mt-1 text-sm text-gray-500", children: ["Model prediction: ", record.result] }))] }), _jsxs("td", { className: "px-6 py-4 text-sm text-gray-600", children: [_jsx("div", { className: "font-medium text-gray-800", children: record.modality || "—" }), _jsx("div", { children: record.sequence || "—" })] }), _jsx("td", { className: "px-6 py-4 text-sm text-gray-600", children: typeof record.confidence === "number"
                                            ? `${record.confidence.toFixed(2)}%`
                                            : "—" }), _jsx("td", { className: "px-6 py-4 text-sm text-gray-600", children: formatTimestamp(record.createdAt) }), _jsx("td", { className: "px-6 py-4 text-sm text-gray-600", children: record.imageUrl ? (_jsx("a", { href: record.imageUrl, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:text-blue-800 font-semibold", children: "View Image" })) : ("—") })] }, record.id))) })] }) }))] }));
};
export default PatientRecords;
