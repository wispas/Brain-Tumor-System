import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null);
        }
    };
    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile)
            return alert("Please select an image first.");
        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.text(); // Flask may return HTML
            // Optional: parse response JSON if Flask returns JSON instead
            // const data = await response.json();
            // For now, just show HTML preview
            console.log("Response:", data);
            // If you later change Flask to return JSON:
            // setResult({ label: data.result, confidence: data.confidence });
        }
        catch (error) {
            console.error("Upload failed:", error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "flex flex-col items-center min-h-screen bg-gradient-to-br from-white to-blue-50 p-6", children: [_jsx("h1", { className: "text-3xl font-bold text-orange-500 mb-6", children: "\uD83E\uDDE0 Brain Tumor Detection" }), _jsxs("div", { className: "bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center transition-transform hover:scale-[1.01]", children: [_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "border-2 border-dashed border-sky-500 w-full p-4 rounded-lg cursor-pointer mb-4 hover:border-orange-500 transition" }), previewUrl && (_jsx("img", { src: previewUrl, alt: "Preview", className: "max-w-xs mx-auto rounded-lg border-4 border-sky-400 mb-4" })), _jsxs("div", { className: "space-x-3 mt-4", children: [_jsxs("button", { type: "submit", className: "bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-500 transition", disabled: loading, children: ["Analyze Image", loading ? "Analyzing..." : "Analyze Image"] }), _jsx("a", { href: "/test", children: _jsx("button", { type: "button", className: "bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-sky-500 transition", children: "\u2190 Back to Test Page" }) })] })] }), loading && (_jsx("div", { className: "border-4 border-gray-200 border-t-sky-500 rounded-full w-12 h-12 animate-spin mx-auto mt-6" })), result && (_jsxs("div", { className: "bg-gray-50 p-4 mt-6 rounded-lg shadow-inner", children: [_jsx("h2", { className: "text-xl text-sky-600 mb-2", children: "Results" }), _jsx("p", { children: _jsx("strong", { className: "text-orange-500", children: result.label }) }), _jsxs("p", { children: ["Confidence: ", result.confidence, "%"] })] }))] })] }));
};
export default UploadPage;
