<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servidor = "localhost";
$usuario_db = "root";
$password_db = "";
$dbname = "gamehub_db";

$conexion = new mysqli($servidor, $usuario_db, $password_db, $dbname);

if ($conexion->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión a la base de datos"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['username']) && isset($data['password'])) {
    $user = $conexion->real_escape_string($data['username']);
    $pass = $data['password'];
    $rol = "Gamer"; // Rol estándar para cuentas nuevas

    // Verificar si el usuario ya existe
    $verificar = $conexion->query("SELECT * FROM usuarios WHERE username = '$user'");
    if ($verificar->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "El nombre de usuario ya está registrado"]);
    } else {
        $sql = "INSERT INTO usuarios (username, password, rol) VALUES ('$user', '$pass', '$rol')";
        if ($conexion->query($sql) === TRUE) {
            echo json_encode(["success" => true, "message" => "Cuenta creada exitosamente"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al registrar la cuenta"]);
        }
    }
} else {
    echo json_encode(["success" => false, "message" => "Faltan datos en la petición"]);
}

$conexion->close();
?>