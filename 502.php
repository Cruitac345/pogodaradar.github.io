<?php
http_response_code(502); // Устанавливаем настоящий статус 502
header('Content-Type: text/html; charset=utf-8'); // Указываем кодировку
?>
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">

<html><head>

<title>502 Bad Gateway</title>

</head><body>

<h1>502 Bad Gateway</h1>

<p>Сервер временно недоступен. Попробуйте зайти позже.<br />

</p>

<hr>

<address>Apache/2.4.41 (Ubuntu) Server at pogodaradar.net.ru Port 80</address>

</body></html>