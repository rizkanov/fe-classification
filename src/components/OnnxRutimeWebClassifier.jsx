import React, { useState } from 'react';
import * as ort from 'onnxruntime-web';

const OnnxRuntimeWebClassifier = () => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePredict = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const rows = text.split('\n').map((row) => row.split(','));

      const header = rows[0];
      const reviewIndex = header.findIndex((col) =>
        col.toLowerCase().includes('review'),
      );
      if (reviewIndex === -1) {
        console.error('Kolom review tidak ditemukan dalam CSV');
        return;
      }

      const reviews = rows
        .slice(1)
        .map((row) => row[reviewIndex])
        .filter(Boolean);

      try {
        const session = await ort.InferenceSession.create(
          'classification-model.onnx',
        );
        console.log("Model Inputs:", session);

        const inputs = reviews.map((text) => textToTensor(text));
        console.log("Inputs:", inputs);

        const results = [];
        for (const input of inputs) {
            try {
                const output = await session.run({ input });
                results.push(output);
            } catch (error) {
                console.error("ONNX Runtime Error:", error);
            }
        }
        
        console.log("Results:", results);
        
        const outputName = session.outputNames[0]; // Ambil output pertama
        
        const formattedPredictions = results.map((res, idx) => ({
          review: reviews[idx],
          prediction: res[outputName].data[0], // Sesuaikan dengan output model
        }));

        setPredictions(formattedPredictions);
      } catch (error) {
        console.error('ONNX Runtime Error:', error);
      }
    };

    reader.readAsText(file);
  };

  const textToTensor = (text) => {
    return new ort.Tensor("string", [text], [1]); // Mengirim string langsung sebagai tensor
  };


  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Review Classifier</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

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

export default OnnxRuntimeWebClassifier;
