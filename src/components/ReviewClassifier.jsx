import React, { useState } from "react";

const ReviewClassifier = () => {
    const [file, setFile] = useState(null);
    const [predictions, setPredictions] = useState([]);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handlePredict = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData
        });
        
        const data = await response.json();
        setPredictions(data.predictions);
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Review Classifier</h2>
            
            <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
            
            <button 
                onClick={handlePredict} 
                disabled={!file}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
                Predict File
            </button>

            <table className="mt-4 w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 p-2">Review</th>
                        <th className="border border-gray-400 p-2">Prediction</th>
                    </tr>
                </thead>
                <tbody>
                    {predictions.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 p-2">{item.review}</td>
                            <td className="border border-gray-400 p-2">{item.prediction}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewClassifier;
