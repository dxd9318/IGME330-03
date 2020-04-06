<?php
   // In PHP 7, get rid of the errors by casting
   $foo = "1";  		// $foo is string (ASCII 49)
   $foo *= 2;   		// $foo is now an integer (2)
   $foo = $foo * 1.3;  	// $foo is now a float (2.6)
   $foo = 5 * (int)"10 Little Piggies";  	// 50 because this string is converted to 10
   echo "<p>The first result is $foo</p>"; 
   $foo = 5 * (int)"Small Pigs = 10";  	// 0 because this string is converted to 0
   echo "<p>The second result is $foo</p>";
?>