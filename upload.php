<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = $uploadDir . time() . '.jpg';
    if (move_uploaded_file($_FILES['image']['tmp_name'], $fileName)) {
        echo "Файл сохранён: " . $fileName;
    }
}
?>