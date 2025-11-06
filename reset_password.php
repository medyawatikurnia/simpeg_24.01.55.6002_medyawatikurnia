<?php
// reset_password.php
// Usage: open in browser, isi username dan new password, klik Update.

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $host = 'localhost';
    $db   = 'sim_pegawai';
    $user = 'root';
    $pass = ''; // ganti kalau kamu punya password mysql
    $username = $_POST['username'] ?? '';
    $newpass = $_POST['newpass'] ?? '';

    if (!$username || !$newpass) {
        $msg = "Fill username and new password.";
    } else {
        $hash = password_hash($newpass, PASSWORD_BCRYPT);
        $mysqli = new mysqli($host, $user, $pass, $db);
        if ($mysqli->connect_errno) {
            $msg = "DB connection failed: " . $mysqli->connect_error;
        } else {
            $stmt = $mysqli->prepare("UPDATE users SET password = ? WHERE username = ?");
            $stmt->bind_param("ss", $hash, $username);
            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    $msg = "Password updated for user '{$username}'. Use the new password to login.";
                } else {
                    $msg = "No user updated. Check username exists.";
                }
            } else {
                $msg = "Update failed: " . $stmt->error;
            }
            $stmt->close();
            $mysqli->close();
        }
    }
}
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Reset User Password</title></head>
<body style="font-family:system-ui,Segoe UI,Arial;padding:20px;">
  <h3>Reset user password (local use only)</h3>
  <?php if (!empty($msg)): ?>
    <p><strong><?=htmlspecialchars($msg)?></strong></p>
  <?php endif; ?>
  <form method="post">
    <div style="margin-bottom:8px;">
      <label>Username<br><input name="username" style="padding:8px;width:320px" required></label>
    </div>
    <div style="margin-bottom:8px;">
      <label>New password<br><input name="newpass" type="password" style="padding:8px;width:320px" required></label>
    </div>
    <button type="submit" style="padding:8px 12px">Update Password</button>
  </form>
  <p style="color:#666">After update, delete this file for security.</p>
</body>
</html>
