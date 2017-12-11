<?php

$lastTimeStamp = isset($_GET["timestamp"]) ? $_GET["timestamp"] : 0;		# the first timestamp is 0
$currentTimeStamp = filemtime('text.txt');

while ($lastTimeStamp == $currentTimeStamp)
{
	clearstatcache();
	session_write_close();

	$currentTimeStamp = filemtime('text.txt');
	usleep(5000);
}

$message = file_get_contents("text.txt");

echo json_encode(["message" => $message, "timestamp" => $currentTimeStamp]);