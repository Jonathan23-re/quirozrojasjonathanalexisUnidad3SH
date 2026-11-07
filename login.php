<?php
// Cabeceras para permitir peticiones AJAX (CORS y formato JSON)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Credenciales de conexión a MySQL en XAMPP
$servidor = "localhost";
$usuario_db = "root";
$password_db = "";
$dbname = "gamehub_db";

$conexion = new mysqli($servidor, $usuario_db, $password_db, $dbname);

// Validar conexión
if ($conexion->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión a la base de datos"]);
    exit();
}

// Obtener los datos enviados mediante POST (en formato JSON)
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['username']) && isset($data['password'])) {
    $user = $conexion->real_escape_string($data['username']);
    $pass = $data['password'];

    // Consulta para verificar el usuario en la base de datos
    $sql = "SELECT * FROM usuarios WHERE username = '$user' AND password = '$pass'";
    $resultado = $conexion->query($sql);

    if ($resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
        echo json_encode([
            "success" => true,
            "rol" => $fila['rol'],
            "message" => "Autenticación exitosa"
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Usuario o contraseña incorrectos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Faltan datos en la petición"]);
}

$conexion->close();
?>