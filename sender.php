<?php

$message = isset($_GET["message"]) ? trim($_GET["message"]) : '';
$message = @base64_decode($message);

$write = false;

if ($message !== false)
	$write = @file_put_contents('text.txt', $message);

echo json_encode(["process" => (!($write === false)) ]);