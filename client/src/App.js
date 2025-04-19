import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/query", { query });
      setResults(res.data.results);
      setError("");
    } catch (err) {
      setError("Query failed or invalid");
      setResults([]);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 bg-main"
      style={{
        backgroundImage: 'url("/images/2.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "white",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Privacy-Preserving Query Demo</h1>
      <textarea
        className="w-full max-w-xl p-4 border rounded mb-4"
        rows={4}
        placeholder="Enter your query e.g. age=25"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Execute Query Privately
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <pre className="bg-white p-4 rounded shadow">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
      {/* <img src="./images/2.png" id="two" /> */}
      <img src="./images/1.jpg" id="one" />
      <img src="./images/3.avif" id="three" />
    </div>
  );
}

export default App;
