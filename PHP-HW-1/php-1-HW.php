<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<?PHP
	    $pageTitle = "Hello-4"; // here we are declaring a variable
	?>
	<title>
	<?PHP
	    echo $pageTitle; 	// and we use that variable here
	?>
    </title>
    <style>
        * {
            font-family: sans-serif;
        }
    </style>
</head>
<body>
<?PHP
	echo "<h1>$pageTitle</h1>"; // and we use that variable a second time here
	echo "<div>Content goes here!</div>";
	echo "<hr>";
	$dateTime = date("l, F jS, Y  g:i:sa"); // date() is a built-in PHP function
	// l, F jS, Y  g:i:sa
	echo "<footer>Page accessed on: $dateTime</footer>";
?>
</body>
</html>