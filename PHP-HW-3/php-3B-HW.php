<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>About you!</title>
</head>
<body>
<h1>About you!</h1>
<?PHP
	$server =  $_SERVER["SERVER_NAME"];
	$ip =  $_SERVER["REMOTE_ADDR"];
    $ua =  $_SERVER["HTTP_USER_AGENT"];
    // the server's IP address, the server software, and the server "request time".
    $serverIP = $_SERVER["SERVER_ADDR"];
    $software = $_SERVER["SERVER_SOFTWARE"];
    $reqTime = $_SERVER["REQUEST_TIME_FLOAT"];

	echo "<p>The server is: $server</p>";
	echo "<p>Your IP address is: $ip</p>";
    echo "<p>Your browser is: $ua</p>";
    echo "<p>The server's IP address is: $serverIP</p>";
    echo "<p>The server software is: $software</p>";
    echo "<p>The server request time was: $reqTime</p>";
?>
</body>
</html>