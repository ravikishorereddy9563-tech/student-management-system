import api from "../../api/axios";

const Reports = () => {
  const reports = [
    ["Student Report", "All student information"],
    ["Attendance Report", "Student attendance summary"],
    ["Marks Report", "Academic performance"],
    ["Fee Report", "Fee collection and pending payments"],
    ["Exam Report", "Examination results"],
  ];

  const reportEndpoints = {
    "Student Report": "/students/",
    "Attendance Report": "/attendance/",
    "Marks Report": "/exams/marks/",
    "Fee Report": "/fees/",
    "Exam Report": "/exams/",
  };

  const escapeCsvValue = (value) => {
    const text = value === null || value === undefined ? "" : String(value);
    return `"${text.replaceAll('"', '""')}"`;
  };

  const downloadReport = async (reportName) => {
    try {
      const response = await api.get(reportEndpoints[reportName]);
      const records = Array.isArray(response.data) ? response.data : [];

      if (!records.length) {
        window.alert("There is no data available for this report.");
        return;
      }

      const columns = [...new Set(records.flatMap((record) => Object.keys(record)))];
      const csv = [
        columns.join(","),
        ...records.map((record) =>
          columns.map((column) => escapeCsvValue(record[column])).join(",")
        ),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${reportName.toLowerCase().replaceAll(" ", "-")}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.alert("Unable to generate this report.");
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Generate and download system reports</p>
        </div>
      </div>

      <div className="report-grid">
        {reports.map((report) => (
          <div className="dashboard-card" key={report[0]}>
            <div className="stat-icon">📊</div>

            <h2>{report[0]}</h2>
            <p>{report[1]}</p>

            <button
              className="btn btn-primary"
              onClick={() => downloadReport(report[0])}
            >
              Download Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;