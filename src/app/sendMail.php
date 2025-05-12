<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// PHPMailer laden
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// CORS und Header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Nur POST erlaubt']);
    exit;
}

// Daten auslesen
$data = json_decode(file_get_contents("php://input"), true);
$name = htmlspecialchars($data['name'] ?? '');
$email = htmlspecialchars($data['mail'] ?? '');
$message = htmlspecialchars($data['message'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Ungültige Eingaben']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // SMTP-Konfiguration (Platzhalter ersetzen!)
    $mail->isSMTP();
    $mail->Host = 'smtp.ionos.de';
    $mail->SMTPAuth = true;
    $mail->Username = 'kontakt@rahmiesen.com';     // ✅ DEINE Mailadresse
    $mail->Password = 'GGakkosch232323';         // ✅ DEIN Passwort
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    
    // Absender & Empfänger
    $mail->setFrom('kontakt@rahmiesen.com', 'Kontaktformular');
    $mail->addAddress('kontakt@rahmiesen.com'); // ✅ Empfänger = gleiche Mailadresse
    
    // Mail-Inhalt
    $mail->isHTML(true);
    $mail->Subject = "Neue Nachricht von $name";
    $mail->Body = "<strong>Name:</strong> $name<br><strong>Email:</strong> $email<br><br><strong>Nachricht:</strong><br>$message";
    $mail->AltBody = "Name: $name\nEmail: $email\nNachricht:\n$message";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}