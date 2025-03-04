import React, { useState } from 'react';
import axios from 'axios';

const SVMClassifier = () => {
  const [inputData, setInputData] = useState([0, 0, 0, 0]);
  const [prediction, setPrediction] = useState('');

  const handleChange = (index, value) => {
    const newData = [...inputData];
    newData[index] = parseFloat(value);
    setInputData(newData);
  };

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        features: inputData,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">SVM Classifier</h2>
      <div className="space-y-2">
        {inputData.map((value, idx) => (
          <input
            key={idx}
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={`Feature ${idx + 1}`}
          />
        ))}
      </div>
      <button
        onClick={handlePredict}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Predict
      </button>
      {prediction && (
        <div className="text-center mt-4">
          <span className="font-semibold">Prediction:</span> {prediction}
        </div>
      )}
    </div>
  );
};

export default SVMClassifier;
