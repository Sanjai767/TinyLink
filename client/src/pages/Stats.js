import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  const loadStats = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/links/${code}`);
      setData(res.data);
    } catch {
      setData("NOT_FOUND");
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (data === "NOT_FOUND") {
    return (
      <div className="container py-5 text-center">
        <h1>Not Found</h1>
        <a href="/" className="btn btn-primary mt-3">Back</a>
      </div>
    );
  }

  if (!data) return <div className="container py-5 text-center">Loading...</div>;

  return (
    <div className="container py-5">
      <h1>TinyLink Stats - {code}</h1>

      <div className="card p-4 mt-4 shadow">
        <p><strong>Original URL:</strong> {data.targetUrl}</p>
        <p><strong>Total Clicks:</strong> {data.clickCount}</p>
        <p><strong>Last Clicked:</strong> {data.lastClicked ? new Date(data.lastClicked).toLocaleString() : "-"}</p>
      </div>

      <a href="/" className="btn btn-primary mt-4">Back to Dashboard</a>
    </div>
  );
}

export default Stats;
