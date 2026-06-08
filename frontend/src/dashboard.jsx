import React, { useEffect, useState } from "react";
import { api } from "./api";

function Dashboard({ logout }) {
  const [summary, setSummary] = useState({});
  const [properties, setProperties] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("full_name");

  const [propertyForm, setPropertyForm] = useState({
    property_name: "",
    address: "",
    city: "",
    state: "",
    zipcode: ""
  });

  const [maintenanceForm, setMaintenanceForm] = useState({
    unit_id: 1,
    issue_title: "",
    issue_description: "",
    priority: "medium",
    status: "open"
  });

  const loadData = async () => {
    const summaryRes = await api.get("/dashboard-summary");
    const propertiesRes = await api.get("/properties");
    const maintenanceRes = await api.get("/maintenance-requests");

    setSummary(summaryRes.data);
    setProperties(propertiesRes.data);
    setMaintenance(maintenanceRes.data);
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  const addProperty = async (e) => {
    e.preventDefault();

    await api.post("/properties", propertyForm);

    setPropertyForm({
      property_name: "",
      address: "",
      city: "",
      state: "",
      zipcode: ""
    });

    loadData();
  };

  const addMaintenance = async (e) => {
    e.preventDefault();

    await api.post("/maintenance-requests", maintenanceForm);

    setMaintenanceForm({
      unit_id: 1,
      issue_title: "",
      issue_description: "",
      priority: "medium",
      status: "open"
    });

    loadData();
  };

  return (
    <div className="container">
      <div className="topbar">
        <h1>UrbanNest Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <h3>
        Welcome, {fullName} | Role: {role}
      </h3>

      <div className="dashboard">
        <div className="card">Users: {summary.total_users}</div>
        <div className="card">Properties: {summary.total_properties}</div>
        <div className="card">Units: {summary.total_units}</div>
        <div className="card">Occupied: {summary.occupied_units}</div>
        <div className="card">Available: {summary.available_units}</div>
        <div className="card">Open Requests: {summary.open_requests}</div>
      </div>

      {role === "admin" && (
        <section>
          <h2>Add Property</h2>

          <form onSubmit={addProperty} className="form">
            <input
              placeholder="Property Name"
              value={propertyForm.property_name}
              onChange={(e) =>
                setPropertyForm({ ...propertyForm, property_name: e.target.value })
              }
              required
            />

            <input
              placeholder="Address"
              value={propertyForm.address}
              onChange={(e) =>
                setPropertyForm({ ...propertyForm, address: e.target.value })
              }
            />

            <input
              placeholder="City"
              value={propertyForm.city}
              onChange={(e) =>
                setPropertyForm({ ...propertyForm, city: e.target.value })
              }
            />

            <input
              placeholder="State"
              value={propertyForm.state}
              onChange={(e) =>
                setPropertyForm({ ...propertyForm, state: e.target.value })
              }
            />

            <input
              placeholder="Zipcode"
              value={propertyForm.zipcode}
              onChange={(e) =>
                setPropertyForm({ ...propertyForm, zipcode: e.target.value })
              }
            />

            <button type="submit">Add Property</button>
          </form>
        </section>
      )}

      {role === "tenant" && (
        <section>
          <h2>Submit Maintenance Request</h2>

          <form onSubmit={addMaintenance} className="form">
            <input
              type="number"
              placeholder="Unit ID"
              value={maintenanceForm.unit_id}
              onChange={(e) =>
                setMaintenanceForm({
                  ...maintenanceForm,
                  unit_id: Number(e.target.value)
                })
              }
            />

            <input
              placeholder="Issue Title"
              value={maintenanceForm.issue_title}
              onChange={(e) =>
                setMaintenanceForm({
                  ...maintenanceForm,
                  issue_title: e.target.value
                })
              }
              required
            />

            <textarea
              placeholder="Issue Description"
              value={maintenanceForm.issue_description}
              onChange={(e) =>
                setMaintenanceForm({
                  ...maintenanceForm,
                  issue_description: e.target.value
                })
              }
            />

            <select
              value={maintenanceForm.priority}
              onChange={(e) =>
                setMaintenanceForm({
                  ...maintenanceForm,
                  priority: e.target.value
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button type="submit">Submit Request</button>
          </form>
        </section>
      )}

      <section>
        <h2>Properties</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Property</th>
              <th>City</th>
              <th>State</th>
              <th>Zipcode</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((p) => (
              <tr key={p.property_id}>
                <td>{p.property_id}</td>
                <td>{p.property_name}</td>
                <td>{p.city}</td>
                <td>{p.state}</td>
                <td>{p.zipcode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Maintenance Requests</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tenant ID</th>
              <th>Unit ID</th>
              <th>Issue</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {maintenance.map((m) => (
              <tr key={m.request_id}>
                <td>{m.request_id}</td>
                <td>{m.tenant_id}</td>
                <td>{m.unit_id}</td>
                <td>{m.issue_title}</td>
                <td>{m.priority}</td>
                <td>{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;