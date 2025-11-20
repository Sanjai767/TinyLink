import { useEffect, useState } from "react";
import axios from "axios";
import LinkForm from "../components/LinkForm";

function Dashboard() {
  const [links, setLinks] = useState([]);
  const [alert, setAlert] = useState("");

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(""), 3000);
  };

  const loadLinks = async () => {
    const res = await axios.get("http://localhost:5000/api/links");
    setLinks(res.data);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const deleteLink = async (code) => {
    await axios.delete(`http://localhost:5000/api/links/${code}`);
    showAlert("Deleted Successfully!");
    loadLinks();
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">TinyLink Dashboard</h1>

      {alert && (
        <div className="alert alert-success text-center fw-bold">
          {alert}
        </div>
      )}

      <LinkForm onCreated={loadLinks} />

      <div className="mt-5">
        <h3>All Links</h3>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Code</th>
              <th>URL</th>
              <th>Clicks</th>
              <th>Last Clicked</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {links.map((l) => (
              <tr key={l.code}>
                <td>
                  <a
                    href={`http://localhost:5000/${l.code}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary"
                  >
                    {l.code}
                  </a>
                </td>

                <td className="text-truncate" style={{ maxWidth: "300px" }}>
                  {l.targetUrl}
                </td>

                <td>{l.clickCount}</td>

                <td>
                  {l.lastClicked
                    ? new Date(l.lastClicked).toLocaleString()
                    : "-"}
                </td>

                <td>
                  <a
                    href={`/code/${l.code}`}
                    className="btn btn-success btn-sm me-2"
                  >
                    Stats
                  </a>

                  <button
                    onClick={() => deleteLink(l.code)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Dashboard;
