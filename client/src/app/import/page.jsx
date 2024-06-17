"use client";
import { useState } from "react";
import supabase from "@/data/supabase";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file!");
      return;
    }

    const reader = new FileReader();

    reader.onload = async function (event) {
      const text = event.target.result;
      const rows = text.split("\n").map((row) => row.split(","));
      const headers = rows[0].map((header) => header.trim());
      const data = rows.slice(1).map((row) => {
        let obj = {};
        row.forEach((val, idx) => {
          obj[headers[idx]] = val.trim();
        });
        return obj;
      });

      try {
        const batchSize = 100; // Adjust batch size based on your needs
        const failedRecords = [];

        for (let i = 0; i < data.length; i += batchSize) {
          const batch = data.slice(i, i + batchSize);

          const batchPromises = batch.map(async (row) => {
            const {
              new_email,
              password,
              new_name,
              new_role,
              new_usn,
              new_branch,
              new_sem,
              new_year,
              new_phone,
            } = row;

            const { data, error } = await supabase.rpc("add_data2", {
              new_email: row.new_email,
              password: row.password,
              new_name: row.new_name,
              new_role: parseInt(row.new_role),
              new_usn: row.new_usn,
              new_branch: row.new_branch,
              new_sem: parseInt(row.new_sem),
              new_year: parseInt(row.new_year),
              new_phone: row.new_phone
            });

            if (error) {
              console.error("Error inserting data for email:", new_email, error);
              failedRecords.push({ email: new_email, error: error.message });
            }
          });

          // Wait for all promises in the batch to complete
          await Promise.all(batchPromises);
        }

        if (failedRecords.length > 0) {
          console.error("Failed to insert the following records:", failedRecords);
          alert("Some records failed to insert. Check console for details.");
        } else {
          alert("File uploaded and data inserted successfully");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing the file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Upload CSV</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
