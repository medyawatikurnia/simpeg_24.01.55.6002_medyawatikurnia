const API_LOGIN = "http://localhost/simpeg_24.01.55.6002_medyawatikurnia/login.php";

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const alertBox = document.getElementById("loginAlert");

  fetch(API_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.href = "index.html";
      } else {
        alertBox.classList.remove("d-none");
      }
    })
    .catch(() => {
      alertBox.classList.remove("d-none");
    });
});
