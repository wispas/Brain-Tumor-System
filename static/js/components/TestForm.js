import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
const TestForm = () => {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const initialFormData = useMemo(() => ({
        fullname: "",
        phone: "",
        email: "",
        address: "",
        emergency_name: "",
        relationship: "",
        emergency_phone: "",
        gender: "Male",
        dob: "",
        age: "",
        patient_id: "",
        chief_complaint: "",
        symptom_description: "",
        symptoms: [],
        onset_duration: "",
        neurological_exam: "",
        history: [],
        medications: "",
        surgical_history: "",
        family_history: "No",
        family_details: "",
        smoking_status: "Never",
        alcohol_use: "Never",
        occupational_exposures: "",
        modality: "MRI",
        sequence: "T1",
    }), []);
    const [formData, setFormData] = useState(initialFormData);
    const [uploadResult, setUploadResult] = useState(null);
    const location = useLocation();
    const locationState = location.state;
    const navigate = useNavigate();
    const { currentUser, userData } = useAuth();
    useEffect(() => {
        if (locationState?.uploadResult) {
            setUploadResult(locationState.uploadResult);
            setMessage(null);
            setError(null);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleCheckbox = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => {
            const currentValues = Array.isArray(prev[name])
                ? prev[name]
                : [];
            return {
                ...prev,
                [name]: checked
                    ? [...currentValues, value]
                    : currentValues.filter((v) => v !== value),
            };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        try {
            if (!currentUser) {
                throw new Error("You must be logged in to submit test data.");
            }
            if (!uploadResult) {
                navigate("/upload");
                throw new Error("Please upload and analyze an image before submitting the record.");
            }
            setSaving(true);
            const record = {
                ...formData,
                result: uploadResult.result,
                confidence: uploadResult.confidence,
                imageUrl: uploadResult.imageUrl,
                userId: currentUser.uid,
                userEmail: currentUser.email ?? null,
                userName: userData?.name ?? null,
                createdAt: serverTimestamp(),
            };
            await addDoc(collection(db, "testRecords"), record);
            setMessage("✅ Test data saved successfully to Firebase!");
            setFormData({ ...initialFormData });
            setUploadResult(null);
        }
        catch (err) {
            console.error("Failed to save test data:", err);
            setError(err.message || "Failed to submit test data.");
        }
        finally {
            setSaving(false);
        }
    };
    return (_jsxs("div", { className: "p-8 bg-gray-50 min-h-screen", children: [_jsxs("header", { className: "flex justify-between items-center bg-white shadow p-4 mb-6 rounded-lg", children: [_jsx("div", { className: "text-xl font-bold text-blue-700", children: "\uD83E\uDDE0 ML-Based Brain Tumor Assistant" }), _jsxs("nav", { className: "flex gap-6", children: [_jsx("a", { href: "/", className: "hover:text-blue-600 font-medium", children: "Home" }), _jsx("a", { href: "/test", className: "text-blue-600 font-semibold border-b-2 border-blue-600", children: "Test Form" }), _jsx("a", { href: "/upload", className: "hover:text-blue-600 font-medium", children: "Upload" })] })] }), uploadResult ? (_jsxs("div", { className: "bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg shadow mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Latest Upload Analysis" }), _jsxs("p", { className: "mb-1", children: [_jsx("strong", { children: "Result:" }), " ", uploadResult.result] }), _jsxs("p", { className: "mb-3", children: [_jsx("strong", { children: "Confidence:" }), " ", uploadResult.confidence.toFixed(2), "%"] }), uploadResult.imageUrl && (_jsx("img", { src: uploadResult.imageUrl, alt: "Uploaded Scan", className: "w-48 h-48 object-cover rounded-xl border border-blue-200" }))] })) : (_jsx("div", { className: "bg-amber-50 border border-amber-300 text-amber-800 p-6 rounded-lg shadow mb-6 flex items-start justify-between gap-4", children: _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Upload Required" }), _jsx("p", { className: "text-sm mb-2", children: "Please upload and analyze the MRI/CT scan before submitting the full patient record." }), _jsxs("a", { href: "/upload", className: "inline-flex items-center gap-2 text-sm font-semibold text-amber-900 bg-amber-200 px-4 py-2 rounded-lg hover:bg-amber-300", children: [_jsx("i", { className: "fas fa-cloud-upload-alt" }), "Go to Upload Page"] })] }) })), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-8 shadow-lg rounded-lg space-y-8", children: [_jsxs("section", { children: [_jsx("div", { className: "flex items-center justify-between mb-3", children: _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold", children: "Section I. Demographics & Contact Info" }), _jsx("p", { className: "text-sm text-gray-500", children: "Capture patient and emergency contact details." })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx("input", { className: "input", placeholder: "Full Name", name: "fullname", value: formData.fullname, onChange: handleChange, required: true }), _jsx("input", { className: "input", placeholder: "Phone Number", name: "phone", value: formData.phone, onChange: handleChange, required: true }), _jsx("input", { className: "input", placeholder: "Email", name: "email", value: formData.email, onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Address", name: "address", value: formData.address, onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Emergency Contact Name", name: "emergency_name", value: formData.emergency_name, onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Relationship", name: "relationship", value: formData.relationship, onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Emergency Phone", name: "emergency_phone", value: formData.emergency_phone, onChange: handleChange }), _jsxs("select", { className: "input", name: "gender", value: formData.gender, onChange: handleChange, children: [_jsx("option", { children: "Male" }), _jsx("option", { children: "Female" }), _jsx("option", { children: "Other" }), _jsx("option", { children: "Prefer Not to Say" })] }), _jsx("input", { className: "input", type: "date", name: "dob", value: formData.dob, onChange: handleChange }), _jsx("input", { className: "input", type: "number", name: "age", placeholder: "Age", value: formData.age, onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Patient ID/MRN", name: "patient_id", value: formData.patient_id, onChange: handleChange })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold mb-3", children: "Section II. Clinical History" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx("textarea", { className: "input md:col-span-2", rows: 3, name: "chief_complaint", placeholder: "Chief Complaint(s)", value: formData.chief_complaint, onChange: handleChange }), _jsx("textarea", { className: "input md:col-span-2", rows: 4, name: "symptom_description", placeholder: "Detailed Symptom Description", value: formData.symptom_description, onChange: handleChange }), _jsxs("select", { className: "input", name: "onset_duration", value: formData.onset_duration, onChange: handleChange, children: [_jsx("option", { value: "", children: "Onset & Duration" }), _jsx("option", { value: "Acute", children: "Acute" }), _jsx("option", { value: "Subacute", children: "Subacute" }), _jsx("option", { value: "Chronic", children: "Chronic" }), _jsx("option", { value: "Rapidly Progressive", children: "Rapidly Progressive" }), _jsx("option", { value: "Stable", children: "Stable" })] })] }), _jsxs("div", { className: "mt-3", children: [_jsx("p", { className: "font-semibold mb-2", children: "Neurological Symptoms" }), _jsx("div", { className: "flex flex-wrap gap-3", children: ["Seizures", "Vision Changes", "Weakness", "Cognitive Changes", "Speech Difficulties"].map((symptom) => (_jsxs("label", { className: "flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg", children: [_jsx("input", { type: "checkbox", name: "symptoms", value: symptom, checked: formData.symptoms.includes(symptom), onChange: handleCheckbox }), symptom] }, symptom))) })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold mb-3", children: "Section III. Medical Background" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold mb-2", children: "Past Medical History" }), _jsx("div", { className: "flex flex-wrap gap-3", children: ["Previous Cancers", "Neurological Disorders", "Immunosuppression"].map((item) => (_jsxs("label", { className: "flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg", children: [_jsx("input", { type: "checkbox", name: "history", value: item, checked: formData.history.includes(item), onChange: handleCheckbox }), item] }, item))) })] }), _jsx("textarea", { className: "input", rows: 3, name: "medications", placeholder: "Current Medications & Allergies", value: formData.medications, onChange: handleChange }), _jsx("textarea", { className: "input", rows: 3, name: "surgical_history", placeholder: "Surgical History", value: formData.surgical_history, onChange: handleChange }), _jsx("textarea", { className: "input", rows: 3, name: "neurological_exam", placeholder: "Prior Neurological Exam Findings", value: formData.neurological_exam, onChange: handleChange })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold mb-3", children: "Section IV. Family & Social History" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("select", { className: "input", name: "family_history", value: formData.family_history, onChange: handleChange, children: [_jsx("option", { children: "No" }), _jsx("option", { children: "Yes" })] }), _jsx("textarea", { className: "input", rows: 3, name: "family_details", placeholder: "If yes, provide details", value: formData.family_details, onChange: handleChange }), _jsxs("select", { className: "input", name: "smoking_status", value: formData.smoking_status, onChange: handleChange, children: [_jsx("option", { children: "Current" }), _jsx("option", { children: "Former" }), _jsx("option", { children: "Never" })] }), _jsxs("select", { className: "input", name: "alcohol_use", value: formData.alcohol_use, onChange: handleChange, children: [_jsx("option", { children: "Daily" }), _jsx("option", { children: "Weekly" }), _jsx("option", { children: "Occasionally" }), _jsx("option", { children: "Never" })] }), _jsx("input", { className: "input md:col-span-2", placeholder: "Occupational Exposures", name: "occupational_exposures", value: formData.occupational_exposures, onChange: handleChange })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold mb-3", children: "Section V. Imaging & Upload" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("select", { className: "input", name: "modality", value: formData.modality, onChange: handleChange, children: [_jsx("option", { children: "MRI" }), _jsx("option", { children: "CT" }), _jsx("option", { children: "PET-CT" })] }), _jsxs("select", { className: "input", name: "sequence", value: formData.sequence, onChange: handleChange, children: [_jsx("option", { children: "T1" }), _jsx("option", { children: "T1c" }), _jsx("option", { children: "T2" }), _jsx("option", { children: "FLAIR" }), _jsx("option", { children: "DWI" })] })] })] }), _jsx("button", { type: "submit", className: "bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700", children: saving ? "Saving..." : "Submit Test Data" })] }), error && (_jsx("div", { className: "mt-6 bg-red-50 border border-red-400 text-red-700 p-4 rounded-lg shadow", children: error })), message && (_jsx("div", { className: "mt-6 bg-blue-50 border border-blue-400 text-blue-700 p-4 rounded-lg shadow", children: message }))] }));
};
export default TestForm;
