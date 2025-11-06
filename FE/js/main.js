console.log("Dashboard loaded");

// Pastikan login
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html";
}

const BASE_URL = "http://localhost/simpeg_24.01.55.6002_medyawatikurnia/api.php/records";
const EMP_API = `${BASE_URL}/employees`;
const DEPT_API = `${BASE_URL}/departments`;
const LEAVE_API = `${BASE_URL}/leave_requests`;

async function loadDashboard() {
  console.log("Fetching data...");

  try {
    const empRes = await fetch(EMP_API);
    const empData = await empRes.json();
    console.log("EMP DATA RAW:", empData);

    const deptRes = await fetch(DEPT_API);
    const deptData = await deptRes.json();
    console.log("DEPT DATA RAW:", deptData);

    const leaveRes = await fetch(LEAVE_API);
    const leaveData = await leaveRes.json();
    console.log("LEAVE DATA RAW:", leaveData);

    const employees = empData.records || [];
    const departments = deptData.records || [];
    const leaves = leaveData.records || [];

    console.log("EMP:", employees.length, "DEPT:", departments.length, "LEAVES:", leaves.length);

    document.getElementById("totalPegawai").innerText = employees.length;
    document.getElementById("pegawaiAktif").innerText = employees.filter(e => e.status?.toLowerCase().includes("aktif") || e.status?.toLowerCase() === "active").length;
    document.getElementById("pegawaiCuti").innerText = leaves.filter(l => l.status?.toLowerCase().includes("approved") || l.status?.toLowerCase().includes("disetujui")).length;
    document.getElementById("totalDept").innerText = departments.length;

    if (departments.length > 0) {
      const labels = departments.map(d => d.name || d.nama);
      const data = departments.map(d => employees.filter(e => e.department_id == d.id).length);
      renderChart(labels, data);
    }
  } catch (err) {
    console.error("Error loading dashboard:", err);
  }
}

function renderChart(labels, data) {
  const ctx = document.getElementById("deptChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: { labels, datasets: [{ label: "Jumlah Pegawai", data }] },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

loadDashboard();
