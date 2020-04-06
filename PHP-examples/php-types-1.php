<?PHP
	// sum integers
	$a = 1;
	$b = 2;
	$c = $a + $b;
	$isInteger = is_int($c);
	echo "<p>The sum of integers $a and $b is $c. isInteger = $isInteger</p>";
	
	// explicit casting of $c to an int
	$a = 1;
	$b = 2.99;
	$c = $a + (int)$b;
	$isInteger = is_int($c);
	echo "<p>The sum of integers $a and $b is $c. isInteger = $isInteger</p>";
	
	// sum floats
	$a = 1.0;
	$b = 2.0;
	$c = $a + $b;
	$isFloat = is_float($c);
	echo "<p>The sum of floats $a and $b is $c. isFloat = $isFloat</p>";
	
	$a = 1.0;
	$b = 2.99;
	$c = $a + $b;
	$isFloat = is_float($c);
	echo "<p>The sum of floats $a and $b is $c. isFloat = $isFloat</p>";
?>