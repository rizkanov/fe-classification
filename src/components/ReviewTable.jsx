import React from "react";
import { dummyReviews } from "../constants/dummy-data";

const ReviewTable = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Daftar Review</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Review</th>
              <th className="px-4 py-2 border">Kategori</th>
            </tr>
          </thead>
          <tbody>
            {dummyReviews.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{item.review}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      item.category === "Perubahan"
                        ? "bg-red-500 text-white"
                        : item.category === "Ekspektasi"
                        ? "bg-yellow-500 text-black"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {item.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewTable;
