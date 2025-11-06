// Muat navbar.html ke dalam setiap halaman
fetch("navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;

    // Setelah navbar termuat, jalankan event login check & logout
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    // Tampilkan nama user
    document.getElementById("welcomeText").innerText = `Halo, ${user.username}!`;

    // Tombol logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });

    // Tandai menu aktif otomatis
    const path = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("href") === path) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  })
  .catch(err => console.error("Gagal memuat navbar:", err));
