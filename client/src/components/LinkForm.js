import { useState } from "react";
import axios from "axios";

function LinkForm({ onCreated }) {
  const [targetUrl, setTargetUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [alert, setAlert] = useState("");

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(""), 3000);
  };

  const createLink = async (e) => {
    e.preventDefault();
    showAlert("Processing...");

    try {
      await axios.post("http://localhost:5000/api/links", {
        targetUrl,
        customCode,
      });

      showAlert("Created Successfully!");
      setTargetUrl("");
      setCustomCode("");
      onCreated();
    } catch (err) {
      if (err.response?.status === 409) showAlert("Code already exists!");
      else if (err.response?.status === 400) showAlert("Invalid URL!");
      else showAlert("Error occurred!");
    }
  };

  return (
    <form className="card p-4 shadow" onSubmit={createLink}>
      <h4>Create Short Link</h4>

      {alert && (
        <div className="alert alert-info text-center fw-bold mt-3">
          {alert}
        </div>
      )}

      <input
        type="text"
        value={targetUrl}
        onChange={(e) => setTargetUrl(e.target.value)}
        placeholder="Enter long URL"
        className="form-control mt-3"
        required
      />

      <input
        type="text"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        placeholder="Custom code (optional)"
        className="form-control mt-3"
      />

      <button className="btn btn-primary w-100 mt-3">Create</button>
    </form>
  );
}

export default LinkForm;
