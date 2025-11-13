import React, { useEffect, useState } from "react";
import StudentService from "./StudentService";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const loadData = () => {
    StudentService.getAll().then(res => setStudents(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      StudentService.update(editingId, form).then(() => {
        setForm({ name: "", email: "" });
        setEditingId(null);
        loadData();
      });
    } else {
      StudentService.create(form).then(() => {
        setForm({ name: "", email: "" });
        loadData();
      });
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({ name: student.name, email: student.email });
  };

  const handleDelete = (id) => {
    StudentService.remove(id).then(loadData);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Students CRUD</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      <h2>Student List</h2>

      {students.length === 0 && <p>No students available</p>}

      {students.map(s => (
        <div key={s.id} style={{ marginBottom: 10 }}>
          <strong>{s.name}</strong> — {s.email}
          <button onClick={() => handleEdit(s)} style={{ marginLeft: 10 }}>
            Edit
          </button>
          <button onClick={() => handleDelete(s.id)} style={{ marginLeft: 10 }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
