console.log("pegawai.js aktif");

// Cek login
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html";
}

const BASE_URL = "http://localhost/simpeg_24.01.55.6002_medyawatikurnia/api.php/records";
const EMP_API = `${BASE_URL}/employees`; 

const tableBody = document.querySelector("#employeeTable tbody");
const form = document.getElementById("pegawaiForm");
const modalElement = document.getElementById("pegawaiModal");
const modal = new bootstrap.Modal(modalElement);
const btnTambah = document.getElementById("btnTambahPegawai");

// 🔹 1. Load data pegawai
async function loadEmployees() {
  tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Memuat data...</td></tr>`;

  try {
    const res = await fetch(EMP_API);
    const data = await res.json();
    const employees = data.records || [];

    if (!employees.length) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Belum ada data pegawai</td></tr>`;
      return;
    }

    tableBody.innerHTML = employees.map(emp => `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.nik || "-"}</td>
        <td>${emp.full_name || "-"}</td>
        <td>${emp.department_id || "-"}</td>
        <td>${emp.position_id || "-"}</td>
        <td>${emp.status || "-"}</td>
        <td>
          <button class="btn btn-warning btn-sm editBtn" data-id="${emp.id}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm deleteBtn" data-id="${emp.id}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join("");

    // Hubungkan event tombol edit dan hapus
    document.querySelectorAll(".editBtn").forEach(btn => {
      btn.addEventListener("click", editEmployee);
    });
    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", deleteEmployee);
    });

  } catch (err) {
    console.error("Gagal load data pegawai:", err);
    tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Gagal memuat data</td></tr>`;
  }
}

// 🔹 2. Tombol Tambah
btnTambah.addEventListener("click", () => {
  form.reset();
  document.getElementById("pegawaiId").value = "";
  document.getElementById("pegawaiModalLabel").innerText = "Tambah Pegawai";
  modal.show();
});

// 🔹 3. Simpan data (Tambah / Edit)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("pegawaiId").value;
  const data = {
    nik: document.getElementById("nik").value,
    full_name: document.getElementById("full_name").value,
    department_id: document.getElementById("department_id").value,
    position_id: document.getElementById("position_id").value,
    status: document.getElementById("status").value
  };

  try {
    const res = await fetch(id ? `${EMP_API}/${id}` : EMP_API, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      modal.hide();
      loadEmployees();
    } else {
      alert("Gagal menyimpan data pegawai.");
    }
  } catch (err) {
    console.error("Error saat simpan:", err);
  }
});

// 🔹 4. Edit data pegawai
async function editEmployee() {
  const id = this.dataset.id;
  try {
    const res = await fetch(`${EMP_API}/${id}`);
    const emp = await res.json();

    document.getElementById("pegawaiId").value = emp.id;
    document.getElementById("nik").value = emp.nik || "";
    document.getElementById("full_name").value = emp.full_name || "";
    document.getElementById("department_id").value = emp.department_id || "";
    document.getElementById("position_id").value = emp.position_id || "";
    document.getElementById("status").value = emp.status || "";

    document.getElementById("pegawaiModalLabel").innerText = "Edit Pegawai";
    modal.show();
  } catch (err) {
    console.error("Gagal ambil data pegawai:", err);
  }
}

// 🔹 5. Hapus data pegawai
async function deleteEmployee() {
  const id = this.dataset.id;
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  try {
    const res = await fetch(`${EMP_API}/${id}`, { method: "DELETE" });
    if (res.ok) {
      loadEmployees();
    } else {
      alert("Gagal menghapus data pegawai.");
    }
  } catch (err) {
    console.error("Error saat hapus:", err);
  }
}

// Jalankan pertama kali
loadEmployees();
