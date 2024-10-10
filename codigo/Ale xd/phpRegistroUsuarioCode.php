<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "aventura_extrema";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($nombre) || empty($email) || empty($password)) {
    die(json_encode(["error" => "Todos los campos son requeridos"]));
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre, $email, $password_hash);

if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Usuario registrado con éxito"]);
} else {
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>