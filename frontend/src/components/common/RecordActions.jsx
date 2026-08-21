import { useState } from "react";
import api from "../../api/axios";

const RecordActions = ({ endpoint, record, fields, onSaved, onDeleted }) => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((field) => [field.name, record[field.name] ?? ""]))
  );
  const [saving, setSaving] = useState(false);

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await api.patch(`${endpoint}${record.id}/`, values);
      setEditing(false);
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this record?")) return;
    await api.delete(`${endpoint}${record.id}/`);
    onDeleted(record.id);
  };

  return (
    <>
      <button type="button" onClick={() => setEditing(!editing)}>
        {editing ? "Cancel" : "Edit"}
      </button>{" "}
      <button type="button" onClick={remove}>Delete</button>
      {editing && (
        <form onSubmit={save}>
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type || "text"}
              value={values[field.name]}
              onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
              required={field.required}
            />
          ))}
          <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </form>
      )}
    </>
  );
};

export default RecordActions;